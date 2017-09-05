public class CasemultiExtensionController {

    private final Case safetyObs;
      
           

    public Attachment attachment {
        get {
            if (attachment == null) attachment = new Attachment();
            return attachment;
        }

        set;
    }

    public CasemultiExtensionController (ApexPages.StandardController stdController)
    {
        safetyObs = (Case)stdController.getRecord();
    }

    public PageReference save(){
        insert safetyObs;
        attachment.parentId = safetyObs.Id;
        insert attachment;
      
        PageReference page = ApexPages.currentPage();
        page.setRedirect(true);
        return page;
     }
}