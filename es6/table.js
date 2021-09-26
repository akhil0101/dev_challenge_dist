 class Main {
  constructor() {
    this.data = {};
    this.pushData = this.pushData.bind(this);
    this.getSortedData = this.getSortedData.bind(this);
    this.showData = this.showData.bind(this);
    this.sortSparkLineData = this.sortingSparkLineData.bind(this);
    this.addTd=this.addTd.bind(this);
  }

  // pushData is used as callback in client.subscribe method to handle the response
  pushData(payload){
    //console.log(payload.body);
    const res = JSON.parse(payload.body);
    const avg = (res.bestBid + res.bestAsk) / 2;
    const curr = this.data[res.name];
    const date = new Date();
    const currTimeInMilliseconds = Date.parse(date);
    if (!!curr) {
      curr.avg.push([currTimeInMilliseconds, avg]);
      res.avg = curr.avg;
    } else {
      res.avg = [[currTimeInMilliseconds, avg]];
    }
    this.data[res.name] = res;
    this.sortingSparkLineData();
    this.showData();
  }

  //Calculating sparline data over the last 20 seconds for each currency
  sortingSparkLineData() {
    const currentdate = new Date();
    const currTimeInMilliseconds = Date.parse(currentdate);
    const pastTime = currTimeInMilliseconds - 20000;
    Object.keys(this.data).forEach(element => {
 
      const filteredArrayItems = this.data[element].avg.filter(i => i[0] > pastTime);
      this.data[element].avg = filteredArrayItems;
    });
  }

  //sort based on  lastChangeBid to represent in table
  getSortedData() {
    const objValues = Object.values(this.data);
    return objValues.sort((a, b) => (a.lastChangeBid - b.lastChangeBid))
  }

  // Creating rows and cells for table to show data
  showData() {
    const data = this.getSortedData();
    const table = document.getElementById('row');
    console.log(table);
    var fragment = new DocumentFragment();
    // console.log(table );
    data.forEach(item => {
      const tableRow = document.createElement("tr");
      this.addTd( tableRow,item.name);
      this.addTd(tableRow,item.bestBid);
      this.addTd(tableRow,item.bestAsk);
      this.addTd( tableRow,item.lastChangeBid);
      this.addTd(tableRow,item.lastChangeAsk);
      const sparks = document.createElement('span');
      let sparkLineData = [];
      item.avg.forEach(i => sparkLineData.push(i[1]));
      Sparkline.draw(sparks, sparkLineData);
      const sparkCell = document.createElement("td");
    
      sparkCell.appendChild(sparks);
      tableRow.appendChild(sparkCell);
      fragment.appendChild(tableRow);
    });
   table.innerHTML = "";
     table.appendChild(fragment);
  }

  //creating cell
  addTd(parent,data) {
    const cell = document.createElement("td");
    cell.innerHTML = data;
  
    parent.appendChild(cell);
  }
}

module.exports=Main;
