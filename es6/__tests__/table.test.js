//currently my test cases are getting failed working on it 

import Table from "../table";
import TestData  from "../testData.json";

// console.log(TestData);
beforeAll(()=>"executing the testCases")

describe("running the test Main", () => {
  test("Testing for main table result", () => {
    const testData = { body: JSON.stringify(TestData)};
 
   document.body.innerHTML =`<tbody id="row"></tbody>`;
    const t = new Table();


   jest.spyOn(t,'addTd')
    jest.spyOn(t, 'sortingSparkLineData');
    jest.spyOn(t, 'showData');
    jest.spyOn(t, 'getSortedData');
 
    window.Sparkline = {draw: jest.fn()};
   
    expect(t.pushData(testData)).toHaveBeenCalledTimes(1)
    expect(t.data).toMatchObject({});
    expect(t.data).toHaveProperty(TestData.name);
  
    expect(t.pushData).toHaveBeenCalledWith(testData);
    expect(t.sortingSparkLineData).toHaveBeenCalled();
    expect(t.addTd).toHaveBeenCalled();
   expect(t.showData).toHaveBeenCalled();
   expect(t.getSortedData).toHaveBeenCalled();
    
  });

});