@isTest
private class CaseTriggeTest {
static testMethod void myTest() {
    Case c = new Case();
    c.Origin = 'Web';
    c.createddate2__c   = date.parse('04/17/2017');
    c.closeddate2__c    = date.parse('04/20/2017');
    insert c;
    c.Origin = 'Phone';
    update c;
}
}