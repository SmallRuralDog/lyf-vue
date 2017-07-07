import axios from 'axios'

export default {
  //http
  userGet(url, cb, error) {
    var http = axios.create({
      baseURL: HOST + '/api/',
      timeout: 10000,
      headers: {
        'Authorization': 'Bearer ' + this.l_get("token")
      }
    });
    http.get(url).then(res => {
      cb(res)
    }).catch(err => {
      error(err)
    });
  },
  userPost(url, data, cb, error) {
    var http = axios.create({
      baseURL: HOST + '/api/',
      timeout: 10000,
      headers: {
        'Authorization': 'Bearer ' + this.l_get("token")
      }
    });
    http.post(url, data).then(res => {
      cb(res)
    }).catch(err => {
      error(err)
    });
  },
  //判断登录的请求
  userAuthGet(url, cb, error) {
    if (this.ck_login()) {
      var uhttp = axios.create({
        baseURL: HOST + '/api/',
        timeout: 10000,
        headers: {
          'Authorization': 'Bearer ' + this.l_get("token")
        }
      });
      uhttp.get(url).then(res => {
        if (res.data.status_code <= -10000) {
          $toast.show("登录信息已过期")
          this.l_remove("token");
          this.ck_login()
        }
        cb(res)
      }).catch(err => {
        $loading.hide()
        //TODO 判断是否登录
        error(err)
      });
    } else {
      $toast.show("未登录")
      return
    }

  },
  userAuthPost(url, data, cb, error) {
    if (this.ck_login()) {
      var uhttp = axios.create({
        baseURL: HOST + '/api/',
        timeout: 10000,
        headers: {
          'Authorization': 'Bearer ' + this.l_get("token")
        }
      });
      uhttp.post(url, data).then(res => {
        if (res.data.status_code <= -10000) {
          $toast.show("登录信息已过期")
          this.l_remove("token");
          this.ck_login()
        }
        cb(res)
      }).catch(err => {
        $loading.hide()
        //TODO 判断是否登录
        error(err)
      });
    } else {
      $toast.show("未登录")
      return
    }
  },
  ck_login() {
    let token = this.l_get("token");
    if (!token) {
      $loading.hide()
      //记录登录前地址
      this.set("login_back", window.location.href)
      let login_url = "http://lyf.aoyi66.com/home/wx/login_v2?back=" + encodeURIComponent("http://" + window.location.host + "/#/auth")
      window.location.href = login_url
      return false
    } else {
      return true
    }
  },
  //ssession
  get(name) {
    let value = sessionStorage.getItem(name)
    if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
    return value
  },
  set(name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return sessionStorage.setItem(name, value)
  },
  remove(name) {
    return sessionStorage.removeItem(name)
  },
  l_get(name) {
    let value = localStorage.getItem(name)
    if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
    return value
  },
  l_set(name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return localStorage.setItem(name, value)
  },
  l_remove(name) {
    return localStorage.removeItem(name)
  },
  //fanction
  fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return '<span class="major" >' + t.split("").reverse().join("") + "</span><span class='point'>.</span><span class='minor'>" + r + "</span>";
  },
  isCon(arr, val) { //检测数组是否存在某个值
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val)
        return true;
    }
    return false;
  },
  unique_arr(data) {
    data = data || [];
    var a = {};
    let len = data.length;
    for (var i = 0; i < len; i++) {
      var v = data[i];
      if (typeof(a[v]) == 'undefined') {
        a[v] = 1;
      }
    };
    data.length = 0;
    for (var i in a) {
      data[data.length] = i;
    }
    return data;
  }
}
