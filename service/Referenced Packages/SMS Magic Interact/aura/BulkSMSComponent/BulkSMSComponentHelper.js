({
    retRecipientList : function(component, event, helper, ids) {
        var objectType = component.get("v.objectName");
        var str;
        if(helper.isEmpty(objectType)) {
            str = $A.get("$Label.smagicinteract.CONFG_PLZ_SLCT_OBJ");
            component.set("v.auraErrorMessage", str);
            component.set("v.AllowToSendMMS", false);
            component.set("v.disableMe", true);
            return;
        }
        var mobileFields = component.get("v.mobileFields");
        var optOutField = component.get("v.optOutField");
        var namefield = component.get("v.nameField");
        var unrelatedObjects = component.get("v.unrelatedObjects");
        var trimedIds = ids.map(function(id){
            return id.trim();
        });
        var action = component.get("c.getRecipientList");
        action.setParams({"recordIdList" 	: trimedIds,
                          "objectType"	 	: objectType,
                          "mobilePhoneFields": mobileFields,
                          "nameField" 		: namefield,
                          "optOutField"		: optOutField,
                          "unrelatedObjects" : unrelatedObjects
                         });
        action.setCallback(this, function(response){
            var state = response.getState();
            str = "";
            if (state === "SUCCESS") {
                var recipientClass = response.getReturnValue();
                component.set("v.AllowToSendMMS", recipientClass.AllowToSendMMS);
                component.set("v.AllowToChangeOptout", recipientClass.AllowToChangeOptout);
                component.set("v.AllowToChangeTemplateSelection", recipientClass.AllowToChangeTemplateSelection);
                if(recipientClass.statusCode === '500') {
                    str = $A.get("$Label.smagicinteract.NO_OF_RECORDS_SELECTED_FOR_SEND_SMS_TYPE_1");
                    str = str.replace(/\{0\}/i, '0');
                    component.set("v.auraInfoMessage", str);
                    component.set("v.auraErrorMessage", recipientClass.errorMessage);
                    component.set("v.AllowToSendMMS", false);
                    component.set("v.disableMe", true);
                    return;
                } else {
                    var senderIdWrap = recipientClass.senderIdWrap;
                    component.set("v.allSenderId", senderIdWrap.optList);
                    component.find("SenderIdSelect").set("v.value", senderIdWrap.defaultSenderId);
                }
				if(!recipientClass.AllowToSendBulkMessage) {
                    component.set("v.auraErrorMessage", $A.get("$Label.smagicinteract.CANNOT_SND_SMS"));
                    component.set("v.AllowToSendMMS", false);
                    component.set("v.disableMe", true);
                    return ;
                }
                if(recipientClass.statusCode === '501') {
                    str = $A.get("$Label.smagicinteract.NO_OF_RECORDS_SELECTED_FOR_SEND_SMS_TYPE_1");
                    str = str.replace(/\{0\}/i, '0');
                    component.set("v.auraInfoMessage", str);
                    component.set("v.auraErrorMessage", recipientClass.errorMessage);
                } else {
                    component.set("v.allTemplate", recipientClass.templatesList.templateName);
                }
                component.set("v.recipientClass", recipientClass);
                component.set("v.excludedRecipientList", recipientClass.duplicateRecipientList);
                var recipientList = recipientClass.recipientList;
                var missingNumbers;
                if(mobileFields.split(';').length < 3 ) {
                    missingNumbers = (ids.length * mobileFields.split(';').length) - recipientList.length - recipientClass.duplicateRecipientList.length;
                } else {
                    missingNumbers = (ids.length * 3) - recipientList.length - recipientClass.duplicateRecipientList.length;
                }
                if(missingNumbers) {
                    str = $A.get("$Label.smagicinteract.NO_OF_RECORDS_SELECTED_FOR_SEND_SMS_TYPE_2");
                    str = str.replace(/\{0\}/i, missingNumbers);
                    str = str.replace(/\{1\}/i, recipientList.length);
                } else {
                    str = $A.get("$Label.smagicinteract.NO_OF_RECORDS_SELECTED_FOR_SEND_SMS_TYPE_1");
                    str = str.replace(/\{0\}/i, recipientList.length);
                }
                var duplicateMobileNumbers = recipientClass.duplicateMobileNumbers;
                if(duplicateMobileNumbers && duplicateMobileNumbers.length) {
                    str += ' '+$A.get("$Label.smagicinteract.DUPLICATE_RECORD_WARNING_MSG");
                    str += duplicateMobileNumbers+'.';
                }
                component.set("v.auraInfoMessage", str);
                if(!recipientList.length) {
                    component.set("v.disableMe", true);
                }
                str = $A.get("$Label.smagicinteract.RECIPIENTS_COUNT");
                str = str.replace(/\{0\}/i, recipientList.length);
                component.set("v.recipientsCount", str);
            } else {
                str = response.getError();
                component.set("v.auraErrorMessage", str[0].message);
            }
        });
        $A.enqueueAction(action);
    },
    uploadFile : function (component, event, helper) {
        component.set("v.auraErrorMessage", "");
        component.set("v.auraSuccessMessage", "");
        var fileInput = component.find("upload_file").getElement();
        var file = fileInput.files[0];
        if(!file) {
            component.set("v.auraErrorMessage", $A.get("$Label.smagicinteract.NO_MEDIA_FILE_SELECTED"));
        } else if (file.size > 500000) {
            component.set("v.auraErrorMessage", $A.get("$Label.smagicinteract.FILE_SIZE_EXCEED") + file.size);
        } else {
                var fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onload = $A.getCallback(function() {
                    helper.upload(component, event, helper, file, fr.result);
                });
            }
    },
    upload : function(component, event, helper, file, fileContents) {
        var base64Mark = 'base64,';
        var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
        var fileContent = fileContents.substring(dataStart);
        var action = component.get("c.saveTheFile");
        action.setParams({
            fileName: file.name,
            base64Data: 'data:'+file.type+';base64,'+fileContent, //encodeURIComponent(fileContents),
            contentType: file.type
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnVal = response.getReturnValue();
                if(returnVal.name === "201") {
                    component.set("v.fileUrl", returnVal.ErrorMessage) ;
                    component.set("v.auraSuccessMessage", $A.get("$Label.smagicinteract.FILE_UPLOAD_SUCCESS"));
                }	else if(returnVal.name === "500") {
                    component.set("v.fileUrl", "");
                    component.set("v.auraErrorMessage", returnVal.ErrorMessage);
                }
            } else {
                component.set("v.fileUrl", "");
                var str = response.getError();
                component.set("v.auraErrorMessage", str[0].message);
            }
        });
        $A.enqueueAction(action);
    },
    removeFile : function(component) {
        component.set("v.mmsSubject", "");
        component.set("v.fileUrl", "");
        component.find("upload_file").getElement().value = '';
        component.set("v.auraSuccessMessage", "");
    },
    getMediaUrl : function(url) {
        /*if(url.includes("https://www.youtube.com/") && url.includes('watch')) {
                url = url.replace(/watch\?v=/i, 'embed/');
            }*/
        return url;
    },
    getMediaType : function(url) {
        /*if(url.includes("https://www.youtube.com/") && (url.includes('/embed/') || url.includes('/watch\?v='))) {
                return 'YOUTUBE';
            }*/
        var extention = url.split('.').pop();
        var type='FILE';
        if(extention === 'gif') {
            type = 'ANIMATION';
        } else if(extention === 'amr' || extention === 'acc') {
            type = 'AUDIO';
        } else if(extention === 'jpg' || extention === 'png'
                  || extention === 'jpeg' || extention === 'bmp') {
            type = 'IMAGE';
        } else if(extention === 'mp4') {
            type = 'VIDEO';
        }
        return type;
    },
    doSendSMS : function(component, event, helper, ids) {
        var str = "";
        var objectName = component.get("v.objectName");
        if(helper.isEmpty(objectName)) {
            str = $A.get("$Label.smagicinteract.CONFG_PLZ_SLCT_OBJ");
            component.set("v.auraErrorMessage", str);
            component.set("v.disableMe", true);
            return;
        }
        var mobileFields = component.get("v.mobileFields");
        var senderId = component.find("SenderIdSelect").get("v.value");
        if(helper.isEmpty(senderId)) {
            str = $A.get("$Label.smagicinteract.BLANK_SENDERID_MSG");
            component.set("v.auraErrorMessage", str);
            return;
        }
        var namefield = component.get("v.nameField");
        var templateId = component.find("TemplateSelect").get("v.value");
        var templateText = component.get("v.templateText");
        var mmsSubject = component.find("mmsSubject").get("v.value");
        var fileUrl = component.get("v.fileUrl");
        if(helper.isEmpty(templateText) && helper.isEmpty(fileUrl)) {
            str = $A.get("$Label.smagicinteract.TEXT_OR_MEDIA_MISSING");
            component.set("v.auraErrorMessage", str);
            return;
        }
        var isOptOut = component.find("optOutCheckBoxId").get("v.value");
        var optOutField = component.get("v.optOutField");
        if(!optOutField){
            isOptOut=true;
        }
        var excludedRecipientList = component.get("v.excludedRecipientList");
        var unrelatedObjectIdList = component.get("v.unrelatedObjectIdList");
        if(helper.isEmpty(templateText)) {
            templateText = '';
        }
        var trimedIds  = ids.map(function(id){
            return id.trim();
        });
        var action = component.get("c.sendBulkSMS");
        action.setParams({"recordIdList" 		: trimedIds,
                          "objectName"	 		: objectName,
                          "mobilePhoneFields"	: mobileFields,
                          "senderId"			: senderId,
                          "nameField" 			: namefield,
                          "templateId"			: templateId,
                          "templateText"		: templateText,
                          "mmsSubject"			: mmsSubject,
                          "fileUrl"				: fileUrl,
                          "isOptOut"			: isOptOut,
                          "optOutField"			: optOutField,
                          "excludedRecipientList" : excludedRecipientList,
                          "unrelatedObjectIdList"		: unrelatedObjectIdList
                         });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnVal = response.getReturnValue();
                if(returnVal.name === "201") {
                    var retUrl = helper.getUrlParameter("retURL");
                    if(!retUrl || !retUrl.trim()) {
                    	/*global sforce:true*/
                        	sforce.one.back(true);
                    } else {
                        window.location.href = retUrl;
                    }
                } else if(returnVal.name === "500") {
                    component.set("v.auraSuccessMessage", "");
                    component.set("v.auraErrorMessage", returnVal.ErrorMessage);
                }
            } else {
                str = response.getError();
                component.set("v.auraSuccessMessage", "");
                component.set("v.auraErrorMessage", str[0].message);
            }
        });
        $A.enqueueAction(action);
    },
    isEmpty : function (val) {
        return (!val || !val.trim()) ? true : false;
    },
    searchUnrelatedObject : function(component, event ) {
        var key = event.target.id;
        component.set("v.selectedUnrelatedKey", key);
        component.set("v.unrelatedRecordList", null);
        component.set("v.auraErrorMessage", "");
        var recipientClass = component.get("v.recipientClass");
        var searchString = component.find("searchString");
        var unrelatedObjects = component.get("v.unrelatedObjects");
        if(!unrelatedObjects) {
            return;
        }
        if(unrelatedObjects && unrelatedObjects.split(';').length<2) {
            searchString = searchString.get("v.value");
        } else {
            searchString = searchString[key-1].get("v.value");
        }
        var unrelatedObjectStoreList = recipientClass.unrelatedObjectStoreList;
        if(unrelatedObjectStoreList) {
            for(var i=0; i<unrelatedObjectStoreList.length;i = i+1) {
                if(parseInt(key, 10) === unrelatedObjectStoreList[i].rowNumber) {
                    if(!searchString || searchString.trim().length < 3) {
                        component.set("v.auraInfoMessage", $A.get("$Label.smagicinteract.NOT_ENOUGH_CHARS_TO_SEARCH"));
                        return;
                    }
                    var action = component.get("c.getUnrelatedRecord");
                    action.setParams({
                        "searchString"	: searchString,
                        "objectName"	: unrelatedObjectStoreList[i].objectName	});
                    action.setCallback(this, function(response) {
                        var state = response.getState();
                        if (state === "SUCCESS") {
                            var res = response.getReturnValue();
                            if(res) {
                                component.set("v.auraInfoMessage", "");
                                component.set("v.unrelatedRecordList", res);
                            } else {
                                component.set("v.auraInfoMessage", $A.get("$Label.smagicinteract.NO_SEARCH_RESULT_MSG"));
                            }
                        } else {
                            component.set("v.auraInfoMessage", $A.get("$Label.smagicinteract.NO_SEARCH_RESULT_MSG"));
                        }
                    });
                    $A.enqueueAction(action);
                }
            }
        }
    },
    getUrlParameter : function(val) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i = i+1) {
            var pair = vars[i].split("=");
            if (pair[0] === val) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
})