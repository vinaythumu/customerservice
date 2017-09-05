public class accountrecordname 
{  
  public string name{get;set;}
  public list<account> acc {get;set;}
  
  
  public accountrecordname()
  {
    acc= new list<account>();
  }

     
   public pagereference searchbar()
   {
       acc=[select id,name from account where name= :name];
       system.debug('+++'+acc);
       return null;
   }
}