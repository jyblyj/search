import axios from "axios"
/**
 * @description:食物列表总数据对应的action
 * @author: jyb
 * @param list:通过queryShopList方法获取的总数据传递过来
 */
function setFoodList(list) {
    return {
        type: "SET_FOOD_LIST",
        list
    }
}
/**
 * @description:食获取本地文件的所有数据，作为总的数据传递给setFoodList
 * @author: jyb
 * @param 
 */
function queryShopList() {
    return dispatch => {
        let p = axios.get("/shoplist/shop-list.json")
        p.then(res => {
            dispatch(setFoodList(res.data.list))
        })
    }
}
/**
 * @description:当前的页码数 
 * @author: jyb
 * @param:data:作为参数把获取的当前的页码传递给对应的reducer
 */
function foodListCurrent(data) {
    return {
        type: "FOOD_LIST_CURRENT",
        data,
    }
}
/**
 * @description:获取输入框里输入的查询条件
 * @author: jyb
 * @param:value:查询的条件
 */
function setSearchFood(value) {
    return {
        type: "SET_SEARCH_FOOD",
        value
    }
}
/**
 * @description:点击搜索获取的搜索数据
 * @author: jyb
 * @param:list:搜索之后的数据列表集合
 */
function searchResult(list) {
    return {
        type: "SEARCH_RESULT",
        list
    }
}
export {
    queryShopList,
    setSearchFood,
    setFoodList,
    foodListCurrent,
    searchResult
}
