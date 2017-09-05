({
    initHelper : function(component, event, helper) {
        component.set("v.smsCharLimit", component.get("v.smsCharLimit") || 700 );
        helper.loadPage(component, event, helper, false);
    },
    loadPage : function(component, event, helper, loadOnlyConv) {
        function getURLParams(){
            var urlParams;
                var match,
                    pl     = /\+/g,  // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) {
                		return decodeURIComponent(s.replace(pl, " "));
                	},
                    query  = window.location.search.substring(1);
                urlParams = {};
                match = search.exec(query);
                while (match){
                    urlParams[decode(match[1])] = decode(match[2]);
                    match = search.exec(query);
                }
            return urlParams;
        }
        function getObjectId() {
            var objId = component.get("v.objectId");
            return !objId ? getURLParams().id : objId;
        }
        component.set("v.auraMessage", null);
        var action = component.get("c.loadData");
        var mobileFields = component.get("v.mobileFields");
        var objectId = getObjectId();
        if (objectId) {
            component.set("v.objectId", objectId);
            action.setParams({ objectId : objectId,
                               loadOnlyTranscript : loadOnlyConv,
                               mobileFields : mobileFields
                             });
            action.setCallback(this, function(data) {
                var returnVal = data.getReturnValue();
                if(typeof returnVal === 'object' && returnVal ){
                    component.set("v.allowToSendMMS", returnVal.allowSendMMS);
                    var allowSendSMS=returnVal.allowSendSMS;
                    var allowTemplateChange=returnVal.allowTemplateSelection;
                    if(allowSendSMS===false){
                        component.set("v.permissionErrorMessage", $A.get("$Label.smagicinteract.CANNOT_SND_SMS"));
                    }
                    if(allowTemplateChange===false){
                        component.set("v.allowToChangeTemplateSelection", "true");
                    }
                    returnVal.convList = returnVal.convList.map(function(message) {
                        if(message.channelData && message.channelData.urls) {
                            message.channelData.urls = message.channelData.urls.map(function(url) {
                                return {
                                    type : helper.getMediaType(url),
                                    path : helper.getMediaUrl(url)
                                };
                            });
                        }
                        return message;
                    });
                    var messageList = returnVal.convList;
                    if(messageList){
                        messageList.reverse();
                    }
                    component.set("v.messages", messageList);
                    var phoneMetaList = returnVal.phoneList;
                    if (phoneMetaList) {
                    	component.set("v.phoneList", phoneMetaList);
                    }
                    var senderMetaList = returnVal.senderList;
                    if (senderMetaList) {
                    	component.set("v.senderList", senderMetaList);
                    }
                    if(returnVal.templateNameList) {
                    	component.set("v.templateNameList", returnVal.templateNameList);
                    }
                    var i;
                    if (senderMetaList && senderMetaList.length > 0) {
                        var selectedValue = senderMetaList[0].name;
                        for(i=0; i < senderMetaList.length; i = i+1){
                            if(senderMetaList[i].preselectedOption===true) {
                                selectedValue = senderMetaList[i].name;
                            }
                        }
                        component.find("senderId").set("v.value", selectedValue);
                    }
                    if (phoneMetaList && phoneMetaList.length > 0) {
                        var selectedPhone=phoneMetaList[0].name;
                        for(i=0; i < phoneMetaList.length; i = i+1){
                            if(phoneMetaList[i].preselectedOption===true){
                                selectedPhone = phoneMetaList[i].name;
                            }
                        }
                        component.find("phoneFieldId").set("v.value", selectedPhone);
                    }
                    var templateTextMap = {};
                    var templateTextList = returnVal.templateTextList;
                    if (templateTextList) {
                        for(i=0; i < templateTextList.length; i =i+1){
                            templateTextMap[templateTextList[i].name] = templateTextList[i].label;
                        }
                        component.set("v.templateTextList", templateTextMap);
                    }
                } else if(returnVal === 'NO_PHONE_FIELDS_ON_OBJECT'){
                    component.set("v.auraMessage", $A.get("$Label.smagicinteract.NO_PHONE_FIELDS_ON_OBJECT"));
                } else {
                    component.set("v.auraMessage", $A.get("$Label.smagicinteract.LOAD_CONV_VIEW_PERMISSION_FAILURE"));
                }
            });
            $A.enqueueAction(action);
        } else {
            component.set("v.auraMessage", $A.get("$Label.smagicinteract.NON_SF_OBJECT_ERR"));
        }
    },
    doSendSMS : function(component, event, helper) {
        var sendSMS = component.get("c.sendSMS1");
        var selectedSenderId = component.find("senderId").get("v.value");
        var phoneField = component.find("phoneFieldId").get("v.value");
        var templateId = component.find("templateId").get("v.value");
        var templateText = component.find("smsTextId").get("v.value");
        var objectId = component.get("v.objectId");
        var mmsSubject = component.find("mmsSubject").get("v.value");
        var fileUrl = component.get("v.fileUrl");
        if(helper.isEmpty(phoneField) || (helper.isEmpty(templateText) && helper.isEmpty(fileUrl)) || helper.isEmpty(selectedSenderId)) {
            component.set("v.auraMessage", $A.get("$Label.smagicinteract.CONV_VIEW_VALIDATION"));
            return;
        }
        if(helper.isEmpty(templateText)) {
            templateText = '';
        }
        sendSMS.setParams({ objectId : objectId,
                           senderId : selectedSenderId,
                           phoneField : phoneField,
                           templateId : templateId,
                           templateText : templateText,
                           mmsSubject : mmsSubject,
                           fileUrl : fileUrl
                          });
        sendSMS.setCallback(this, function(data) {
            var returnVal = data.getReturnValue();
            var errMessage = returnVal.errorMessage;
            if(errMessage === "Failure") {
                component.set("v.auraMessage", $A.get("$Label.smagicinteract.SEND_SMS_FAILURE"));
            } else if(errMessage === "insufficient_access") {
                component.set("v.auraMessage", $A.get("$Label.smagicinteract.INSUFFICIENT_ACCESS"));
            } else if(errMessage === "Invalid_Object") {
                component.set("v.auraMessage", $A.get("$Label.smagicinteract.PACKAGE_RESTRICTION_SEND_SMS"));
            } else if(errMessage === "UNRLTD_TMPLT_MSG") {
                component.set("v.auraMessage", $A.get("$Label.smagicinteract.UNRLTD_TMPLT_MSG"));
            } else {
                component.set("v.templateTextPermission", null);
                component.set("v.auraMessage", null);
                component.find("smsTextId").set("v.value", "");
                component.find("templateId").set("v.value", "");
                if(component.get("v.allowToSendMMS")) {
                    helper.removeFile(component, event, helper);
                }
                returnVal.convList = returnVal.convList.map(function(message) {
                    if(message.channelData && message.channelData.urls) {
                    	message.channelData.urls = message.channelData.urls.map(function(url) {
                            return {
                                type : helper.getMediaType(url),
                                path : helper.getMediaUrl(url)
                            };
                        });
                    }
                    return message;
                });
                var messageList = returnVal.convList;
                if(messageList){
                    messageList.reverse();
                }
                component.set("v.messages", messageList);
                component.set("v.messages", returnVal.convList);
            }
        });
        $A.enqueueAction(sendSMS);
    },
    selectTemplate : function(component, event, helper){
    	var resolveTemplate = component.get("c.resolveTemplateText");
        var selectedTemplateId = component.find("templateId").get("v.value");
        var templateText = component.get("v.templateTextList");
        var smstextVar = component.find("smsTextId");
        var recordIds=component.get("v.objectId");
        var returnVal='';
        var originalTemplate=templateText[selectedTemplateId];
        component.set("v.templateTextPermission", null);
        if(!helper.isEmpty(selectedTemplateId)){
            resolveTemplate.setParams({ originalTemplate : originalTemplate,
                                       recordIds : recordIds});
            resolveTemplate.setCallback(this, function(data) {
                returnVal = data.getReturnValue();
                if(returnVal[0].ErrorMessage){
                    component.set("v.templateTextPermission", returnVal[0].ErrorMessage);
                    smstextVar.set("v.value", '');
                } else{
                    component.set("v.templateTextPermission", null);
                    smstextVar.set("v.value", returnVal[0].label);
                }
            });
            $A.enqueueAction(resolveTemplate);
        } else{
            component.set("v.templateTextPermission", null);
            smstextVar.set("v.value", '');
        }
    },
    reloadConversation : function (component, event, helper) {
        //console.log('Im here');
        //console.log('Contact Id is',event.getParam("recordId"));
        var objectId = component.get("v.objectId");
        if (event.getParam("recordId") && objectId &&
            (event.getParam("recordId") === objectId ||
           	event.getParam("recordId").slice(0, 15) === objectId)) {
	        helper.loadPage(component, event, helper, true);
        }
    },
    uploadFile : function (component, event, helper) {
        component.set("v.auraMessage", null);
        component.set("v.mmsUploadSuccess", null);
        var fileInput = component.find("upload_file").getElement();
        var file = fileInput.files[0];
        if(!file) {
            component.set("v.auraMessage", $A.get("$Label.smagicinteract.NO_MEDIA_FILE_SELECTED"));
        } else if (file.size > 500000) {
            component.set("v.auraMessage", $A.get("$Label.smagicinteract.FILE_SIZE_EXCEED") + file.size);
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
        //console.log('fileContents: '+fileContents);
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
                    component.set("v.fileUrl", returnVal.ErrorMessage);
                    component.set("v.mmsUploadSuccess", $A.get("$Label.smagicinteract.FILE_UPLOAD_SUCCESS"));
                } else if(returnVal.name === "500") {
                    component.set("v.fileUrl", "");
                    component.set("v.auraMessage", returnVal.ErrorMessage);
                }
            } else {
                var str = response.getError();
                component.set("v.fileUrl", "");
                component.set("v.auraMessage", str[0].message);
            }
        });
        $A.enqueueAction(action);
    },
    removeFile : function(component) {
        component.find("mmsSubject").set("v.value", "");
        component.set("v.fileUrl", "");
        component.find("upload_file").getElement().value = '';
        component.set("v.mmsUploadSuccess", null);
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
            if(!url) return 'FILE';
        	var extention = url.split('.').pop().toLowerCase();
            var type = 'FILE';
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
    isEmpty : function (val) {
        return (!val || !val.trim()) ? true : false;
    }
})