function Person(name) {
  this.name = name;
}
Person.prototype.drink = function() {
  console.log("hi");
}
function Girl(name, age) {
  Person.call(this, name, age);
  this.age = age;
}

function create(fn) {
  function Fn() {}
  Fn.prototype = fn;
  return Fn;
}
