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
    return (dispatch, getState) => {
        let all = axios.get("/shoplist/shop-list.json")
        all.then(res => {
            const pageSize = getState().allList.pageSize;
            const page = getState().allList.page;
            dispatch({
                type: 'SET_FOOD_LIST',
                list: res.data.list,
                num: Math.ceil(res.data.list.length / pageSize),
                data: res.data.list.slice((page - 1) * pageSize, page * pageSize),
            })
        })
    }
}
/**
 * @description:获取当前页的数据信息状态
 * @author: jyb
 * @param page：当前页数；list:当前页的数据列表
 */

function setCurrentPage(page, list) {
    return (dispatch, getState) => {
        const pageSize = getState().allList.pageSize;
        dispatch({
            type: "SET_CURRENT_PAGE",
            page,
            list: list.slice((page - 1) * pageSize, page * pageSize),
        })
    }
}
/**
 * @description:编辑修改   把修改后的传递过来  去替换当前页中的某一条数据
 * @author: jyb
 * @param changeTxt:修改的数据;arr:当前页的数据
 */
function setChangeData(changeTxt) {
    return (dispatch, getState) => {
        const arr = getState().allList.currentPage;
        arr.some((value, index) => {
            if (value.id === changeTxt.id) {
                arr[index] = changeTxt
                return true
            }
            return false
        })
        dispatch({
            type: "SET_CHANGE_DATA",
            arr
        })
    }
}
/**
 * @description:食物搜索
 * @author: jyb
 * @param searchValue:搜索的条件
 */
function setSearchList(searchValue) {
    return (dispatch, getState) => {
        const searchArr = []
        const foodList = getState().allList.foodList;
        foodList.forEach((value, index) => {
            if (value.name === searchValue) {
                searchArr.push(foodList[index])
            }
        })
        dispatch({
            type: "SET_SEARCH_LIST",
            searchValue,
            searchArr
        })
    }
}
export {
    queryShopList,
    setFoodList,
    setCurrentPage,
    setChangeData,
    setSearchList

}
