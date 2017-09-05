@isTest
private class ContactTrigger_Test{
  static testMethod void test_ContactTrigger(){
   test.startTest();
    Contact contact_Obj = new Contact(LastName = 'LastName691', smagicinteract__SMSOptOut__c = false, Contact_Relationship__c = false);
    Insert contact_Obj; 
   test.stopTest();
  }
}