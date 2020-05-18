import React, { Component } from "react"
import "./index.css"
import { connect } from "react-redux"
import { setFoodList, setSearchList, setCurrentPage } from "../../store/action.js"
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
     * @description:将搜索后的数据作为参数，调用当前页的方法  把搜索结果渲染到页面上
     * @author: jyb
     * @param searchList:搜索结果列表集合
     */
    componentDidUpdate(prevProps) {
        if (this.props.searchFood !== prevProps.searchFood) {
            const { searchList, setCurrentPage } = this.props;
            const page = 1;
            if (searchList.length === 0) {
                this.info("你输入的商品不再搜索范围内");
            } else {
                setCurrentPage(page, searchList);
            }
        }
    }
    /**
     * @description:点击搜索的方法  根据搜索条件在数据库中查找满足条件的
     * @author: jyb
     * @param value:输入的搜索条件
     */
    search = (value) => {
        const { setSearchList } = this.props
        if (value === "") {
            this.info("搜索内容不能为空");
        } else {
            setSearchList(value);
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
            searchList: state.allList.searchList,
            page: state.allList.page,
            searchFood: state.allList.searchFood,
        }
    },
    {
        setFoodList,
        setSearchList,
        setCurrentPage
    }
)(SearchBar)