let async = require('async');

async.parallel([
    (cb)=>{
        setTimeout(()=>{
            console.log(1);
            cb(null,"1");
        },2000)
    } ,
    (cb)=>{
        setTimeout(()=>{
            console.log(2);
            cb(null,"2");
        },3000)
    }
],(err,result)=>{
    console.log(err);
    console.log(result);
});