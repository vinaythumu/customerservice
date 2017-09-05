public class userpassword {
    public string username{get;set;}
    public string password{get;set;}
    public String Name{get;set;}
    
    
    public Family_Data__c fa;
    
    public userpassword(ApexPages.StandardController kaki)
    {
      fa = (Family_Data__c)kaki.getRecord();
    }
   // Map<string,list<Family_Data__c>> mp = New  Map<string,list<Family_Data__c>>();
        
   
    
    public pagereference familyrefer()
    {
        List<Family_Data__c> li=[Select Id,user_name__c,password__c from Family_Data__c where user_name__c= :'vinay'];
        set<Family_data__c> se= new set<Family_data__c>(li);
        If(se.containsall(li))
        {
          
        }
        Family_Data__c k=New Family_Data__c();      
        k.user_name__c = username;
        k.password__c =password;
        k.Name=Name;
        insert k;
       // return null;
        return new pagereference('/apex/familyvisual2');
    }
    
         
}