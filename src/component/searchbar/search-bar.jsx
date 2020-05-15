import React, { Component } from "react"
import "./search-bar.css"
import { connect } from "react-redux"
import { setSearchFood, setFoodList, searchResult } from "../../store/action.js"
import { Input, message } from 'antd';
const { Search } = Input;
/**
 * @description:搜索框组件
 * @author: jyb
 * @param 
 */
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    /**
     * @description:警告信息提示
     * @author: jyb
     * @param msg:提示的信息内容
     */
    info = (msg) => {
        message.info(msg);
    };
    /**
     * @description:点击搜索的方法  根据搜索条件在数据库中查找满足条件的
     * @author: jyb
     * @param value:输入的搜索条件
     */
    search = (value) => {
        this.props.setSearchFood(value)
        const { foodList } = this.props
        if (value === "") {
            this.info("搜索内容不能为空")
        } else {
            var is = false;
            var newArr = []
            for (var i = 0; i < foodList.length; i++) {
                if (foodList[i].name === value) {
                    newArr.push(foodList[i]);
                    is = true
                }
                if (is === true) {
                    this.props.searchResult(newArr)
                } else {
                    this.info("您搜索的商品不再搜索范围")
                }
            }
            
        }
    }
    render() {
        return (
            <div>
                <header className="shop-header">
                    <h1 className="shop-title">食物搜索表</h1>
                    <Search placeholder="请输入商品名称" onSearch={(value) => this.search(value)} enterButton />
                </header>
            </div>
        )
    }
}
export default connect(
    state => {
        return {
            searchFood: state.searchFood,
            foodList: state.foodList,
            searchList: state.searchList
        }
    },
    {
        setSearchFood,
        setFoodList,
        searchResult
    }
)(SearchBar)