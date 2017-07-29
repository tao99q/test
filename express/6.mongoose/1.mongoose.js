let mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://127.0.0.1/201704node');
let UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, {collection: 'user'});
let User = conn.model('User', UserSchema);
User.create({name: 'bb', age: '9'}, (err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});
// User.remove({age: 8}, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });
// let users = [];
// for (let i=11;i<=20;i++){
//     users.push({name:`a${i}`,age:i})
// }
// User.create(users,(err, doc) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(doc);
//     }
// });
// User.update({_id: '5972cc8870129211e011ee47'}, {name:'b1',$inc:{age: 2}},(err,result)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// User.find({name: 'b1'}, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });
// User.find({$or:[{name:'a2'},{age:10}]},{_id:0},(err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// User.find({age:{$gte:5}},{_id:0},(err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });
// let username, password;
// User.findOne({username, password}, (err, doc) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(docs);
//     }
// });

// User.findById('5972cc8870129211e011ee50',(err, docs) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(docs);
//     }
// });

let pageNum = 2;
let pageSize = 5;

// User.find((err, docs) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(docs);
//     }
// }).skip((pageNum - 1) * pageSize);
mongoose.Promise = Promise;
User.find()
    .sort({age: -1})
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .exec((err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(docs);
        }
    });