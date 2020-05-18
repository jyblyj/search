import React, { Component } from "react"
import { connect } from "react-redux"
import "./index.css"
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { queryShopList, setFoodList, setCurrentPage } from "../../store/action.js"
/**
 * @description:分页组件，按照每页十个数据进行分布，渲染
 * @author: jyb
 * @param allPage:食物列表的总页数
 */
class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
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
        const { page, foodList } = this.props
        let oldIndex = Number(page);
        if (oldIndex <= 1) {
            this.info("已经是第一页了")
        } else {
            oldIndex -= 1;
            this.props.setCurrentPage(oldIndex, foodList);
        }
    }
    /**
     * @description:点击切换下一页
     * @author: jyb
     * @param:oldIndex当前页码，
     */
    nextPage = () => {
        const { page, pageNum, foodList, setCurrentPage } = this.props
        let oldIndex = Number(page);
        if (oldIndex >= pageNum) {
            this.info("这已经是最后一页了")
        } else {
            oldIndex += 1;
            setCurrentPage(oldIndex, foodList)
        }
    }
    /**
     * @description:点击页码跳到相应的页面
     * @author: jyb
     * @param:jumpNum要跳转的页码
     */
    jump = (e) => {
        const { foodList, setCurrentPage } = this.props
        let jumpNum = Number(e.target.value);
        setCurrentPage(jumpNum, foodList);
    }
    render() {
        const { pageNum, page } = this.props;
        let pageArr = [];
        // 将总页数转化为数组
        for (let i = 1; i <= pageNum; i++) {
            pageArr.push(i)
        }
        return (
            <div>
                <footer className="shop-footer">
                    <ul className="shop-ul">
                        <li className="shop-li-left"><Button onClick={this.prePage} size="small"><CaretLeftOutlined /></Button></li>
                        {pageArr && pageArr.map((el, index) => {
                            return <li key={index} className="shop-li-item">
                                <Button onClick={(e) => this.jump(e)} value={el} size="small" type={page === el ? `primary` : ``}>{el}</Button>
                            </li>
                        })}
                        <li className="shop-li-right"><Button onClick={this.nextPage} size="small"><CaretRightOutlined /></Button></li>
                    </ul>
                </footer>
            </div>
        )
    }
}
export default connect(
    state => {
        return {
            pageNum: state.allList.pageNum,
            page: state.allList.page,
            foodList: state.allList.foodList,
        }
    },
    {
        queryShopList,
        setFoodList,
        setCurrentPage
    }
)(Footer)