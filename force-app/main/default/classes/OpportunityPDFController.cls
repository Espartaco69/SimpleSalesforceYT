public with sharing class OpportunityPDFController {
    // Lista de oportunidades que se mostrará en la página
    public List<Opportunity> opportunities { get; set; }

    // Constructor que inicializa la lista
    public OpportunityPDFController() {
        opportunities = [
            SELECT Id, Name, Amount, CloseDate, Account.Name 
            FROM Opportunity 
            ORDER BY CloseDate DESC 
            LIMIT 50
        ];
    }
}
