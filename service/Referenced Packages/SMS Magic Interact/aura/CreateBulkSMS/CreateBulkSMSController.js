({
	doInit : function(component, event, helper) {
        helper.retAllObjects(component, event, helper);
    },
    selectedObjectChange : function(component, event, helper) {
        helper.retAllFields(component, event, helper);
        helper.retAllOptOutFields(component, event, helper);
        helper.retAllNameFields(component, event, helper);
        helper.optOutChange(component, event, helper);
        helper.retIsOptOut(component, event, helper);
    },
    autoPopulateAPIName : function(component, event, helper) {
        helper.autoPopulateAPIName(component, event, helper);
    },
    createPage : function(component, event, helper) {
        helper.createPage(component, event, helper);
    },
    optOutChange :function(component, event, helper) {
        helper.optOutChange(component, event, helper);
        helper.retIsOptOut(component, event, helper);
    }
})