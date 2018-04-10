import Vue from 'vue'
export const creatChild = (data, ispath, _this) => {
    for (let { child } of data) {
        if (child && child.length) {
            creatChild(child, ispath, _this)
        }
        for (let { path } of child) {
            if (path == ispath) {
                _this.childData = child;
                return;
            }
        }
    }
}
export const hasPermission = {
    install(Vue, options) {
        Vue.directive('hasPermission', {
            bind(el, binding, vnode) {
                let permissionList = vnode.context.$route.meta.permission
                if (permissionList && permissionList.length && permissionList.includes(binding.value)) {
                    el.parentNode.removeChild(el)
                }
            }
        })
    }
}

export const bus = new Vue()
export const timeParse = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + "/";
    let M =(date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1): date.getMonth() + 1) + "/";
    let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    let h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())+":";
    let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
    // s = date.getSeconds();
    return Y + M + D + h + m;
}