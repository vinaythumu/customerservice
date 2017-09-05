trigger priceupdate on Case (before insert,before update) 
{
  list<case> lis = Trigger.new;
  For(case l:lis)
  {
    l.price__c=0.5*l.price__c;
  }
}