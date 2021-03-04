public inherited sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT FirstName, LastName, Email
            FROM Contact
            ORDER BY Name
        ];
        //used to work with reducing errors
       // throw new AuraHandledException('Forced error');
    }

     @AuraEnabled
     public static void deleteContact(String contactToDeleteId) {
        try {
            Contact contact = [
                SELECT Id, FirstName
                FROM Contact
                WHERE Id = :contactToDeleteId
            ];
            List<Case> caseList = [ 
                SELECT Id 
                FROM Case
                WHERE Contact.Id = :contactToDeleteId
                ];
            if (!caseList.isEmpty()) {
                for (Case caseItem : caseList) {
                    caseItem.ContactId = null;
                    }
                update caseList;
                }
                delete contact;
        } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
        } 
    }
}