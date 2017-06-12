import axios from 'axios'
var http = axios.create({
    //baseURL: 'https://ystc.leyix.com/api/',
    baseURL:'http://192.168.10.54:88/api/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer 123'
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
