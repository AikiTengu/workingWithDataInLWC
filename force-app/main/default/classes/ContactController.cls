public inherited sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT FirstName, LastName, Email
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
        //used to work with reducing errors
       // throw new AuraHandledException('Forced error');
    }

    @AuraEnabled
    public static void deleteContact(Id ContactId) {
        Contact contactToDelete = [
            SELECT Name FROM Contact WHERE Id=:ContactId
        ];

        delete contactToDelete;
        

        //used to work with reducing errors
       // throw new AuraHandledException('Forced error');
    }
}