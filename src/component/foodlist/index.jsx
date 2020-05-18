import React, { Component } from "react"
import "./index.css"
import { EditOutlined } from '@ant-design/icons';
import { connect } from "react-redux"
import { queryShopList, setFoodList, setCurrentPage, setChangeData } from "../../store/action.js"
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
    changeNum = (e) => {
        const { changeTxt } = this.state
        let newObj = {
            name: changeTxt.name,
            count: e.target.value,
            id: changeTxt.id
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
    /**
     * @description:编辑弹框点击确认的方法，通过id去查找判断要修改的数据，点击确认把修改的数据重新渲染到页面上
     * @author: jyb
     * @param isShow:点击编辑的时候弹框显示的条件(布尔类型),changeTxt:点击某个商品的信息
     */
    confirm = () => {
        // 总的食物列表数据
        const { changeTxt } = this.state
        const { setChangeData } = this.props
        setChangeData(changeTxt)
        this.setState({
            isShow: false,
        })
    }
    render() {
        const { currentPage } = this.props;
        const { changeTxt, isShow } = this.state;
        return (
            <div>
                <main className="shop-main">
                    <table className="shop-table">
                        {currentPage && <thead>
                            <tr className="shop-title-tr">
                                <td>序号</td>
                                <td>食物名称</td>
                                <td>食物数量</td>
                                <td>编辑</td>
                            </tr>
                        </thead>}
                        <tbody>
                            {currentPage && currentPage.map((el, index) => (

                                <tr className="shop-shop-item" key={index}>
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
                {isShow && <div className="shop-shadow">
                    <div className="shop-change">
                        <h3>商品名称:{changeTxt.name}</h3>
                        <div className="shop-input">
                            <label htmlFor="num">数量</label>
                            <input type="number" id="num" value={changeTxt.count} onChange={this.changeNum} />
                        </div>
                        <div className="shop-btn">
                            <Button type="primary" onClick={this.cancle}>取消</Button>
                            <Button type="primary" onClick={this.confirm}>确定</Button>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}
export default connect(
    (state) => ({
        foodList: state.allList.foodList,
        currentPage: state.allList.currentPage,
    }),
    {
        queryShopList,
        setFoodList,
        setCurrentPage,
        setChangeData
    }
)(FoodList)