import axios from 'axios'
let TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzE5Mi4xNjguMTAuNTQ6ODhcL2FwaVwvdG9rZW4iLCJpYXQiOjE0OTc0OTc3ODcsImV4cCI6MTgwODUzNzc4NywibmJmIjoxNDk3NDk3Nzg3LCJqdGkiOiJUem4xUjZXeVg3TUxHTFZoIn0.u4C1hWZdnCBqSM-TheI9INQHiy5NExrzZXDPEZw8x74'
var http = axios.create({
    //baseURL: 'https://ystc.leyix.com/api/',
    baseURL:'http://192.168.10.54:88/api/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer '+TOKEN
    }
});
export default {
    //http
    userGet(url, cb, error) {
        http.get(url).then(res => {
            cb(res)
        }).catch(err => {
            error(err)
        });
    },
    userPost(url,data, cb, error) {
        http.post(url,data).then(res => {
            cb(res)
        }).catch(err => {
            error(err)
        });
    },
    //判断登录的请求
    userAuthGet(url, cb, error){
        http.get(url).then(res => {
            $loading.hide()
            cb(res)
        }).catch(err => {
            $loading.hide()
            //TODO 判断是否登录


            error(err)

        });
    },
    //ssession
    get (name) {
      let value = sessionStorage.getItem(name)
      if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
      return value
    },
    set (name, value) {
      if (typeof value === typeof {}) value = JSON.stringify(value)
      return sessionStorage.setItem(name, value)
    },
    remove (name) {
      return sessionStorage.removeItem(name)
    }
}
