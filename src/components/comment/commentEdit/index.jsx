import React, {useState, createRef, Component} from "react";

import _ from "lodash";

import {Input, Row, Col, Alert, notification, Button} from "antd";
import {Link} from "react-router-dom";
import Emoji from "../../emoji";


import "../../../styles/component/comment/commentEdit.less";
import {
    EditOutlined
} from "@ant-design/icons";
const {TextArea} = Input;





export default class CommentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentValue: "",
            placeHolder: "随便吐槽些什么吧...."
        };
        this.commentEdit = createRef();
        this.userInfo = "";
    }

    AddEmoji = (data) => {
        this.commentEdit.current.innerHTML +=
            "<img className=\"smilies\" src=\"" +
            data +
            "\"/>";
    };

    ClearCommentEdit = () => {
        this.commentEdit.current.innerHTML = "";
    };

    // 检测字符
    CheckCommentValue = (e) => {
        let emojiNum = 0;
        let regExp = e.target.innerHTML.match(
            /<img classname="smilies" style="width:2rem,animation: shake 5s infinite ease-in-out" src=/g
        );
        if (regExp) {
            emojiNum += regExp.length;
        }
        // 判断字符串是否大于150个
        let charNum = e.target.innerText.length;

        if (charNum + emojiNum > 150) {
            notification.error({
                message: "评论内容字数超限提示",
                description:
                    "评论内容字符已经超出150字限制,会导致无法提交!",
                duration: 2.5,
                placement: "bottomRight"
            });
        }
    };

    //提交评论
    CommitComment = ()=>{
        this.props.commit(this.commentEdit.current.innerHTML);
        this.ClearCommentEdit()
    }

    render() {
        return (
            <div className="comm-box">
                <Row>
                    <Col lg={24} xl={24} md={24} sm={0} xs={0}>
                        <div style={{margin: "10px"}}>
                            <div
                                suppressContentEditableWarning
                                onKeyUp={() => {
                                }}
                                ref={this.commentEdit}
                                id="comments_edit"
                                placeholder={this.state.placeHolder}
                                contentEditable="true"
                                onFocus={() => {

                                    console.log("聚焦了");
                                }}
                                onBlur={() => {
                                    console.log("取消聚焦");
                                }}
                                onKeyUp={(e) => {
                                    this.CheckCommentValue(e);
                                }}
                            ></div>
                        </div>
                    </Col>
                </Row>
                <Row type="flex" justify="left" className="comment-func-box">
                    <Col lg={6} xl={6} md={6} sm={0} xs={0}>
                        <div className="comment-emoji">
                            <Emoji
                                add={(data) => {
                                    this.AddEmoji(data);
                                }}
                            ></Emoji>
                        </div>
                        {
                            _.isEmpty(this.userInfo) ? (<div className="comment-judge-sign">
                                <span><Link to="/sign">登录 </Link></span>
                                <span>参与评论</span>
                            </div>) : null
                        }
                    </Col>
                    <Col offset={9} lg={9} xl={9} md={9} sm={9} xs={9}>
                        <Button
                            style={{float: "right", margin: "1rem 1rem", display: "block"}}
                            type="primary"
                            icon={<EditOutlined/>}
                            className="meme_btn"
                        >
                            提交评论<span onClick={()=>{
                                this.CommitComment()
                        }} className="meme_btnright" style={{paddingLeft: ".5rem"}}>✪ω✪</span>
                        </Button>
                        <Button onClick={()=>{
                            this.ClearCommentEdit()
                        }}
                                style={{float: "right", margin: "1rem auto", display: "block"}} type="primary"
                                className="meme_btn">
                            清空
                        </Button>
                    </Col>
                </Row>
            </div>
        );

    }


}
