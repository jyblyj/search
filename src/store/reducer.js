
import { combineReducers } from "redux"
/**
 * @description:数据的初始值集合
 * @author: jyb
 * @param 
 */
let initialData = {
    foodList: [],   //列表总数据
    currentPage: [],   //当前页数据
    page: 1,    //当前页码
    pageNum: 1,     //总页数
    pageSize: 10,    //每页数据个数
    searchFood: "",   //搜索条件
    searchList: [],   //搜索结果数据
}
function allList(state = initialData, action) {
    switch (action.type) {
        case "SET_FOOD_LIST": {
            return {
                ...state,
                foodList: action.list,
                pageNum: action.num,
                currentPage: action.data,
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.list,
                page: action.page
            }
        }
        case "SET_CHANGE_DATA": {
            return {
                ...state,
                currentPage: action.arr
            }
        }
        case "SET_SEARCH_LIST": {
            return {
                ...state,
                searchFood: action.searchValue,
                searchList: action.searchArr
            }
        }
        default:
            return state;
    }
}
let reducer = combineReducers({
    allList,
})
export default reducer
