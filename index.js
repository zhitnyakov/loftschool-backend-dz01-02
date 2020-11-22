const http = require('http');

let intervals = [];

http.createServer((req, res) => {
  if (req.url === '/start') {
    interval = setInterval(() => {
      console.log(getTime())
    }, process.env.INTERVAL_VALUE || 1000)

    intervals.push(interval);

    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({success: true}));
    res.end();
  } else if(req.url === '/stop') {
    if (intervals.length > 0) clearInterval(intervals.pop());

    res.setHeader("Content-Type", "application/json");
    response = {
      success: true,
      intervalsLeft: intervals.length,
      datetime: getTime()
    }
    res.write(JSON.stringify(response));
    res.end();
  }
}).listen(3000);

function getTime() {
  return new Date(Date.now()).toUTCString();
}