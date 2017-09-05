/**
 * 	@method 	: sendSMS()
 * 	@description: This function send the SMS based on parameter.
 * 	@param 		: String, Id, Id, String, String, String, String, String, String, boolean, String
 * 	@return		: void
 */
 

function sendSMS(recordTypeVar, recordIdVar, userId, nameFieldVal, mobileFieldVal, optOutFieldVal, optOutDefaultVal, smsType, elementIdVar, packagePrefix, showUserDropDownVal, dialogTitleVal, cssUrlVal, unrelatedObjectAPIName){

	var queryString = parent.window.location.pathname;
 	var isFromPopup = false;
	var isFromVFPage = true;
	var senderId = '';
	var isOptOut = false;
	var showUserDropDown = new Boolean(0);
	var dialogTitle = 'Send SMS to '+recordTypeVar;
	var senderUserId = null;

	if(cssUrlVal == null){
		var fullURL = window.location.href;
		var baseURL = fullURL.substring(0, fullURL.indexOf('.com')+4);
		cssUrlVal = baseURL + '/resource/smJQuery/css/sm-theme/jquery-ui-1.10.4.custom.min.css';
	}
	if(dialogTitleVal){
		dialogTitleVal = dialogTitleVal.trim();
		if(dialogTitleVal.length > 0)
			dialogTitle = dialogTitleVal;
	}

	if(smsType != null){
		if(smsType == 'popup'){
			isFromPopup = true;
			isFromVFPage = false;
		}
	}
	
	if(showUserDropDownVal != null){
		if(showUserDropDownVal === false){
			showUserDropDown = false;
		}
		if(showUserDropDownVal === true){
			showUserDropDown = true;
		}
	}

	if(isFromPopup){
		
		var parentUrl = window.location.href; 
		parentUrl = parent.window.location 

		// add css to page 
		var fileref = document.createElement('link'); 
		fileref.setAttribute('rel', 'stylesheet'); 
		fileref.setAttribute('type', 'text/css'); 
		fileref.setAttribute('href', cssUrlVal); 
		document.getElementsByTagName('head')[0].appendChild(fileref); 

		if (parent.window.location.search){ 
    		queryString = queryString + parent.window.location.search 
		} 
		var iframe_url = '';
		iframe_url = "/apex/"+packagePrefix+"Popup?retURL="+queryString+"&nameField=" +nameFieldVal +"&phoneField="+ mobileFieldVal+"&optOutField="+optOutFieldVal+"&optOutDefaultValue="+optOutDefaultVal+"&objectType="+recordTypeVar+"&showUserDropDown="+showUserDropDown+"&recordIds="+recordIdVar;
		if(unrelatedObjectAPIName && unrelatedObjectAPIName.trim() != '') {
			iframe_url += "&unrelatedObjectName="+unrelatedObjectAPIName;		
		}
		iframe_url += "&parentUrl="+parentUrl;
		var child_domain = iframe_url.substring(0, iframe_url.indexOf('/', 9)); 
		var parent_domain = window.location.protocol + '//' + window.location.host; 
		
		var j$ = jQuery.noConflict(); 
 
		var modalDialog = j$('<div id="sendSMSPopup"></div>');
		var md= modalDialog.html('<iframe id="iframeContentId" src="' + iframe_url + '?parent_domain=' + parent_domain + '" frameborder="0" height="100%" width="100%" marginheight="0" marginwidth="0" scrolling="yes" />'); 
		md.dialog({ 
			autoOpen: false,
			resizable: false, 
			width: 530, 
			height: 550, 
			autoResize: true, 
			modal: true, 
			title: "test",
			draggable: true 
		});
		
 		var closeFun = function(event) {
 			
 			if(event.data === "close sendsms popup"){ 
				// event.origin contains the host of the sending window. 
				md.dialog('close');
			}
		}
		md.dialog("option", "title", dialogTitle).dialog('open');
		
		if(!window.addEventListener){
			window.attachEvent("onmessage", closeFun);
		} else{
			var browserName = navigator.appName;
			if(browserName == 'Netscape'){
				window.addEventListener("message", closeFun, false);
			}else{
				window.addEventListener("message", closeFun);
			}
		}
	}
	if(isFromVFPage){
		if (parent.window.location.search){ 
			queryString = queryString + parent.window.location.search 
		} 
		var url = "/apex/"+packagePrefix+"BulkSendSMS?retURL="+queryString+"&nameField=" +nameFieldVal +"&phoneField="+ mobileFieldVal+"&optOutField="+optOutFieldVal+"&optOutDefaultValue="+optOutDefaultVal+"&objectType="+recordTypeVar+"&showUserDropDown="+showUserDropDown+"&recordIds="+recordIdVar;
		if(unrelatedObjectAPIName && unrelatedObjectAPIName.trim() != '') {
			url += "&unrelatedObjectName="+unrelatedObjectAPIName;		
		}
		parent.window.location = url;
	}
}
