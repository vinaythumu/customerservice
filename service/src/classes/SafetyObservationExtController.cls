public class SafetyObservationExtController {
 private final Account safetyObs;


  public Attachment attachment {
        get {
            if (attachment == null) attachment = new Attachment();
            return attachment;
        }

        set;
    }
public SafetyObservationExtController (ApexPages.StandardController stdController)
    {
        safetyObs = (Account)stdController.getRecord();
        
    }
   
     public PageReference save() {
        insert safetyObs;
        system.debug('>>>>>>>>>>>>>'+safetyObs.Id);
         attachment.parentId = safetyObs.Id;
        insert attachment;
      
        PageReference page = ApexPages.currentPage();
        page.setRedirect(true);
        return page;
     }


}