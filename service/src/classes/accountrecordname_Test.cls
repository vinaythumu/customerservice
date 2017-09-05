@isTest
private class accountrecordname_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Account account_Obj = new Account(Name = 'Name746', Required__c = false);
    Insert account_Obj; 
    test.stopTest();
  }
  static testMethod void test_searchbar_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,Required__c from Account];
    System.assertEquals(true,account_Obj.size()>0);
    accountrecordname obj01 = new accountrecordname();
    obj01.name = 'test data';
    obj01.acc = account_Obj;
    obj01.searchbar();
  }
}