trigger newold on EmployeeDetail1__c (before insert,before update,after insert,after delete,before delete) 
{
  // for(EmployeeDetail1__c emp1: trigger.new)
 //  {
  //    system.debug('+++' +emp1.phone__c);
  // }
   
  //  for(EmployeeDetail1__c emp2: trigger.old)
  // {
   //   system.debug('+++' +emp2.phone__c);
  // }
   
 
   if(trigger.isupdate){
   
   for (Employeedetail1__c empnew: Trigger.new) {

    Employeedetail1__c empold= Trigger.oldMap.get(empnew.Id);

    if (empnew.phone__c == empold.phone__c)
     {

        // do something
        empold.Status__c = 'yes';
        
        

    }

}
}

}