public class SafetyObservationExtensionController {

    private final Account safetyObs;
      
           

    public Attachment attachment {
        get {
            if (attachment == null) attachment = new Attachment();
            return attachment;
        }

        set;
    }

    public SafetyObservationExtensionController (ApexPages.StandardController stdController)
    {
        safetyObs = (Account)stdController.getRecord();
    }

    public PageReference save() {
        insert safetyObs;
        System.debug('********'+safetyObs);
        attachment.parentId = safetyObs.Id;
        insert attachment;
      
        PageReference page = ApexPages.currentPage();
        page.setRedirect(true);
        return page;
     }
}