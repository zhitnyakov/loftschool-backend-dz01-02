const http = require('http');

const intervals = [];

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/start') {
    const interval = setInterval(() => {
      console.log(getTime());
    }, process.env.INTERVAL_VALUE || 1000);

    intervals.push(interval);

    res.write(JSON.stringify({ success: true }));
  } else if (req.url === '/stop') {
    if (intervals.length > 0) clearInterval(intervals.pop());

    const response = {
      success: true,
      intervalsLeft: intervals.length,
      datetime: getTime()
    };

    res.write(JSON.stringify(response));
  }

  res.end();
}).listen(3000);

function getTime () {
  return new Date(Date.now()).toUTCString();
}
