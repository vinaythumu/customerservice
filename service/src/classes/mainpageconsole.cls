public class mainpageconsole {
    
     public Family_Data__c fa;
    
    public mainpageconsole(ApexPages.StandardController kaki)
    {
      fa = (Family_Data__c)kaki.getRecord();
    }
    
    
    public pagereference familyrefer2()
    {
       
        return new pagereference('/apex/familyvisual');
    }
      public pagereference familyrefer3()
    {
       
        return new pagereference('/apex/familyvisual2');
    }

}