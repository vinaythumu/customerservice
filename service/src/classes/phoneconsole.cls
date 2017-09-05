public class phoneconsole{
        public string phone{get;set;}
        public string name{get;set;}
    
    public Family_Data__c fa;
    
    public phoneconsole(ApexPages.StandardController kaki)
    {
      fa = (Family_Data__c)kaki.getRecord();
    }
    
     
    
     public pagereference phoneco()
    {
        boolean  isError;
        ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.ERROR,'Field should not be empty when selected');
        ApexPages.currentPage().getParameters().get('phone');
        System.debug('Entered user name is '+phone);
         ApexPages.currentPage().getParameters().get('name');
        System.debug('Entered user name is '+name);
        fa.phone__c=phone;
        fa.name=name;
       
        return null;                  }
        
        
        
           
}