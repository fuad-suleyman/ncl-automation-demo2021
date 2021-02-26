const {protractor} = require('protractor');
const by = protractor.by;
let element = protractor.element;


let Vacations = function () {

this.viewMoreResults = element(by.xpath("//button[.='View More Results']"));
this.viewCruise = element.all(by.xpath("//a[.='View Cruise']"));
this.vacationMonth = function (month) {
    let el = element.all(by.xpath("//span[.='"+month+",']"));
   
    return el;
}
this.pageMessage = element(by.xpath("//span[.='BOOK YOUR VACATION WITH PEACE OF MIND']"));

this.closePop = element(by.id("simplemodal-close-img"));


}
module.exports = new Vacations();