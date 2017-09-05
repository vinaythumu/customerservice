trigger Accountphone on Account (before insert,before update) {
         For( Account act: Trigger.New )
          {
            If(act.phone == '8466009379')
            {
               act.phone = '9951749260';
            }
            else
            {
               act.phone = '9347361382';
            }
          }

}