import React from 'react';
import './App.css';
import { connect } from "react-redux"
import FoodList from "./component/foodlist/index.jsx"
import SearchBar from "./component/searchbar/index.jsx"
import Footer from "./component/footer/index.jsx"
/**
 * @description:页面的父组件
 * @author: jyb
 * @param
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="App">
                {/* 搜索框组件 */}
                <SearchBar></SearchBar>
                {/* 食物列表组件 */}
                <FoodList></FoodList>
                {/* 分页组件 */}
                <Footer></Footer>
            </div>
        )
    }
}
export default connect(state => {
    return {

    }
}, dispatch => {
    return {

    }
})(App);
