/*
* 自定义事件
* 构造器函数
* 不传入值，创建时创造一个对象，用于保存事件类型和对应方法
* */
function EventTarget(){
    this.handlers = {};     //用于存放作为键名的事件名type，以及作为值的方法数组
}

EventTarget.prototype = {
    constructor:EventTarget,

    //增加一个事件类型，绑定对应的执行方法
    addHandler:function(type,handler){
        if(typeof this.handlers[type] === 'undefined'){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },

    //传入对象，触发事件，对象至少要传入event.type来确定触发的事件类型；也可以传入其他可选参数
    fire:function(event){
        if(!event.target){
            event.target = this;
        }
        if(Array.isArray(this.handlers[event.type])){
            let handlers =  this.handlers[event.type];
            for(let i=0; i<handlers.length;i++){
                handlers[i](event);
            }
        }
    },

    //删除一个事件类型对应的执行方法
    removeHandler:function(type,handler){
        if(Array.isArray(this.handlers[type])){
            let handlers = this.handlers[type];
            for(let i=0; i<handlers.length; i++){
                if(handlers[i] === handler){
                    handlers.splice(i,1);
                    break;
                }
            }
        }

    }





};