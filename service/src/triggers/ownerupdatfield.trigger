Trigger ownerupdatfield on Account(before insert,before update)
{
    set<id> se= new set<id>();
    for(account acc:trigger.new)
    {
       se.add(acc.ownerid);
    }
    
 list<user> us=new list<user>();
  us=[select name from user where id in: se];
 
 for(account acc: trigger.new)
    { 
     //   user u =us.get(Acc.OwnerId);
       // acc.Sales_Rep__c=u.name;
 
    }
    
   // this is not working
   
       
 
}