import axios from "../../../util/ajax";
import Cookies from "js-cookie";
import { Loading, Message } from "element-ui";
const state = {
  // uid
  uid: "",
  // 用户名
  name: "",
  // token
  token: "",
  // 角色分组
  role: ""
  // 头像
  // avatar: ''
};

const getters = {};

const mutations = {
  setUID: (state, data) => {
    if (data) {
      Cookies.set("uid", data);
    } else {
      Cookies.remove("uid");
    }
    state.uid = data;
  },
  setToken: (state, data) => {
    if (data) {
      Cookies.set("token", data);
    } else {
      Cookies.remove("token");
    }
    state.token = data;
  },
  setRole: (state, data) => {
    state.role = data;
  }
};

const actions = {
  loginSys({ commit, rootState }, userInfo) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/login",
        method: "post",
        data: {
          ...userInfo
        }
      })
        .then(res => {
          const data = res.data;
          if (data.login) {
            commit("setUID", data.uid);
            commit("setToken", data.token);
            // Cookies.set('lang', rootState.lang)
          }
          resolve(res);
        })
        .catch(err => {
          reject(err.data.message);
          this.$error({
            title: `${err.data.status}错误`,
            message: err.data.message
          });
        });
    });
  },
  // 登出
  logout({ commit }) {
    return new Promise(resolve => {
      commit("setUID", "");
      commit("setToken", "");
      resolve();
    });
  },
  // 重新登录
  relogin({ commit }) {
    return new Promise(resolve => {
      commit("setUID", Cookies.get("uid"));
      commit("setToken", Cookies.get("token"));
      resolve();
    });
  },
  getCaptcha({ commit }, value) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/captcha",
        method: "post",
        data: {
          value,
          uid: state.uid
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getName({ commit }, value) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/checkname",
        method: "post",
        data: {
          value
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addAcount({ commit }, buildInfo) {
    let loadingInstance = Loading.service({
      lock: true,
      text: "注册中，请稍后..."
    });
    return new Promise((resolve, reject) => {
      axios({
        url: "/register",
        method: "post",
        data: {
          ...buildInfo
        }
      })
        .then(res => {
          res.data.success && loadingInstance.close();
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getGroup({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/getgroup"
        // method: 'get',
      })
        .then(res => {
          res.status == 200 && resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  setGroup({ commit }, name, buildInfo) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/setgroup",
        method: "post",
        data: {
          name,
          uid: state.uid,
          ...buildInfo
        }
      })
        .then(res => {
          // console.log(res.data)
          res.status == 200 && resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getGroupTree({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/getgrouptree"
        // method: 'get',
      })
        .then(res => {
          res.status == 200 && resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  setMyInfo({ commit, state }, infodata) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/user/setmyinfo",
        method: "post",
        data: {
          uid: state.uid,
          ...infodata
        }
      })
        .then(res => {
          res.status == 200 && resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  findOldPass({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/findpass",
        method: "post",
        timeout: 1000 * 20,
        data: { ...data }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(() => {
          Message({ message: "找回密码发生错误", type: "error" });
        });
    });
  },
  // 记录操作日志
  actionlog({ state }, to) {
    axios({
      url: "/actionlog",
      method: "post",
      data: {
        uid: state.uid,
        path: to.path
      }
    }).catch(() => {
      Message({
        message: "保存操作记录失败",
        type: "error"
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
