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
}