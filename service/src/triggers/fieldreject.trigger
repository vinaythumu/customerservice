trigger fieldreject on Case (before insert,after insert,after update) 
{
  If(Trigger.isinsert)
  {
  
     For(case c:Trigger.new)
     {
        If(c.cost__c!=Null)
        {
            c.addError('you cannot enter anything in the cost column');
        }
     
    }
  
  }
  
  
  If(Trigger.isupdate)
  {
     for(case d:trigger.new)
     {
       
               if (Trigger.oldMap.get(d.Id).cost__c != Trigger.newMap.get(d.Id).cost__c)
               {
               
                           d.addError('you cannot enter anything in the cost column');

               }
         
     }
  }
}