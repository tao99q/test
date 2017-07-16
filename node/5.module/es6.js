class Person{
  constructor(name,age){
    this.name = name;

  }
  static a(){
    console.log('static');
  }
  drink(){
    console.log('hi');
  }
}

class Girl extends Person{
  constructor(name,age){
    super(name,age);
    this.age = age;
  }
}
let girl = new Girl("li",22);
girl.drink();
Girl.a();
console.log(girl.name)
