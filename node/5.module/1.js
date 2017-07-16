function Man() {
  this._events = {}
}
Man.prototype.on = function(eventName, callback) {
  if (!this._events[eventName]) {
    this._events[eventName] = [];
  }
  this._events[eventName].push(callback);
}

Man.prototype.emit = function(eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(item => item(...args));
  }
}
Man.prototype.off = function(eventName, callback) {
  let arr = this._events[eventName];
  if (arr) {
    this._events.filter(cb => cb != callback);
  }
}
