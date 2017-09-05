/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CampaignSMSBatch implements Database.AllowsCallouts, Database.Batchable<SObject> {
    global CampaignSMSBatch(String statusFieldValue, String objType, String contactSMSText, String leadSMSText, String recordIds, Boolean flag, String optOutFieldValue) {

    }
    global CampaignSMSBatch(String senderIdValue, Set<String> statusFieldValue, String objType, String contactSMSText, String leadSMSText, String recordIds, Boolean flag, String optOutFieldValue, String leadPhoneFieldValue, String contactPhoneFieldValue, Id leadTmplId, Id conTmplId) {

    }
    global CampaignSMSBatch(String senderIdValue, Set<String> statusFieldValue, String objType, String contactSMSText, String leadSMSText, String recordIds, Boolean flag, String optOutFieldValue, String leadPhoneFieldValue, String contactPhoneFieldValue, Id leadTmplId, Id conTmplId, Map<String,Id> unrelatedObjectIdMap) {

    }
    global CampaignSMSBatch(String senderIdValue, Set<String> statusFieldValue, String objType, String contactSMSText, String leadSMSText, String recordIds, Boolean flag, String optOutFieldValue, String leadPhoneFieldValue, String contactPhoneFieldValue, Id leadTmplId, Id conTmplId, Map<String,Id> unrelatedObjectIdMap, Map<String,smagicinteract.MessageTO> externalIdToMessageMap) {

    }
    global CampaignSMSBatch(String senderIdValue, Set<String> statusFieldValue, String objType, String contactSMSText, String leadSMSText, String recordIds, Boolean flag, String optOutFieldValue, String leadPhoneFieldValue, String contactPhoneFieldValue, Id leadTmplId, Id conTmplId, Map<String,Id> unrelatedObjectIdMap, smagicinteract.ApexAPI.mmsInputDetails mmsLeadInputDetailObj, smagicinteract.ApexAPI.mmsInputDetails mmsContactInputDetailObj) {

    }
    global void execute(Database.BatchableContext BC, List<SObject> scope) {

    }
    global void finish(Database.BatchableContext BC) {

    }
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return null;
    }
}
