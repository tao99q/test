const fs = require('fs');
let rs = fs.createReadStream('./1.txt', {highWaterMark: 1});

let buffAry = [];
rs.on('data', function(data) {
  buffAry.push(data);
});
rs.on('end', function() {
  let buff = Buffer.concat(buffAry);
  console.log(buff.toString());
});
