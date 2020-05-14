import React, { Component } from "react"
import "./food-list.css"
import { EditOutlined } from '@ant-design/icons';
import { connect } from "react-redux"
import { queryShopList, setFoodList, searchResult, setSearchFood } from "../../store/action.js"
import { Button } from 'antd';
/**
 * @description:食物列表组件，渲染食物详细信息到页面
 * @author: jyb
 * @param isShow:点击编辑的时候弹框显示的条件(布尔类型),changeTxt:点击某个商品的信息
 */
class FoodList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,   //编辑弹框显示条件
            changeTxt: null, //获取点击的商品的信息
        }
    }
    componentDidMount() {
        this.props.queryShopList();
    }
    /**
     * @description:展示编辑弹框的方法
     * @author: jyb
     * @param el:点击的某个元素
     */
    showChange = (el) => {
        // console.log(el);
        this.setState({
            isShow: true,
            changeTxt: el
        })
    }
    /**
     * @description:编辑弹框中食物数量修改的方法
     * @author: jyb
     * @param newObj:修改后的数据，封装成一个对象，替换原来的数据
     */
    // 获取修改数量的方法
    changeNum = (e) => {
        console.log(this.state.changeTxt)
        let newObj = {
            name: this.state.changeTxt.name,
            count: e.target.value,
            id: this.state.changeTxt.id
        }
        this.setState({
            changeTxt: newObj
        })
    }

    /**
     * @description:编辑弹框点击取消的方法
     * @author: jyb
     * @param isShow:false 弹框隐藏
     */
    cancle = () => {
        this.setState({
            isShow: false
        })
    }
    // 确认修改方法
    /**
     * @description:编辑弹框点击确认的方法，通过id去查找判断要修改的数据，点击确认把修改的数据重新渲染到页面上
     * @author: jyb
     * @param isShow:点击编辑的时候弹框显示的条件(布尔类型),changeTxt:点击某个商品的信息
     */
    confirm = () => {
        // 总的食物列表数据
        let arr = this.props.foodList;
        // 通过查询条件  查取的满足该条件的数据集合
        let result = this.props.searchList;
        for (var a = 0; a < arr.length; a++) {
            if (this.state.changeTxt.id === arr[a].id) {
                arr[a] = this.state.changeTxt;
                this.props.setFoodList(arr);
            }
        }
        for (var i = 0; i < result.length; i++) {
            if (this.state.changeTxt.id === result[i].id) {
                result[i] = this.state.changeTxt;
                this.props.setSearchFood(result);
            }
        }
        this.setState({
            isShow: false,
        })
    }
    render() {
        const { foodList, listCurrent, searchList } = this.props;
        // 每页列表食物数量
        const a = 10;
        let allList = (!this.props.searchFood) ? foodList : searchList;
        const all = allList.slice((listCurrent - 1) * a, listCurrent * a);
        return (
            <div>
                <main className="Shop-main">
                    <table className="Shop-table">
                        <thead>
                            <tr className="Shop-title-tr">
                                <td>序号</td>
                                <td>食物名称</td>
                                <td>食物数量</td>
                                <td>编辑</td>
                            </tr>
                        </thead>
                        <tbody>
                            {all && all.map((el, index) => (
                                <tr className="Shop-shop-item" key={index}>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td style={{ color: '#EE7600' }}>{el.count}</td>
                                    <td><EditOutlined onClick={() => this.showChange(el)}
                                    /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
                {/* 编辑修改的弹框 */}
                {this.state.isShow && <div className="Shop-shadow">
                    <div className="Shop-change">
                        <h3>商品名称:{this.state.changeTxt.name}</h3>
                        <div className="Shop-input">
                            <label htmlFor="num">数量</label>
                            <input type="number" id="num" value={this.state.changeTxt.count} onChange={(e) => this.changeNum(e)} />
                        </div>
                        <div className="Shop-btn">
                            <Button type="primary" onClick={() => this.cancle()}>取消</Button>
                            <Button type="primary" onClick={() => this.confirm()}>确定</Button>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}
export default connect(
    state => {
        return {
            foodList: state.foodList,
            listCurrent: state.listCurrent,
            searchList: state.searchList,
            searchFood: state.searchFood,
        }
    },
    {
        queryShopList,
        setFoodList,
        searchResult,
        setSearchFood
    }
)(FoodList)