public class contactlightcontroller
{
 @AuraEnabled

 public static list<contact> gtcontac()
 {
  return [select id,name,email from contact ];
 } 
}