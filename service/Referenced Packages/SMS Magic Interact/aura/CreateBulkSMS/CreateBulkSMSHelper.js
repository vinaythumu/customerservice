({
    retAllObjects : function(component, event, helper){
        var action = component.get("c.getAllObjects");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.allObjects", response.getReturnValue());
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.errorMessage(component, event, helper, errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    retIsOptOut : function(component, event, helper){
        var action = component.get("c.getOptOutSelectOpt");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.isOptOut", response.getReturnValue());
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.errorMessage(component, event, helper, errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    retAllFields : function(component, event, helper){
        var objectName = component.find("ObjectSelect").get("v.value");
        component.set("v.allFields", null);
        component.find("MobileFieldsSelect").set("v.value", "");
        if(objectName) {
            var action = component.get("c.getAllFields");
            action.setParams({objectName : objectName});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.allFields", response.getReturnValue());
                } else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            helper.errorMessage(component, event, helper, errors[0].message);
                        }
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
    optOutChange : function(component, event, helper){
        var OptOut = component.find("OptOutFieldSelect").get("v.value");
        if(!OptOut){
            component.set("v.showOptOut", false);
        } else {
            component.set("v.showOptOut", true);
            helper.retIsOptOut(component, event, helper);
        }
    },
    retAllOptOutFields : function(component, event, helper){
        var objectName = component.find("ObjectSelect").get("v.value");
        component.set("v.allOptOutFields", null);
        component.find("OptOutFieldSelect").set("v.value", "");
        if(objectName) {
            var action = component.get("c.getAllOptOutFields");
            action.setParams({objectName : objectName});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.allOptOutFields", response.getReturnValue());
                } else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            helper.errorMessage(component, event, helper, errors[0].message);
                        }
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
    retAllNameFields : function(component, event, helper){
        var objectName = component.find("ObjectSelect").get("v.value");
        component.set("v.nameFields", null);
        if(objectName) {
            var action = component.get("c.getAllNameFields");
            action.setParams({objectName : objectName});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.nameFields", response.getReturnValue());
                } else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            helper.errorMessage(component, event, helper, errors[0].message);
                        }
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
    autoPopulateAPIName : function(component){
        var label = component.find("pageLabel").get("v.value");
        var name  = component.find("pageName");
        var pageName = name.get("v.value");
        label = label.trim();
        if(!pageName || !pageName.trim()) {
            pageName = "";
            var labelArray = label.split(" ");
            for(var i=0;i<labelArray.length-1;i = i+1){
                pageName = pageName + labelArray[i]+"_";
            }
            pageName = pageName + labelArray[labelArray.length-1];
        }
        component.find("pageName").set("v.value", pageName);
    },
    errorMessage : function(component, event, helper, errorMessage){
        component.set("v.successMessage", null);
        component.set("v.auraMessage", errorMessage);
    },
    createPage : function(component, event, helper){
        var pageLabel = component.find("pageLabel").get("v.value");
        if(!pageLabel){
            helper.errorMessage(component, event, helper, $A.get("$Label.smagicinteract.ENTER_PAGE_LABEL"));
            return;
        }
        var pageName  = component.find("pageName").get("v.value");
        if(!pageName){
            helper.errorMessage(component, event, helper, $A.get("$Label.smagicinteract.ENTER_PAGE_NAME"));
            return;
        }
        var objectName  = component.find("ObjectSelect").get("v.value");
        if(!objectName){
            helper.errorMessage(component, event, helper, $A.get("$Label.smagicinteract.SELECT_A_OBJECT"));
            return;
        }
        var mobileFields  = component.find("MobileFieldsSelect").get("v.value");
        if(!mobileFields){
            helper.errorMessage(component, event, helper, $A.get("$Label.smagicinteract.ERROR_MOBILE_FIELDS"));
            return;
        }
        if(mobileFields.split(';').length > 3) {
            helper.errorMessage(component, event, helper, $A.get("$Label.smagicinteract.MAXIMUM_ALLOWED_FIELDS"));
            return;
        }
        var nameField  = component.find("NameFieldSelect").get("v.value");
        if(!nameField){
            helper.errorMessage(component, event, helper, $A.get("$Label.smagicinteract.ERROR_NAME_FIELD"));
            return;
        }
        var isOptOut  = component.find("isOptOut").get("v.value");
        var optFieldValue = component.find("OptOutFieldSelect").get("v.value");
        if(!optFieldValue){
            optFieldValue="";
            isOptOut = true;
        }
        var unRelated = component.find("unrelated").get("v.value");
        if(!unRelated){
            unRelated = "";
        }
        var action = component.get("c.createNewPage");
        action.setParams({pageLabel : pageLabel,
                          pageName  : pageName,
                          objectName : objectName,
                          mobileFields : mobileFields,
                          nameField : nameField,
                          isOptOut : isOptOut,
                          optFieldValue :optFieldValue,
                          unRelated     : unRelated
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnVal = response.getReturnValue();
                if(returnVal.ErrorMessage === 'CREAT_CONV_PROFILE_PERM_ERR') {
                    component.set("v.successMessage", null);
                    component.set("v.auraMessage", $A.get("$Label.smagicinteract.CREAT_CONV_PROFILE_PERM_ERR"));
                    return;
                }
                if(returnVal.ErrorMessage === 'CREAT_CONV_VF_PERM_ERR') {
                    component.set("v.successMessage", null);
                    component.set("v.auraMessage", $A.get("$Label.smagicinteract.CREAT_CONV_VF_PERM_ERR"));
                    return;
                }
                if(returnVal.name === "201") {
                    component.set("v.auraMessage", null);
                    component.set("v.successMessage", $A.get("$Label.smagicinteract.BULK_LIGHTNING_MESSAGE"));
                } else {
                    component.set("v.successMessage", null);
                    component.set("v.auraMessage", returnVal.ErrorMessage);
                }
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.errorMessage(component, event, helper, errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    }
 })