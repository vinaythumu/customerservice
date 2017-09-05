trigger contactscreation on Account (after insert,after update,before insert,before update) 
{
     list<contact> con=new list<contact>();
     for(Account acc:trigger.new)
     {    
      
      Decimal var=acc.Number_of_Locations__c;
    
        for(integer i=1;i < var+1;i++)
       {  
        
          contact co = new contact();
          co.accountid=acc.Id;
          
          co.lastname='contacthe'+i;
          
          
          con.add(co);
          
       }
       insert con;
       
     }
     
}