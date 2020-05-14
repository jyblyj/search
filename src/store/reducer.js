import { combineReducers } from "redux"
/**
 * @description:食物列表的搜索状态
 * @author: jyb
 * @param 
 */
let SET_FOOD_LIST = [];
function foodList(state = SET_FOOD_LIST, action) {
    switch (action.type) {
        case "SET_FOOD_LIST":
            return action.list
        default:
            return state;
    }
}
/**
 * @description:点击搜索按钮  初始值为""  通过传递过来的value(输入的查询条件)查找满足的所有数据
 * @author: jyb
 * @param 
 */
function searchFood(state = '', action) {
    switch (action.type) {
        case "SET_SEARCH_FOOD":
            return action.value;
        default:
            return state;
    }
}
/**
 * @description:页码的状态  初始值默认的当前页码为1  通过传递的当前页码去渲染该页的数据列表
 * @author: jyb
 * @param data:当前的页码
 */
function listCurrent(state = 1, action) {
    switch (action.type) {
        case "FOOD_LIST_CURRENT":
            return action.data;
        default:
            return state;
    }
}
/**
 * @description:搜索后的结果  作为数组的形式传递给组件
 * @author: jyb
 * @param list:查询的结果列表
 */
function searchList(state = [], action) {
    switch (action.type) {
        case "SEARCH_RESULT":
            return action.list;
        default:
            return state;
    }
}
let reducer = combineReducers({
    foodList,
    searchFood,
    listCurrent,
    searchList
})
export default reducer