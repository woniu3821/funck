import Vue from 'vue'
export const creatChild = (data, ispath, _this) => {
    for (let { child } of data) {
        if (child && child.length) {
            creatChild(child, ispath,_this)
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

export const bus=new Vue()