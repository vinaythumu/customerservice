Trigger ContactCountTrigger on Contact(After insert,After Delete,After Undelete)
{
  Set<Id> setAccountIds = new Set<Id>();
  
  //Whenever your working with After Undelete operation you can access data through 
  //Trigger.new or Trigger.newMap but not with Trigger.old or Trigger.oldmap variables
  if(Trigger.isInsert || Trigger.isUndelete)
  {
   for(Contact con : Trigger.new)
   {
    setAccountIds.add(con.AccountId);
   }
  }
  
  if(Trigger.isDelete)
  {
   //if you use Trigger.new below in place of Trigger.old you will end up with 
   //System.NullPointerException:Attempt to de-reference a null object
   for(Contact con : Trigger.old) 
   {
    setAccountIds.add(con.AccountId);
   }
  }
  
 List<Account> listAccs = [Select id,name,child_records__c ,(Select id from contacts) from Account where Id in : setAccountIds];
  for(Account acc :listAccs)
  {
   acc.child_records__c = acc.contacts.size();
  }
  update listAccs;
}