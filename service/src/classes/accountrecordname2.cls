public class accountrecordname2
{ 
  string name{get;set;}
  list<account> acc{get;set;}
  
  public accountrecordname2()
  {
  acc=new list<account>();
  }
  public pagereference pag()
  {
  acc= [select id,name from account where name =:name];
  return null;
  }
}