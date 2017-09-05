public class loginpageconsole {
     public string username{get;set;}
    public string password{get;set;}
    public String Name{get;set;}
    public string string1{get;set;}
    
    public Family_Data__c fa;
    
    public loginpageconsole(ApexPages.StandardController kaki)
    {
      fa = (Family_Data__c)kaki.getRecord();
    }
    
     
    
     public pagereference loginrefer()
    {
        boolean  isError;
        ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.ERROR,'Field should not be empty when selected');
        ApexPages.currentPage().getParameters().get('username');
        System.debug('Entered user name is '+username);
        ApexPages.currentPage().getParameters().get('Password');
        System.debug('Entered user name is '+Password);
        List<Family_Data__c> lst = [select id, user_name__c, password__c from Family_Data__c where user_name__c = :username and password__c = :Password];
        System.debug('lst value is '+lst);
        
        if(lst.size()>0) {
            System.debug('Entered 1st if loop');
            if(lst[0].user_name__c == username && lst[0].password__c == password){
                System.debug('Entered 2nd if loop');     
                PageReference retURL = new PageReference('/apex/mainpage');
      			retURL.setRedirect(true);
      			return retURL;
            }
        }
        
        
        else {
            System.debug('Entered else loop');
            //ApexPages.addmessage(new ApexPages.message(ApexPages.severity.WARNING,'Please enter correct user name and password'));
        	//fa.adderror('please enter valid username and password');
        	ApexPages.addMessage(myMsg);
            isError = true;
            return null;
        }
        return null;
    }
}