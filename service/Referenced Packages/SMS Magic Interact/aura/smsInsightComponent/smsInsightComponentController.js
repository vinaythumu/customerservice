({
	init : function(component, event, helper) {
        helper.initHelper(component, event, helper);
	},
    sendSMS : function(component, event, helper) {
        helper.doSendSMS(component, event, helper);
    },
    selectTemplate : function(component, event, helper) {
        helper.selectTemplate(component, event, helper);
    },
    reloadConversation : function(component, event, helper) {
        helper.reloadConversation(component, event, helper);
    },
    uploadFile : function(component, event, helper) {
        helper.uploadFile(component, event, helper);
    },
    composeMessage : function(component) {
        var chatHistory = component.find('chatHistory');
        $A.util.toggleClass(chatHistory, 'minimized');
    },
    removeFile : function(component, event, helper) {
        helper.removeFile(component, event, helper);
    },
    onMessageChange : function(component) {
       component.set('v.smsText', component.find("smsTextId").get("v.value"));
       return component.get("v.smsCharLimit") - component.get("v.smsText").length >= 0;
    },
    scrollPosition : function(component) {
        setTimeout(function(){
            var element = component.find("chatHistory").getElements()[0];
        	element.scrollTop = element.scrollHeight;
        },50);
        setTimeout(function(){
        	var colors = component.get("v.bubbleColors");
            var i;
            if(colors){
            	var colorList = colors.split(';');
            	var outgoingMessage = document.getElementsByClassName('other-message');
            	for(i=0;i<outgoingMessage.length;i++){
            	    outgoingMessage[i].style.backgroundColor = colorList[0];
            	}
            	var incomingMessage = document.getElementsByClassName('my-message');
            	for(i=0;i<incomingMessage.length;i++){
            	    incomingMessage[i].style.backgroundColor = colorList[1];
            	}
       		}
        },50);
    },
    hideSpinner : function(component, event, helper){
        var spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-hide");
        $A.util.removeClass(spinner, "slds-show");
    },
    showSpinner : function(component, event, helper){
        var spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-show");
        $A.util.removeClass(spinner, "slds-hide");
    }
})