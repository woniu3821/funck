import { getSession } from '../util/session'
const state={
    outfit: getSession('outfit'),
    created: getSession('created')
}
export default state;