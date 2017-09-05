global class businessdaysupdate implements Database.Batchable<sobject> 
{

   
   
   
    global Database.QueryLocator start(Database.BatchableContext BC)
    {
         String query = 'select id,createddate2__c,closeddate2__c from case where createddate2__c != Null And closeddate2__c !=Null';
         system.debug(+query);    
          integer  count= database.countQuery('select count() from case');
         system.debug('the count is '+ count);
         return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, List<Case> scope)
    {    
        
         list<businesshours> bh = [select id, name from businesshours where name = 'working days'];
         String BusinessHours_Id = bh[0].id;
         for ( case c : scope)
        {
           Long Mins_since_lastTouched = BusinessHours.diff (BusinessHours_Id, c.createddate2__c, c.closeddate2__c) / 1000 / 60;
           System.debug('>>>>>>'+ Mins_since_lastTouched );
           System.debug('>>>>>>'+ c.createddate2__c);
           System.debug('>>>>>>'+ c.closeddate2__c);
           c.Business_Days__c = Mins_since_lastTouched /1440;
           System.debug('>>>>>>'+ c.Business_Days__c);
          

        }
        update scope;
        
        
        
    }  
    
    
    global void finish(Database.BatchableContext BC)
    {
     list<businesshours> bh = [select id, name from businesshours where name = 'working days'];
         String BusinessHours_Id = bh[0].id;
       case k = new case();
       Long Mins_since_lastTouched = BusinessHours.diff (BusinessHours_Id, k.createddate2__c, k.closeddate2__c) / 1000 / 60;
       System.debug(+Mins_since_lastTouched );
       system.debug('+++'+k.createddate2__C);
       System.debug('>>>>>>'+ k.closeddate2__c);
       System.debug('>>>>>>'+ k.Business_Days__c);
    }
   
 
}