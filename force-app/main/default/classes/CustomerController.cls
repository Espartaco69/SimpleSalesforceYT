public with sharing class CustomerController {
    @AuraEnabled(cacheable=false)
    public static Map<String, Object> getOpportunitiesWithDetails(String searchTerm, Integer pageSize, Integer pageNumber) {
        Map<String, Object> response = new Map<String, Object>();

        // Consulta base de oportunidades
        String query = 'SELECT Id, Name, Amount, CloseDate, Account.Id, Account.Name ' +
                       'FROM Opportunity';
        
        if (String.isNotBlank(searchTerm)) {
            searchTerm = '%' + searchTerm + '%';
            query += ' WHERE Name LIKE :searchTerm OR Account.Name LIKE :searchTerm ';
        }

        // Ordenar, limitar y establecer desplazamiento para paginación
        query += ' ORDER BY CloseDate DESC LIMIT :pageSize OFFSET :pageNumber';
        List<Opportunity> opportunities = Database.query(query);

        // Total de registros (para paginación)
        Integer totalRecords = [SELECT COUNT() FROM Opportunity WHERE Name LIKE :searchTerm];

        // Construir respuesta
        response.put('opportunities', opportunities);
        response.put('total', totalRecords);

        return response;
    }
}
