import Vue from 'vue'

//测试，大写
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  });

//价格：元
Vue.filter('price_yuan', function (value) {
  if (!value) return ''
  value = value.toString()
  let reg_head=/(.*)\./;
  var arrh = value.match(reg_head);
  if(arrh){
    return arrh[1]
  }else{
    return value
  }
});

//价格：角
Vue.filter('price_jiao', function (value) {
  if (!value) return ''
  value = value.toString()
  let reg_tail=/\.(.*)/;
  var arrt = value.match(reg_tail);
  if(arrt){
    return '.'+arrt[1]
  }else{
    return ''
  }

});

