trigger familyrecordcreation on Contact (before insert,before update,after insert,after update) 


{
   if(trigger.isafter){
   list<family_data__c> mi=new list<family_data__c>();
   
   
   
    for(contact con:trigger.new)
    {
    
      
       
      if(con.Contact_Relationship__c == true)
      {
       for(integer i=1;i<3;i++){
      
       family_data__c fa=new family_data__c();
       
       fa.Name ='newcontactishere'+i;
       
       mi.add(fa);
       }
       
      }
        insert mi;
     
    }
  } 
}