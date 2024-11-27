public with sharing class OpportunityPDFController {
    public List<Opportunity> opportunities { get; set; }

    public OpportunityPDFController() {
        // Recuperar las oportunidades con cuentas relacionadas
        opportunities = [SELECT Id, Name, Amount, CloseDate, Account.Name FROM Opportunity ORDER BY CloseDate DESC LIMIT 50];
    }
}
