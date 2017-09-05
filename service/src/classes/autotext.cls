public class autotext {
    public List<String> listOfStrings {get; set;}
 
   //Constructor
   public autotext() {
      listOfStrings = new List<String>();
      for(Account a: [SELECT id, Name From Account LIMIT 100])
      listOfStrings.add(a.name);
      }
}