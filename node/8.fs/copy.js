const fs = require('fs');
function copy(source, target, callback) {
  fs.readFile(source, 'utf8', (error, data) => {
    if(error) return callback(error);
    console.log(data.toString())
    fs.writeFile(target, data, error => callback(error));
  });
}
copy('11.txt','2.txt',error=>{
  console.log(error)
})
