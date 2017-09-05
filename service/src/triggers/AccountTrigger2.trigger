trigger AccountTrigger2 on Account (before insert) 
{
    For(Account a: Trigger.New)
    {
       If(a.phone == null)
       {
          a.Phone = '8456456721';
          System.debug('************************');
       }
       else
       {
       system.debug('+++++++++++++++++++');
       }
        
    }

}