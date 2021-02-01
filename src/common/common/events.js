
var Events = require('events')
var EventEmitter = null;

export default{
  init() {
    if(EventEmitter){
      return;
    }else{
      EventEmitter = new Events();
    }
  },
  on(event, func){
    if(!EventEmitter){
      this.init();
    }
    EventEmitter.on(event, func)
  },
  emit(event, data){
    if(!EventEmitter){
      return;
    }
    EventEmitter.emit(event, data)
  }
}
