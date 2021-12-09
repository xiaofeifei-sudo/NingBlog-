import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import _ from "lodash";
import {marked} from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import {useSelector, useDispatch} from "react-redux";

//导入ant组件
// 导入antdesign组件
import {
    Button,
    Row,
    Col,
    List,
    icon,
    Icon,
    BackTop,
    Tooltip,
    Spin,
    Avatar, Pagination
} from "antd";

//懒加载
import LazyLoad from "react-lazyload";

//api地址
import servicePath from "../config/api/apiUrl";

// 阿里字体图标库
import Iconfont from "../config/icon/alibaba";

//css样式
import "../styles/pages/index.less";

//导入组件
import {Author} from "../components/author";

import adHOC from "../components/advert/adHOC";
import CarouselAd from "../components/advert/carouselAd";


export const Home = (props) => {
    // state
    const [mylist, setMylist] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const renderer = new marked.Renderer();

    const IndexSlider = adHOC(CarouselAd, "indexCarousel");

    marked.setOptions({
        renderer,
        gfm: true, //启动类似Github样式的Markdown,填写true或者false
        pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
        tables: true, //支持Github形式的表格，必须打开gfm选项
        breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
        smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
        smartypants: true, //使用“智能”排版标点符号来表示引号和短划线。
        sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
        xhtml: false, //是否启动xhtml配置
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });


    // Effect
    useEffect(() => {
        // 返回顶部
        window.scrollTo(0, 0);
        //设置标题
        document.title = "首页 | NingBlog";
        // 监听页面是否关闭
        document.addEventListener("visibilitychange", visibilitychange,false);
        getList();

        return(()=>{
            document.removeEventListener("visibilitychange",visibilitychange,false)
        })
    }, []);


    const visibilitychange = ()=>{
        let isHidden = document.hidden;
        if (isHidden) {
            document.title = "404!!!页面丢失(￣▽￣)\"";
        } else {
            document.title = "haha，你回来了啊(ಥ _ ಥ)";
            setTimeout(() => {
                document.title = "首页 | NingBlog";
            }, 3000);
        }
    }

    const getList = async (page = "1", pageSize = "10") => {
        window.scrollTo(0,0)
        await React.$http({
            url: `${React.$http.adornUrl(servicePath.getList)}?${React.$http.adornParams({
                current: page,
                pageSize,
                sortby: "0"
            }, false)}`,
            method: "get"
        }).then(({data}) => {
            if (data.status == 200) {
                setIsLoading(false);
                setMylist(data.data.docs);
                setPageInfo(data.data.pageInfo);
            }
        });
    };




    return (
        <Fragment>
            {/* 返回小火箭 */}

            <Row>
                <Col lg={24} xl={24} md={24} sm={0} xs={0}>
                    <BackTop>
                        <div className="ant-back-top-inner">
                            <Iconfont type="icon-huojian" spin></Iconfont>
                        </div>
                    </BackTop>
                </Col>
            </Row>

            <Row>
                <Col lg={0} xl={0} md={0} sm={24} xs={24}>
                    <BackTop>
                        <div className="ant-back-top-inner-sm">
                            <Iconfont type="icon-huojian" spin></Iconfont>
                        </div>
                    </BackTop>
                </Col>
            </Row>

            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <Spin tip="加载中" spinning={isLoading}>
                        <div>
                            <List
                                header={
                                    <div className="list-header">
                                        最新日志<span className="list-header-count"> 32 </span>篇
                                    </div>
                                }
                                itemLayout="vertical"
                                dataSource={mylist}
                                renderItem={(item, index) => (
                                    <List.Item key={index} className={`cssnicehover list-item`}>
                                        <LazyLoad height={200} offset={-200}>
                                            <div className={window.screen.width >= 770 ? "cssnice1" : "cssnice"}>
                                                <div className="list-item-title">
                                                    <Link to={"/detail/" + item._id}>{item.title}</Link>
                                                </div>

                                                <div className="list-item-icon">
                      <span>
                        <Iconfont type="icon-rili"></Iconfont>
                          {item.updateDate}
                      </span>
                                                    <span>
                        <Iconfont type="icon-shujufenxi"></Iconfont>
                                                        {item.categories.map((item, index) => {
                                                            return (
                                                                // <Link href={item.defaultUrl}>
                                                                <Link to={item.defaultUrl}>{item.name}</Link>
                                                            );
                                                        })}
                      </span>
                                                    <span>
                        <Iconfont type="icon-huo"></Iconfont>
                                                        {item.clickNum}人
                      </span>
                                                </div>

                                                <Row>
                                                    <Col lg={18} xl={18} md={18} sm={24} xs={24}>
                                                        <div
                                                            className="list-item-context"
                                                            dangerouslySetInnerHTML={{
                                                                __html: marked(item.discription)
                                                            }}
                                                        ></div>
                                                    </Col>
                                                    <Col
                                                        className="list-item-photo"
                                                        lg={6}
                                                        xl={6}
                                                        md={6}
                                                        sm={24}
                                                        xs={24}
                                                    >

                                                        <img src={"http://127.0.0.1:8080" + item.sImg}></img>
                                                    </Col>
                                                </Row>
                                                <div className="list-item-icon">
                      <span>

                        <Avatar size="small" src={"http://127.0.0.1:8080" + item.author.logo}></Avatar>
                          {item.author.userName}
                      </span>
                                                    <span>
                        <Iconfont type="icon-xiai"></Iconfont>
                                                        {item.likeNum}
                      </span>
                                                    <span>
                        <Iconfont type="icon-buxihuan"></Iconfont>
                                                        {item.despiseNum}
                      </span>
                                                    <span>
                        <Iconfont type="icon-pinglunxiao"></Iconfont>
                                                        {item.commentNum}
                      </span>
                                                    <span>
                        <Iconfont type="icon-shoucang"></Iconfont>
                                                        {item.favoriteNum}
                      </span>
                                                </div>
                                            </div>
                                        </LazyLoad>
                                    </List.Item>
                                )}
                            />
                        </div>

                        {
                            _.isEmpty(mylist) ? null : (
                                <LazyLoad height={200} offset={-10}>
                                    <div className="list-footer">
                                        <Pagination showQuickJumper showSizeChanger showTitle={false} size="large" defaultCurrent={1}

                                                    pageSizeOptions={[5, 10, 20, 50]} hideOnSinglePage total={pageInfo.totalItems}
                                                    onChange={(page, pageSize) => {
                                                        getList(page, pageSize);
                                                    }} className="cssnice3 list-footer-pagination">

                                        </Pagination>
                                    </div>

                                </LazyLoad>
                            )
                        }
                    </Spin>
                </Col>


                <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <IndexSlider></IndexSlider>
                    <Author></Author>
                </Col>
            </Row>
        </Fragment>
    );
};
