trigger Maptrigger on Account (before insert,before update) {

            If(Trigger.isinsert)
          {
              list<Account> li= [select AccountNumber from Account];
              set<Account> li1= New set<Account>(li);
              For(Account d: Trigger.New)
              {
                    system.debug('+++++++++++++'+li1);
                    If(li1.equals(d.Accountnumber))
                      {
                          d.AddError('This account number already exist');
                      }
                      
              } 
                   system.debug('++++++++++++++++++'+li);
         }
}