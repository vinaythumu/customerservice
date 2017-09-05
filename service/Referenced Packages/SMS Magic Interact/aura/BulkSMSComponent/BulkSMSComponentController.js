({
    doInit : function(component, event, helper) {
        var idList = component.get("v.IdList");
        var objectName = component.get("v.objectName");
        var str = $A.get("$Label.smagicinteract.NEW_CHARATER_COUNT_MSG");
        str = str.replace(/\{0\}/i, '0');
        component.set("v.characterCount", str);
        if(!objectName || !objectName.trim()) {
            str = $A.get("$Label.smagicinteract.CONFG_PLZ_SLCT_OBJ");
            component.set("v.auraErrorMessage", str);
            component.set("v.AllowToSendMMS", false);
            component.set("v.disableMe", true);
            return;
        }
        if(!idList || !idList.trim()) {
            str = $A.get("$Label.smagicinteract.SELECT_RECORD");
            component.set("v.auraErrorMessage", str);
            component.set("v.AllowToSendMMS", false);
            component.set("v.disableMe", true);
            return;
        }
        idList = idList.substring(1, idList.length-1);
        component.set("v.IdList", idList);
        idList = idList.split(',');

        /*var mobileFieldList = component.get("v.mobileFields");
        mobileFieldList = mobileFieldList.split(',');
        if(!mobileFieldList || mobileFieldList.length > 3) {
            component.set("v.auraErrorMessage","Mobile number field(s) can not be more than 3.");
            component.set("v.AllowToSendMMS", false);
            component.set("v.disableMe",true);
            return;
        }*/
        var nameField = component.get("v.nameField");
        if(!nameField || nameField.split(',').length > 1 || nameField.split(';').length > 1) {
            str = $A.get("$Label.smagicinteract.OBJECT_PERMISSION_MSG");
            str = str.replace(/\{0\}/i, objectName);
            component.set("v.auraErrorMessage", str);
            component.set("v.AllowToSendMMS", false);
            component.set("v.disableMe", true);
            return;
        }
        var optOutField = component.get("v.optOutField");
        if(optOutField) {
            if(optOutField.split(',').length > 1 || optOutField.split(';').length > 1) {
                str = $A.get("$Label.smagicinteract.OBJECT_PERMISSION_MSG");
                str = str.replace(/\{0\}/i, objectName);
                component.set("v.auraErrorMessage", str);
                component.set("v.AllowToSendMMS", false);
                component.set("v.disableMe", true);
                return;
            }
        }
        var unrelatedObjects = component.get("v.unrelatedObjects");
        if(!unrelatedObjects || !unrelatedObjects.trim()) {
            component.set("v.showUnrelatedPanel", false);
        } else {
            component.set("v.showUnrelatedPanel", true);
        }
        helper.retRecipientList(component, event, helper, idList);
    },
    getTemplateText : function(component) {
        var recipientClass = component.get("v.recipientClass");
        var templateValue =  recipientClass.templatesList.templateValue;
        var templateId = component.find("TemplateSelect").get("v.value");
        var str = $A.get("$Label.smagicinteract.NEW_CHARATER_COUNT_MSG");
        var text = "";
        if(templateId) {
            for(var i=0; i<templateValue.length; i = i+1) {
                if(templateValue[i].value === templateId) {
                    text = templateValue[i].label;
                }
            }
        }
        component.set("v.templateText", text);
        str = str.replace(/\{0\}/i, text.length);
        component.set("v.characterCount", str);
    },
    countFunction : function(component ) {
        var selected = component.get("v.templateText");
        if(selected.length > 700) {
            selected = selected.substring(0, 700);
            component.set("v.templateText", selected);
        }
        var str = $A.get("$Label.smagicinteract.NEW_CHARATER_COUNT_MSG");
        str = str.replace(/\{0\}/i, selected.length);
        component.set("v.characterCount", str);
    },
    sendSMS : function(component, event, helper) {
        var idList = component.get("v.IdList");
        idList = idList.split(',');
        helper.doSendSMS(component, event, helper, idList);
    },
    uploadFile : function(component, event, helper) {
        helper.uploadFile(component, event, helper);
    },
    removeFile : function(component, event, helper) {
        helper.removeFile(component, event, helper);
    },
    removeRecipient : function(component, event) {
        var key = event.target.id;
        var recipientClass = component.get("v.recipientClass");
        var name;
        var excludedRecord;
        var recipientList = recipientClass.recipientList;
        var i;
        for(i =0;i<recipientList.length;i = i+1){
            if(recipientList[i].key === key) {
                name = recipientList[i].name;
                excludedRecord = recipientList[i].id+':'+recipientList[i].phoneFieldType;
                recipientList.splice(i, 1);
                break;
            }
        }
        if(i !== recipientList.length && !recipientList[i].name) {
            recipientList[i].name = name;
        }
        var str = "";
        if(!recipientList.length) {
            component.set("v.AllowToSendMMS", false);
            component.set("v.auraInfoMessage", "");
            component.set("v.disableMe", true);
        } else {
            str = $A.get("$Label.smagicinteract.NO_OF_RECORDS_SELECTED_FOR_SEND_SMS_TYPE_1");
            str = str.replace(/\{0\}/i, recipientList.length);
            component.set("v.auraInfoMessage", str);
        }
        /*var duplicateMobileNumbers = recipientClass.duplicateMobileNumbers;
        if(duplicateMobileNumbers && duplicateMobileNumbers.length) {
            str += '\n'+$A.get("$Label.smagicinteract.DUPLICATE_RECORD_WARNING_MSG");
            str += duplicateMobileNumbers+'.';
        }*/
        var excludedRecipientList = component.get("v.excludedRecipientList");
        excludedRecipientList.push(excludedRecord);
        recipientClass.recipientList = recipientList;
        component.set("v.excludedRecipientList", excludedRecipientList);
        component.set("v.recipientClass", recipientClass);
        str = $A.get("$Label.smagicinteract.RECIPIENTS_COUNT");
        str = str.replace(/\{0\}/i, recipientList.length);
        component.set("v.recipientsCount", str);
    },
    searchUnrelatedObject : function(component, event, helper) {
        helper.searchUnrelatedObject(component, event, helper);
    },
    removeUnrelatedObject : function(component, event) {
        var key = event.target.id;
        var recipientClass 			= component.get("v.recipientClass");
        var unrelatedObjectIdList	= component.get("v.unrelatedObjectIdList");
        var unrelatedObjectStoreList= recipientClass.unrelatedObjectStoreList;
        if(unrelatedObjectStoreList) {
            for(var i=0; i<unrelatedObjectStoreList.length; i = i+1) {
                if(parseInt(key, 10) === unrelatedObjectStoreList[i].rowNumber) {
                    unrelatedObjectStoreList[i].recordId = '';
                    unrelatedObjectStoreList[i].recordName = '';
                    unrelatedObjectIdList[key-1] = '';
                }
            }
            recipientClass.unrelatedObjectStoreList = unrelatedObjectStoreList;
            component.set("v.unrelatedObjectIdList", unrelatedObjectIdList);
            component.set("v.recipientClass", recipientClass);
        }
    },
    unrelatedRecordSelection : function(component, event) {
        var recipientClass 			= component.get("v.recipientClass");
        var unrelatedObjectIdList	= component.get("v.unrelatedObjectIdList");
        var selectedUnrelatedKey	= component.get("v.selectedUnrelatedKey");
        var unrelatedObjectStoreList= recipientClass.unrelatedObjectStoreList;
        var id = event.target.id;
        var value = event.target.value;
        if(unrelatedObjectStoreList) {
            for(var i=0; i<unrelatedObjectStoreList.length;i = i+1) {
                if(parseInt(selectedUnrelatedKey, 10) === unrelatedObjectStoreList[i].rowNumber) {
                    unrelatedObjectStoreList[i].recordId = id;
                    unrelatedObjectStoreList[i].recordName = value;
                    unrelatedObjectIdList[selectedUnrelatedKey-1] = unrelatedObjectStoreList[i].objectName+":"+id;
                } else if(!unrelatedObjectIdList[i]) {
                    unrelatedObjectIdList[i] = "";
                }
            }
            recipientClass.unrelatedObjectStoreList = unrelatedObjectStoreList;
            component.set("v.unrelatedObjectIdList", unrelatedObjectIdList);
            component.set("v.recipientClass", recipientClass);
        }
    },
    showHideMMSSection : function(component) {
        var showMMSSection = component.get('v.showMMSSection');
        component.set('v.showMMSSection', !showMMSSection);
    },
    navigationToHome : function (component, event, helper) {
        var retUrl = helper.getUrlParameter("retURL");
        if(!retUrl || !retUrl.trim()) {
        	/*global sforce:true*/
        		sforce.one.back(true);
        } else {
            window.location.href = retUrl;
        }
    }
})