const {protractor} = require('protractor');
const by = protractor.by;
let element = protractor.element;


let HomePage = function () {

this.calendarButton = element(by.xpath("//span[.='Dates']"));
this.months = element.all(by.xpath("//div[@class='c27_body']//div"));
this.counter = element(by.xpath("(//div[@class='c197_block -dates']//span[@class='c20_total_item'])[1]"));
this.apply = element(by.xpath("//div[@class='c197_block -dates']//*[.='Apply']/a"));
this.findACruise = element(by.xpath("//a[@data-action='find-a-cruise']"));

//this.january = element(by.xpath("//*[@id='month-view-32006']/div/div[2]/div/div[2]/div/div/div/div/div[1]/ul/li[1]/div/div[2]/ul/li[1]/div"));


}
module.exports = new HomePage();