import { Message } from 'element-ui'
import { INFOMSG, SETOUTFIT, CREATED, LOADING} from './types'
import { setSession } from '../util/session'


// import state from './state'
export default {
    [INFOMSG](state, data) {//处理数据变化
        Message({
            message: data.message,
            type: data.type,
            showClose: true
        })
    },
    [SETOUTFIT](state, data) {//处理数据变化
        try {
            setSession('outfit', JSON.stringify(data))
            state.outfit = JSON.stringify(data)
        } catch (error) {

        }
    },
    [CREATED](state, data) {//处理数据变化
        let originData = JSON.stringify(data);
        setSession('created', originData)
        state.created = originData
    }

}