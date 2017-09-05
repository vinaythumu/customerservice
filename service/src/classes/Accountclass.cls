public class Accountclass {

public class uploadAttachmentsController {

    public uploadAttachmentsController(ApexPages.StandardController controller){}

    public Attachment file;

        public Attachment getfile(){

            file = new Attachment();

            return file;

        }

        public PageReference save(){

            string recordid = System.currentPageReference().getParameters().get('id');

            Attachment attach = new Attachment(

                parentid = recordid,

                name = file.name,

                body = file.body);

            insert attach;

            return null;

        }

}



}