import { LightningElement, track } from 'lwc';
import getOpportunitiesWithDetails from '@salesforce/apex/CustomerController.getOpportunitiesWithDetails';

export default class CustomerList extends LightningElement {
    @track opportunities = [];
    @track error;
    @track searchTerm = '';
    @track pageNumber = 0;
    @track pageSize = 5;
    @track totalRecords = 0;

    connectedCallback() {
        this.loadOpportunities();
    }

    get currentPage() {
        return this.pageNumber + 1;
    }

    get isNextDisabled() {
        const nextPageStart = (this.pageNumber + 1) * this.pageSize;
        return nextPageStart >= this.totalRecords;
    }

    get isPreviousDisabled() {
        return this.pageNumber === 0;
    }
    openPDF() {
        // URL de la página Visualforce
        const pdfURL = '/apex/OpportunityPDF';
        window.open(pdfURL, '_blank');
    }
    
    loadOpportunities() {
        getOpportunitiesWithDetails({
            searchTerm: this.searchTerm,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber * this.pageSize
        })
            .then(data => {
                this.opportunities = data.opportunities.map(opp => ({
                    id: opp.Id,
                    name: opp.Name,
                    amount: opp.Amount,
                    closeDate: opp.CloseDate,
                    account: opp.Account ? {
                        id: opp.Account.Id,
                        name: opp.Account.Name,
                        url: `/lightning/r/Account/${opp.Account.Id}/view`
                    } : null,
                    contact: opp.Contact ? {
                        id: opp.Contact.Id,
                        name: opp.Contact.Name,
                        url: `/lightning/r/Contact/${opp.Contact.Id}/view`
                    } : null,
                    url: `/lightning/r/Opportunity/${opp.Id}/view`
                }));
                this.totalRecords = data.total;
                this.error = undefined;
            })
            .catch(error => {
                this.opportunities = [];
                this.error = error;
            });
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
        this.pageNumber = 0;
        this.loadOpportunities();
    }

    handleNextPage() {
        this.pageNumber++;
        this.loadOpportunities();
    }

    handlePreviousPage() {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.loadOpportunities();
        }
    }

    handleRefresh() {
        this.loadOpportunities();
    }
}
