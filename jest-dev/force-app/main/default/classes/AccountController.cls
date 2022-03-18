public with sharing class AccountController {

   @AuraEnabled(cacheable=true)
   public static List<Account> getAccountById(Id accId){
       try {
           return [SELECT Id, Name, Phone FROM Account WHERE Id =: accId];
       } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
   }

   @AuraEnabled(cacheable=true)
   public static List<Account> getAccountList(){
       try {
           return [SELECT Id, Name, AnnualRevenue FROM Account WHERE AnnualRevenue != NULL LIMIT 5];
       } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
   }
   
   @AuraEnabled(cacheable=true)
   public static List<Contact> getContactList(){
       try {
           return [SELECT Id, Name FROM Contact];
       } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
   }
   
}
