({
    init : function(component) {
        var action = component.get("c.loadData");
        action.setCallback(this, function(data) {
            var returnVal = data.getReturnValue();
            if(returnVal[0].ErrorMessage === 'CREAT_CONV_PROFILE_PERM_ERR') {
                component.set("v.auraMessage", "{!$Label.smagicinteract.CREAT_CONV_PROFILE_PERM_ERR}");
                return;
            }
            if(returnVal[0].ErrorMessage === 'CREAT_CONV_VF_PERM_ERR') {
                component.set("v.auraMessage", "{!$Label.smagicinteract.CREAT_CONV_VF_PERM_ERR}");
                return;
            }
            if(returnVal) {
                component.set("v.objectList", returnVal);
            } else {
                component.set("v.auraMessage", "{!$Label.smagicinteract.LOAD_CONV_VIEW_PERMISSION_FAILURE}");
            }
        });
        $A.enqueueAction(action);
    },
    createChat : function(component) {
        var postHTTPCallout = component.get("c.postHTTPCallout");
        var pageLabelName=component.find("pageLabelName").get("v.value");
        var pageAPIName=component.find("pageAPIName").get("v.value");
        var ObjectId=component.find("objectId").get("v.value");
        function isEmpty(val){
            return (!val || val.trim().length <= 0) ? true : false;
        }
        if(isEmpty(ObjectId) || isEmpty(pageAPIName) || isEmpty(pageLabelName)) {
            component.set("v.auraMessage", "{!$Label.smagicinteract.CONV_VIEW_ERR_MSG}");
            return;
        }
        postHTTPCallout.setParams({ pageAPIName : pageAPIName,
                                   pageLabelName : pageLabelName,
                                   objectName : ObjectId
                                  });
        postHTTPCallout.setCallback(this, function(data) {
            var returnVal = data.getReturnValue();
            if(returnVal.ErrorMessage === 'CREAT_CONV_PROFILE_PERM_ERR') {
                component.set("v.auraMessage", "{!$Label.smagicinteract.CREAT_CONV_PROFILE_PERM_ERR}");
                return;
            }
            if(returnVal.ErrorMessage === 'CREAT_CONV_VF_PERM_ERR') {
                component.set("v.auraMessage", "{!$Label.smagicinteract.CREAT_CONV_VF_PERM_ERR}");
                return;
            }
            if(returnVal.name === "201") {
                component.set("v.successMessage", "{!$Label.smagicinteract.Conversation_View_Success_Message}");
            } else {
                component.set("v.auraMessage", returnVal.ErrorMessage);
            }
        });
        $A.enqueueAction(postHTTPCallout);
    }
})