import axios from 'axios'
import store from './store'

let http = axios.create({
  baseURL: process.env.BASE_URL_API || 'http://127.0.0.1:8000/api'
})

http.interceptors.request.use(request => {
  store.commit("set", ["isLoading", true]);
  if (store.state.token != null)
    request.headers.Authorization = "Bearer " + store.state.token;
  return request;
}, error => {
  store.commit("set", ["isLoading", false]);
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  store.commit("set", ["isLoading", false]);
  if (process.env.NODE_ENV == 'development') {
    console.log("request", response.config)
    console.log("response", response.data)
  }
  return response.data.result;
}, function (error) {
  store.commit("set", ["isLoading", false]);
  if (error.response) {

    if (process.env.NODE_ENV == 'development') {
      console.log("request", error.response.config)
      console.log("response", error.response.data)
    }

    if (error.response.status == 403) {
      window.location.href = "/";
    }


    return Promise.reject(error.response.data);
  } else {
    return Promise.reject(error);
  }

});


const api = {
  get: function (path, params) {
    let config = {
      params: params
    }
    return http.get(path, config);
  },
  post: http.post
}

export default api;
