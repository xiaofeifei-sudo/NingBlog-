import React, {Fragment, useEffect, useState, createRef, useRef,Suspense} from "react";
import {Link} from "react-router-dom";
import {
    Row,
    Col,
    Breadcrumb,
    Affix,
    BackTop,
    Drawer,
    Input,
    Spin,
    Button,
    Card,
    message
} from "antd";


import adHOC from "../components/advert/adHOC";
import ImgAd from "../components/advert/imgAd";

import {useSelector, useDispatch} from "react-redux";


import _ from "lodash";
import "../styles/pages/detail.less";

import {useParams} from "react-router-dom";


import {Tocify} from "../components/tocify";


//markedown解析器
import {marked} from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/stackoverflow-light.css";

// api
import servicePath from "../config/api/apiUrl";

// alibaba Iconfont
import Iconfont from "../config/icon/alibaba";

const {TextArea} = Input;




const CommentEdit = React.lazy(()=>import("../components/comment/commentEdit"))
const Comment = React.lazy(()=>import("../components/comment/commentItem"))

export const Detail = (props) => {
    const renderer = new marked.Renderer();
    const tocify = new Tocify();

    // 获取params
    const {detail_id} = useParams();

    // 获取redux
    const userInfo = useSelector((state) => state.info);


    //图片广告
    const FirstImgAd = adHOC(ImgAd,"detailCarouse");
    const SecondImgAd = adHOC(ImgAd,"detailAd")

    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    //state
    const [articleListDrawer, setArticleListDrawer] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [commentPageInfo, setCommentPageInfo] = useState({});
    const [details, setDetails] = useState({});
    const [detailLoading, setDetailLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);

    // 开启文章列表
    const ArticleListClick = (e) => {
        e.stopPropagation();
        setArticleListDrawer(true);
    };


    // 整理返回的留言
    const sortMsg = () => {

    };

    useEffect(() => {
        getCommentList();
        getDetail();
    }, []);

    //   添加表情
    const AddEmoji = (e) => {
    };

    // 获取内容详情
    const getDetail = async () => {
        await React.$http({
            url: `${React.$http.adornUrl(servicePath.getArticleById)}${detail_id}`,
            method: "get"
        }).then(({data}) => {
            setDetailLoading(false);
            setDetails(data.data);
        });
    };

    //获取评论列表
    const getCommentList = async () => {
        await React.$http({
            url: `${React.$http.adornUrl(
                servicePath.getArticleCommentById
            )}?${React.$http.adornParams(
                {pageSize: 100, contentId: detail_id},
                true
            )}`,
            method: "get"
        }).then(({data}) => {
            if(data.status == 200){
                setCommentList(data.data.docs);
                setCommentPageInfo(data.data.pageInfo);
                setCommentLoading(false);
            }
        });
    };

    // 评论内容发生该表
    const CommentValueChange = (e) => {
    };


    //渲染二层子评论
    const RenderChildComment = (item) => {
        let resultArr = [];
        ChildComment(item, resultArr);
        return resultArr;
    };


    // 提交评论
    const CommitComment = async (data) => {
        await React.$http({
            url: `${React.$http.adornUrl(servicePath.postComment)}`,
            method: "post",
            data: React.$http.adornData(
                {
                    contentId: detail_id,
                    replayAuthor: "",
                    adminReplyAuthor: "",
                    relationMsgId: "",
                    content: data
                },
                false,
                "form"
            )
        }).then(({data}) => {
            if (data.status == 200) {
                setCommentLoading(true);
                getCommentList();
            }
        });
    };


    // 提交回复
    const replayCommit = async (content, data) => {
        await React.$http({
            url: `${React.$http.adornUrl(servicePath.postComment)}`,
            method: "post",
            data: React.$http.adornData({
                    contentId: detail_id,
                    replayAuthor: userInfo._id,
                    adminReplyAuthor: "",
                    relationMsgId: data._id,
                    content
                }, false,
                "form")
        }).then(({data}) => {
            if (data.status == 200) {
                setCommentLoading(true);
                getCommentList();
            }
        });
    };


    // 递归获取二级评论列表
    const ChildComment = (item, arr = []) => {
        // 获取当前评论的_id
        let parentId = item._id;
        // 过滤评论是否有子评论
        let childArr = commentList.filter(function (e) {
            return e.relationMsgId == parentId;
        });

        if (childArr.length > 0) {
            for (let childItem in childArr) {
                arr.push(childArr[childItem]);
                ChildComment(childArr[childItem], arr);
            }
        }
    };


    return (
        <Fragment>
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

            <Row>
                <Col lg={0} xl={0} md={0} sm={24} xs={24}>
                    <div onClick={ArticleListClick} className="detail-content-list">
                        <Iconfont type="icon-liebiao"></Iconfont>
                    </div>
                </Col>
            </Row>

            {/* <Drawer
        width="70%"
        title={<div>文章列表</div>}
        placement="right"
        closable={true}
        onClose={() => {
          setArticleListDrawer(articleListDrawer ? false : true);
        }}
        visible={articleListDrawer}
      >
        <div className="tocify">{tocify && tocify.render()}</div>
      </Drawer> */}


            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <Spin spinning={detailLoading}>
                        <div className="detail-container">
                            <div className="detail-bread">
                                <Breadcrumb
                                    separator={
                                        <span>
                      <Iconfont type="icon-V"></Iconfont>
                    </span>
                                    }
                                >
                                    <Breadcrumb.Item>
                                        <Link to="/">首页</Link>
                                    </Breadcrumb.Item>
                                    {_.isEmpty(details) ? null : (
                                        <Fragment>
                                            <Breadcrumb.Item>
                                                {details.categories[0].name}
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>{details.stitle}</Breadcrumb.Item>
                                        </Fragment>
                                    )}
                                </Breadcrumb>
                            </div>

                            {_.isEmpty(details) ? null : (
                                <div className="detail-main">
                                    <div className="detail-title">{details.title}</div>

                                    <div className="list-icon center">
                    <span>
                      <Iconfont type="icon-rili"></Iconfont>
                        {details.date}
                    </span>
                                        <span>
                      <Iconfont type="icon-shujufenxi"></Iconfont>
                                            {details.categories[0].name}
                    </span>
                                        <span>
                      <Iconfont type="icon-huo"></Iconfont> {details.clickNum}人
                    </span>
                                    </div>
                                    <div
                                        className="detail-content"
                                        dangerouslySetInnerHTML={{
                                            __html: marked(details.simpleComments[0].content)
                                        }}
                                    >
                                    </div>
                                </div>
                            )}
                        </div>

                        <Suspense fallback={<div>Loading</div>}>

                        <CommentEdit commit={(data) => {
                            CommitComment(data);
                        }}></CommentEdit>

                        <div className="messageContent">
                            <Card loading={commentLoading}>
                                <div className="comm-title">
                                    <span>| </span>
                                    <span>评论列表</span>
                                    <span> ( {commentPageInfo.totalItems} ) </span>
                                </div>
                                {
                                    commentList.length ?
                                        commentList.map((item, index) => {
                                            return _.isEmpty(item.relationMsgId) ? (
                                                    <Comment replayCommit={(content) => {
                                                        replayCommit(content, item);
                                                    }} key={item._id} commentData={item}>
                                                        {
                                                            RenderChildComment(item).map((ele) => {
                                                                return <Comment replayCommit={(content) => {
                                                                    replayCommit(content, ele);
                                                                }
                                                                } key={ele._id} commentData={ele}></Comment>;
                                                            })
                                                        }
                                                    </Comment>
                                                )
                                                : null;
                                        }) : null
                                }
                            </Card>
                        </div>
                        </Suspense>
                    </Spin>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Affix offsetTop={5}>
                        <div className="detail-nav comm-box">
                            <div className="detail-nav-title">文章目录</div>
                            <Card loading={detailLoading}>
                                <div className="toc-list">{tocify && tocify.render()}</div>
                            </Card>
                        </div>
                        <FirstImgAd></FirstImgAd>
                        <SecondImgAd></SecondImgAd>
                    </Affix>

                </Col>
            </Row>
        </Fragment>
    );
};
