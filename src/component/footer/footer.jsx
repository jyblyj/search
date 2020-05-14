import React, { Component } from "react"
import { connect } from "react-redux"
import "./footer.css"
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { queryShopList, setFoodList, foodListCurrent } from "../../store/action.js"
/**
 * @description:分页组件，按照每页十个数据进行分布，渲染
 * @author: jyb
 * @param allPage:食物列表的总页数
 */
class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 总页数
            allPage: 0,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            let arr = [];
            // 每页商品的数量
            let num = 10;
            for (var a = 1; a <= Math.ceil(this.props.foodList.length / num); a++) {
                arr.push(a);
            }
            this.setState({
                allPage: arr,
            })
        }, 10);
    }
    /**
     * @description:提示信息方法
     * @author: jyb
     * @param:msg:要提示的信息
     */
    info = (msg) => {
        message.info(msg);
    };
    /**
     * @description:点击切换上一页
     * @author: jyb
     * @param:oldIndex当前页码，
     */
    prePage = () => {
        var oldIndex = Number(this.props.listCurrent);
        if (oldIndex <= 1) {
            this.info("已经是第一页了")
        } else {
            oldIndex -= 1;
            this.props.foodListCurrent(oldIndex);
        }
    }
    /**
     * @description:点击切换下一页
     * @author: jyb
     * @param:oldIndex当前页码，
     */
    nextPage = () => {
        var oldIndex = Number(this.props.listCurrent);
        if (oldIndex >= this.state.allPage.length) {
            this.info("这已经是最后一页了")
        } else {
            oldIndex += 1;
            console.log(oldIndex);
            this.props.foodListCurrent(oldIndex)
        }
    }
    /**
     * @description:点击页码跳到相应的页面
     * @author: jyb
     * @param:jumpNum要跳转的页码
     */
    jump = (e) => {
        var jumpNum = Number(e.target.value);
        this.props.foodListCurrent(jumpNum);
    }
    render() {
        const { allPage } = this.state;
        const { listCurrent } = this.props;
        return (
            <div>
                <footer className="Shop-footer">
                    <ul className="Shop-ul">
                        <li className="Shop-li-left"><Button onClick={() => { this.prePage() }} size="small"><CaretLeftOutlined /></Button></li>
                        {allPage && allPage.map((el, index) => {
                            return <li key={index} className="Shop-li-item">
                                <Button onClick={(e) => { this.jump(e) }} value={el} size="small" type={listCurrent === el ? `primary` : ``}>{el}</Button>
                            </li>
                        })}
                        <li className="Shop-li-right"><Button onClick={() => { this.nextPage() }} size="small"><CaretRightOutlined /></Button></li>
                    </ul>
                </footer>
            </div>
        )
    }
}
export default connect(
    state => {
        return {
            foodList: state.foodList,
            listCurrent: state.listCurrent
        }
    },
    {
        queryShopList,
        setFoodList,
        foodListCurrent
    }
)(Footer)