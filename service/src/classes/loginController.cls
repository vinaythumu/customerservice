public with sharing class loginController {
    public String userName {get; set;}
    public String password {get; set;}
    public Boolean getInput {get;set;}
     public Boolean ischeck {get;set;}
    //public List Family_data__c{get; set;}
    public loginController() {
       getInput = True;
         
    }
    public void searchUserName() {
       getInput = False;
        list<Family_data__c> p = [SELECT Id,Password__c,user_name__c FROM Family_data__c];
        if(!p.isEmpty()){
            ischeck = true;

        }else
        {
            ischeck = false;
        }
    }
}