public class acctest
{ 

  public list<string> li1 {get;set;}
  public acctest(){
  li1=new list<string>();
  for(account a:[select id,name from account limit20])
  li1.add(a.name);
  }
}