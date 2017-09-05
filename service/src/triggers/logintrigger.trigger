trigger logintrigger on Family_Data__c (before insert,before update)
{  
   //map<string,list<family_data__c>> mp1=new map<string,list<family_data__c>>();
   //map<string,list<family_data__c>> mp2=new map<string,list<family_data__c>>();
   
   list<family_data__C> li1 = [select user_name__C,password__c from family_data__c];
   list<family_data__C> li2 = [select user_name2__C,password2__c from family_data__c];
   set<family_data__c> s1= New set<family_data__c>(li1);
   set<family_data__c> s2= New set<family_data__c>(li2);
  for(family_data__c f :Trigger.new)
  {
      
                  If(s1.equals(s2))
                  {
                    f.addError('Alias name is already exists for other user');
                  }
              
    
  }

}