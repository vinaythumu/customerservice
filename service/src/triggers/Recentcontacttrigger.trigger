trigger Recentcontacttrigger on Account (before insert,Before update) 
{
    map<Account,list<contact>> mp1= new map<Account,list<contact>>();

      list<Account> acc=[Select id,name from Account];

For(Account a:Trigger.New)
  {
        
        for(account ab:acc) 
        {
         system.debug('++++++++++'+ab.id);
         list<contact> con= [Select id,name,createddate from contact where accountid= :ab.id order by createddate asc];
        
         system.debug('+++++++++'+con);
         mp1.put(ab,con);
         //system.debug('+++++++++'+mp1);
        }
  }
}