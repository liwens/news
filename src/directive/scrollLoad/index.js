import Vue from 'vue'




/**
 * [addEvent description]
 * @param {[dom]}   el   [要绑定的dom元素]
 * @param {[string]}   type [要绑定的事件类型，例如click]
 * @param {Function} fn   [要绑定的函数]
 */
function addEvent(el, type, fn) {
  if (window.addEventListener) {
    addEvent = function(el, type, fn) {
      el.addEventListener(type, fn);
    }
  } else if (addEvent) {
    addEvent = function(el, type, fn) {
      el.dispatchEvent('on' + type, fn);
    }
  }
  addEvent(el, type, fn);
}

/**
 * 解除绑定
 * @param {[dom]}  el  [要解绑的dom元素]
 * @param {[string]}  type [要解绑的事件类型，例如click]
 * @param {Function} fn   [要解绑的函数]
 */
function removeEvent(el, type, fn) {
  if (window.removeEventListener) {
    el.removeEventListener(type, fn)
  } else if (window.attachEvent) {
    el.detachEvent('on' + type, fn)
  }
}


function bind(el, binding, vnode) {
  let fn = binding.expression;
  let vue = vnode.context;
  console.log(vue);
  alert('xxx')
}


export default {
  scroll: {
    bind: bind
  }
}

let install(Vue, options = {}) {
  Vue.directive('scrollLoad', {
    bind: bind,
    unbind: ''
  })
}