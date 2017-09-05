trigger checktrigger on Account (before insert,before update) 
{ 
  integer i=0;
  
  list<integer> lis= New list<integer>{5,6,10};
  
  For(Account a: Trigger.New)
  
  {
    //i++;
    //If(lis[i].contains(a.SLASerialNumber__c))
    
    {
    //  a.phone='123456';
    }
  }
}