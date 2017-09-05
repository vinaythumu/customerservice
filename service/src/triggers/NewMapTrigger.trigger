trigger NewMapTrigger on Account (Before insert,Before update) {

map<string,list<string>> mp= New map<string,list<string>>();

list<String> li= New list<string>();
li.add('rakesh');
li.add('vijay');

mp.put('gang1',li);

list<String> li1= New list<string>();
li1.add('sathish');
li1.add('karthik');
mp.put('gang2',li1);

system.debug('++++++++++++'+mp);

map<Account,list<contact>> mp1= new map<Account,list<contact>>();

list<Account> acc=[Select id,name from Account ];

For(Account a:acc)
  {
         
        list<contact> con= [Select id,name from contact where accountid= :a.id];
        mp1.put(a,con);
     
  }

System.debug('++++++++'+mp1);
}




 //  For(contact c:con){
       // If(c.id == Null)
        //{
         //system.debug('+++++This account is not having costomer details');
        //}
        //Else
        //{
        //system.debug('+++++This account is having costomer details');
        //}
        
       //}