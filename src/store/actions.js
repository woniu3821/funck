import axios from "../util/ajax"
import State from './modules/user'
import * as types from './types'
import Cookies from 'js-cookie'
import { Loading } from 'element-ui'
const actions = {
    buildSubmit({ commit, rootState }, buildInfo) {//新建任务表单提交
        var uid = State.state.uid;
        return new Promise((resolve, reject) => {
            axios({
                url: '/user/build',
                method: 'post',
                data: {
                    ...buildInfo,
                    uid
                }
            }).then((res) => {
                commit(types.INFOMSG, res.data)
                resolve(res.data);
                actions.getCreated({ commit })//当创建新任务时触发请求新的已建任务数据
            }).catch(err => {
                reject(err)
            })
        })
    },
    getOutfit({ commit, state }) {//获取用户列表数据
        let uid = State.state.uid;
        axios({
            url: '/user/outfit',
            method: 'post',
            data: {
                uid
            }
        }).then((res) => {
            res.status == 200 && commit(types.SETOUTFIT, res.data.outfit)//提交存储用户列表数据操作
        }).catch((err) => {
            console.log(err)
        })
    },
    setFrameworke({ commit, state }, uid) {
        return new Promise((resolve, reject) => {
            axios({
                url: '/user/getframelist',
                method: 'post',
                data: {
                    uid
                }
            }).then((res) => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    },
    setAuthority({ commit, state }, options) {
        return new Promise((resolve, reject) => {
            axios({
                url: '/user/setauthority',
                method: 'post',
                data: {
                    ...options
                }
            }).then((res) => {
                if (res.status == 200) {
                    commit(types.INFOMSG, res.data)
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    },
    getCreated({ commit }) {//获取已建任务列表数据
        let uid = State.state.uid;
        axios({
            url: '/user/created',
            method: 'post',
            data: {
                uid
            }
        }).then((res) => {
            commit(types.CREATED, res.data)//提交存储用户列表数据操作
        }).catch((err) => {
            console.log(err)
        })
    },
    toUpdateMission({ commit }, id) {//修改任务
        let uid = State.state.uid;
        let loadingInstance = Loading.service({
            lock: true,
            text: '拉取数据中,请稍后...',
        })
        return new Promise((resolve, reject) => {
            axios({
                url: '/user/upmission',
                method: 'post',
                data: {
                    id,
                    uid
                }
            }).then((res) => {
                res.data.success && loadingInstance.close();
                resolve(res.data)
            }).catch((err) => {
                reject(err)
                console.log(err)
            })
        })
    },
    getWating({ commit }, id) {//获取未接受任务
        let uid = State.state.uid;
        return new Promise((resolve, reject) => {
            axios({
                url: '/getwating',
                method: 'post',
                data: {
                    uid,
                    id
                }
            }).then((res) => {
                if (res.status == 200) {
                    commit(types.INFOMSG, res.data)
                    resolve(res.data)
                } else {
                    reject(err)
                }
            }).catch((err) => {
                reject(err)
                console.log(err)
            })
        })
    },
    getWorking({ commit }, id) {//获取未接受任务
        let uid = State.state.uid;
        return new Promise((resolve, reject) => {
            axios({
                url: '/getworking',
                method: 'post',
                data: {
                    uid,
                    id
                }
            }).then((res) => {
                if (res.status == 200) {
                    commit(types.INFOMSG, res.data)
                    resolve(res.data)
                } else {
                    reject(err)
                }
            }).catch((err) => {
                reject(err)
                console.log(err)
            })
        })
    },




}

export default actions;