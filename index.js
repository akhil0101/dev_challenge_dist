/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')



const generateTable = require('./es6/table');


// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

// To get the data from stomp
function connectCallback() {
 
  const t = new generateTable();
  client.subscribe("/fx/prices", t.pushData);
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})

// const exampleSparkline = document.getElementById('example-sparkline')
// Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])