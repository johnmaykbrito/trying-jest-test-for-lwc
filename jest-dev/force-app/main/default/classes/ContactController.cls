public with sharing class ContactController
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList()
    {
        try
        {
            return [SELECT Id, Name FROM Contact LIMIT 10];
        }
        catch (Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
