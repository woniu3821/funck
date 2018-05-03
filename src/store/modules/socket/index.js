import { Loading, Message, MessageBox, Notification } from "element-ui";
import localStorage from "../../../util/localstorage";
const state = {
  connect: "",
  info: "",
  oMission: {}
};
const getters = {
  showDot: (state, getters, rootState) => {
    if (typeof state.oMission == "object") {
      return state.oMission;
    }
  }
};
const mutations = {
  reduce_work(state) {
    state.oMission.work--;
  },
  reduce_wait(state) {
    state.oMission.wait--;
    state.oMission.work++;
  },
  SOCKET_LOGIN(state, value) {
    state.oMission = value[0];
  },
  SOCKET_WELCOME(state, value) {
    Message({ message: `欢迎 ${value} 同事加入！` });
  },
  SOCKET_MISSION_MESSAGE(state, value) {
    Notification({
      message: "您有新的任务待接收,请及时处理！",
      type: "success",
      title: "新任务通知"
    });
    state.wait++;
  },
  SOCKET_CHANGE_MESSAGE() {
    Notification({
      message: "您有任务已修改或取消,请及时处理！",
      type: "warning",
      title: "任务修改通知"
    });
  },
  SOCKET_CONNECT(state) {},
  SOCKET_DISCONNECT(state, value) {
    Notification({
      message: "连接已经中断！",
      type: "warning",
      title: "系统警告"
    });
    state.connect = false;
  },
  SOCKET_CONNECT_ERROE(state, value) {
    Notification({
      message: "连接错误!",
      type: "error",
      title: "系统警告"
    });
  },
  SOCKET_CONNECT_TIMEOUT(state, value) {
    Notification({
      message: "连接超时！",
      type: "error",
      title: "系统警告"
    });
  },
  SOCKET_RECONNECT(state, value) {
    Notification({
      message: "系统已经重新连接！",
      type: "success",
      title: "系统通知"
    });
  }
};
const actions = {
  socket_connect({ commit, state }) {},
  socket_changeMessage({ commit, state }) {},
  socket_login({ commit, state }, data) {}
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
