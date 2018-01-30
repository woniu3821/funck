import Cookies from 'js-cookie'
const getters={
    getOutfit(state){
        try {//如果手动清除outfit则触发重新登录
            let outfitdata = JSON.parse(state.outfit);
            if (outfitdata.length){
                return outfitdata;
            }
        } catch (error) {
            Cookies.remove('token')
            Cookies.remove('uid')
        }
    },
    getCreated(state){
        try {
            let jsonstr = state.created;
            let parseData = JSON.parse(jsonstr);
            let rootArr = parseData.created
            
            for (let item of rootArr){
                for(let key in item){
                    switch (key) {
                        case "timebegain":
                            item[key]= formatDate(new Date(item[key] * 1000))
                            break;
                        case "timeend":
                            item[key]= formatDate(new Date(item[key] * 1000))
                            break;
                        default:
                            break;
                    }
                }
            }
            return rootArr;
        } catch (error) {
            console.log(error)
        }
    }
}
function formatDate(now) {
    　　var year = now.getFullYear(),
          month = zero(now.getMonth() + 1),
          date = zero(now.getDate()),
          hour = zero(now.getHours()),
          minute = zero(now.getMinutes())

    　　return year + "/" + month + "/" + date + " " + hour + ":" + minute
}
function zero(key) {
    if (key < 10) {
        return key = '0' + key;
    } else {
        return key;
    }
}
export default getters;