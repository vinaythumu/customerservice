public class demoClass1 {

 

public demoClass1()

    {

     

        listContactWrapper = new  List<contactWrapper>();

        for(Contact c : [Select Name , Email from Contact limit 20])

            listContactWrapper.add(new contactWrapper(c));

    }
    
     public PageReference previouspage()

    {

        return new PageReference(Page.wrapperclasspage1.getUrl());

    }

public PageReference nextpage()

    {

        return new PageReference(Page.wrapperclasspage2.getUrl());

    }

    public List<contactWrapper> listContactWrapper {get;set;}

public class contactWrapper

   {

      public Contact c {get;set;}

     public Boolean isChecked {get;set;}

      public contactWrapper(Contact c)

          {

             this.c = c;

             if(isChecked == null)

              isChecked = false;


          }

   }

    
     


     


 

}