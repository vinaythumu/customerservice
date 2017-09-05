public class phoneconsole2{
        
    public Family_Data__c fa;
    
    public phoneconsole2(ApexPages.StandardController kaki)
    {
      fa = (Family_Data__c)kaki.getRecord();
    }
    
     
    
     public pagereference pho()
    {
                           insert fa;
                           return new pagereference('/apex/phone2');
              
    }
}