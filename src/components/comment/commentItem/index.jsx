import React, {Component} from "react";

import {
    Comment as CommentAnt,
    Tooltip,
    Avatar,
    Modal,
    Button,
    Input
} from "antd";

import moment from "moment";

import {
    LikeFilled,
    LikeOutlined,
    DislikeFilled,
    DislikeOutlined
} from "@ant-design/icons";

import Emoji from "../../emoji";
import "../../../styles/component/comment/commentItem.less";

const {TextArea} = Input;

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: 0, //喜欢数量
            dislike: 0, //不喜欢数量
            action: null, //点赞状态
            reply: false, //显示回复悬浮框
            penName: "", //笔名
            replayContent: "", //回复内容
            data: {}, //评论详情,
            placeholder: "请输入您的留言..."
        };
        // replyEditDom
        this.replyEdit = React.createRef()
    }

    componentWillMount() {
        let data = this.props.commentData;
        this.setState({
            data: data,
            like: data.praise_num,
            dislike: data.despises_num
        });
    }

    like = () => {
        console.log("喜欢该评论点赞");
    };

    liked = () => {
        console.log("不喜欢该评论");
    };

    showReply = () => {
        this.setState({
            reply: true
        });
    };

    cancelReply = () => {
        this.setState({
            reply: false
        });
    };


    // 清空edit
    clearReplyEdit = () => {
        this.replyEdit.current.innerHTML = "";
    };



//   添加表情到留言框
    addEmoji = (data) => {
        this.replyEdit.current.innerHTML += "<img className=\"smilies\" src=\"" +
            data +
            "\"/>";
    };

    // 回复评论
    submitReplay = ()=>{
        this.props.replayCommit(this.replyEdit.current.innerHTML)
        this.clearReplyEdit()
        this.cancelReply()
    }

    render() {
        const {reply, penName, replayContent, dislike, like, action} = this.state;
        // 定义评论组件
        const actions = [
            <Tooltip title="喜欢">
        <span onClick={this.like}>
          {action == "liked" ? <LikeFilled/> : <LikeOutlined/>}
            <span className="comment-action">{like}</span>
        </span>
            </Tooltip>,
            <Tooltip title="不喜欢">
        <span onClick={dislike}>
          {action == "disliked" ? <DislikeFilled/> : <DislikeOutlined/>}
            <span className="comment-action">{dislike}</span>
        </span>
            </Tooltip>,
            <span key="comment-basic-reply-to" onClick={this.showReply}>
        回复
      </span>
        ];

        return (
            <div className="comm-box comment-item-container" style={{marginTop: "20px"}}>
                <CommentAnt
                    style={{margin: "1rem"}}
                    actions={actions}
                    content={<p className="comment-item-content" dangerouslySetInnerHTML={{
                        __html: this.state.data.content
                    }}></p>}
                    datetime={
                        <Tooltip title={moment(this.state.data.date).format("YYYY年MM月DD日 HH时mm分ss秒")}>
                            <span>{moment(this.state.data.date).fromNow()}</span>
                        </Tooltip>
                    }
                    avatar={
                        <Avatar
                            src={this.state.data.adminAuthor == null ? this.state.data.author.logo : this.state.data.adminAuthor.logo}
                            alt={this.state.data.adminAuthor == null ? this.state.data.author._id : this.state.data.adminAuthor._id}
                        />

                    }
                    author={this.state.data.adminAuthor == null ? <a>{this.state.data.author.userName}</a> :
                        <a>{this.state.data.adminAuthor.userName}</a>}
                >
                    {this.props.children}

                    <Modal
                        visible={reply}
                        title={<p>回复@ {this.state.data.adminAuthor == null ? <a>{this.state.data.author.userName}</a> :
                            <a>{this.state.data.adminAuthor.userName}</a>}</p>}
                        onCancel={this.cancelReply}
                        footer={[
                            <Button key="back" onClick={this.cancelReply}>
                                返回
                            </Button>,
                            <Button key="submit" type="primary" onClick={()=>{
                                this.submitReplay()
                            }}>
                                提交回复
                            </Button>
                        ]}
                    >

                        <div id="comments_edit"  rows={4} ref={this.replyEdit} contentEditable="true" suppressContentEditableWarning placeholder={this.state.placeholder} >

                        </div>

                        <div style={{position: "absolute", bottom: "-5px"}}>
                            <Emoji add={(data) => {
                                this.addEmoji(data);
                            }}></Emoji>
                        </div>
                    </Modal>
                </CommentAnt>
            </div>
        );
    }
}
