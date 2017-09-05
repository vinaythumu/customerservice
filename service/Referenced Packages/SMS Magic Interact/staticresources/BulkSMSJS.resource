String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {       
	  var reg = new RegExp("\\{" + i + "\\}", "gm");             
	  s = s.replace(reg, arguments[i + 1]);
  }
  return s;
}

function charaterCounter(txtFieldDiv, charaterCountDiv,labelVal){
        var maxLimit = 700;
        var txtField = document.getElementById(txtFieldDiv);
        var currentCount =  txtField.value.length;
        var remainingCharMsgDiv = document.getElementById(charaterCountDiv);
        var noOfCharMsg = remainingCharMsgDiv.innerHTML;
        var remaingChars = 700;
        var msg = "";
        if(currentCount > maxLimit){
            txtField.value = txtField.value.substring(0, maxLimit);
            currentCount = 700; 
        }
		msg = String.format(labelVal,currentCount);
        remainingCharMsgDiv.innerHTML = msg;
}
function characterCounter(controllerDiv, txtFieldDiv, charaterCountDiv,labelVal,source){
        var maxLimit = 700;
        var txtField = document.getElementById(txtFieldDiv);
        var currentCount =  txtField.value ? txtField.value.length : 0;
        var remainingCharMsgDiv = document.getElementById(charaterCountDiv);
        var noOfCharMsg = remainingCharMsgDiv.innerHTML;
        var remaingChars = 700;
        var msg = "";
        if(new String(source).valueOf()==new String("decrement").valueOf()){
        	if(currentCount > maxLimit){
            	txtField.value = txtField.value.substring(0, maxLimit);
        	    //document.getElementById("remainingChar").innerHTML = 0;
            	remaingChars = 0; 
        	}
        	else{
            	//document.getElementById("remainingChar").innerHTML = maxLimit - currentCount;
            	remaingChars = maxLimit - currentCount;
        	}
        	msg = String.format(labelVal, remaingChars);//"You have used "+currentCount+"/700 characters."
        }
        else{
        	if(currentCount > maxLimit){
            	txtField.value = txtField.value.substring(0, maxLimit);
            	currentCount = 700; 
       		}
       		msg = String.format(labelVal,currentCount);//"You have used "+currentCount+"/700 characters.";
       	}
        remainingCharMsgDiv.innerHTML = msg;
}



function queryFailed(error) {
	alert("An error has occurred: " + error);
}



function redirectTo(url,retURL){
   if(retURL) url = url + '?retURL='+retURL;
   parent.location = url;
   return false;    
}

function testResource(){
	alert("hello");
}

function changeTemplateText(elm, templateTextId, ObjectTypeId, fieldNameId, fieldNameId1, fieldNameId2) {
	var text = document.getElementById(templateTextId).value;
	var objectType = document.getElementById(ObjectTypeId).value;
	
	var fieldName= document.getElementById(fieldNameId).value;
	var fieldName1 = null;
	if (typeof(fieldNameId1) != "undefined" && fieldNameId1 != null && fieldNameId1 != '')
		fieldName1 = document.getElementById(fieldNameId1).value;
	var fieldName2 = null;
	if (typeof(fieldNameId2) != "undefined" && fieldNameId2 != null && fieldNameId2 != '')
		fieldName2 = document.getElementById(fieldNameId2).value;

	if(fieldName == null || fieldName == 'None' || fieldName == '' || fieldName.length == 0) { 
		return false;
	}
	var valueToBeAdded = fieldName.indexOf(':') <= 0 ? fieldName : fieldName.substring(0, fieldName.indexOf(':'));
 	var valueToInsert = "{!"+objectType+"."+valueToBeAdded;
	if(fieldName1 != null && fieldName1 != 'None' && fieldName1 != '' && fieldName1.length != 0) {
		valueToBeAdded = fieldName1.indexOf(':') <= 0 ? fieldName1 : fieldName1.substring(0, fieldName1.indexOf(':'));
		valueToInsert = valueToInsert + "." + valueToBeAdded;
	}
	if(fieldName2 != null && fieldName2 != 'None' && fieldName2 != '' && fieldName2.length != 0) {
		valueToInsert = valueToInsert + "." + fieldName2;
	}
		
/*	var valueToInsert = "{!"+objectType+".";
	for (count = 0; count < fieldNameArray[].length; count++) {
		var fieldNameId = fieldNameArray[count];
		if (typeof(fieldNameId) != "undefined" && fieldNameId != null && fieldNameId != '') {
			var fieldName= document.getElementById(fieldNameId).value;
			if(fieldName != null && fieldName != 'None' && fieldName != '' && fieldName.length != 0)
				valueToInsert = valueToInsert + "." + fieldName1;
		}
	}*/
	
	valueToInsert = valueToInsert +"}";
	// Updated code to insert field value at the cursor position
	var elementRef = document.getElementById(templateTextId);
 	
 	try{
 	
	if ( document.selection )
	 {
 		 // Internet Explorer...
 	
  	elementRef.focus();
  	var selectionRange = document.selection.createRange();
  	selectionRange.text = valueToInsert;
 	}
 	else if ( (elementRef.selectionStart) || (elementRef.selectionStart == '0') )
 	{
  		// Mozilla/Netscape...

  	var startPos = elementRef.selectionStart;
	var endPos = elementRef.selectionEnd;
	elementRef.value = elementRef.value.substring(0, startPos) +
    valueToInsert + elementRef.value.substring(endPos, elementRef.value.length);
     	elementRef.selectionStart = elementRef.selectionStart + valueToInsert.length;
     
	}
 	else
 	{
 	 elementRef.value += valueToInsert;
 	 elementRef.selectionStart = elementRef.selectionStart + valueToInsert.length;
 	 
 	}
  }catch(e){
 	alert(e);
  }
	
	
    return false;
}
