trigger TestTrigger on Account (Before insert,After insert) 
{
   Map<String, String> colorCodes = new Map<String, String>();
   colorCodes.put('Red', 'FF0000');

   colorCodes.put('Blue', '0000A0');
   
   Map<String, String> colorCodes2= new Map<String, String>();
   colorCodes2.put('Red', 'FF0000');

   colorCodes2.put('Blue', '0000A0');
   system.debug('+++++++'+colorcodes2);
   
  
     colorcodes.equals(colorcodes2);
     colorcodes.size();

}