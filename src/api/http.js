import axios from 'axios'
var http = axios.create({
    baseURL: 'http://116.62.104.134/api/',
    //baseURL:'http://192.168.10.54:88/api/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer 123'
    }
});
export default {
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
    }
}
