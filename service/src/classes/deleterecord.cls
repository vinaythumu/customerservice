public class deleterecord
{  
   
     @InvocableMethod
    public static void contactdelete()
    {    
        list<account> acc=[select id from account];
          system.debug('++++'+acc);
        List<contact> con =[select id from contact where accountid in :acc];
        system.debug('++++'+con);
        delete con;
        system.debug('++++'+con);
       
     }
  
   
}