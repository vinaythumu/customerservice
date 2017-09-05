trigger Test on Account (before insert,before update) {
         
          List<integer> lis1=new list<integer>();
          Lis1.add(5);
          Lis1.add(10);
          lis1.add(5);
          List<integer> lis2=new list<integer>(lis1);
          System.debug('*********'+lis2);
          
          set<integer>lis3= new set<integer>(lis1);
          System.debug('************'+lis3);
          
          Map<integer,string> m=new Map<integer,string>{1=>'vinay', 2=>'Rakesh'};
          system.debug('++++++++++++++' +m);
         
         map<string,string> capital=New Map<string,string>();
         capital.put('Telangana','Hyderabad');
          capital.put('Andhra Pradesh','Amaravathi');
          system.debug('+++++++++++++'+capital);
          
          List<Account> act = new List<Account>();
          act.add(new Account(Name='Account1'));
          act.add(new Account(Name='Account2'));
          system.debug('++++++++++++++++'+act);
       
          map<string,list<integer>> mb= New map<string,list<integer>>{'Newlist'=>lis1};
          System.debug('++++++++++++++'+mb);
          
          If(Trigger.isinsert)
          {
             list<Account> act1= new list<Account>();
             For(Account b:Trigger.New)
             {
                act1.add(new Account(Name='vinay1'));
                system.debug('++++++++++++++'+act1);
             }
             
          }
          
          If(Trigger.isupdate)
          {
             For(Account c:Trigger.New)
             {
                If(c.AccountNumber=='123')
                {
                  c.addError('you cannot edit the account number');
                }
             }
          }
          
          //If(Trigger.isinsert)
          {
              //list<Account> li= [select AccountNumber from Account];
              //set<Account> li1= New set<Account>(li);
             // For(Account d: Trigger.New)
              {
                 //   system.debug('+++++++++++++'+li1);
                   // If(li1.equals(d.AccountNumber))
                      {
                         //  d.AddError('This account number already exist');
                      }
              } 
            
          }
         
          list<Account> acp = [select AccountNumber from Account];
          system.debug('&*&'+acp.size());
          Map<string,list<Account>> k =New map<String,list<Account>>{'Firstmap'=>acp};
          system.debug('***&*'+acp);
          Boolean contains= k.containskey('Accountnumber');
         

         // {
           //  System.debug('Account number already exist')
          //} 
          system.debug('++++++++++++++++++'+k);
          
          
}