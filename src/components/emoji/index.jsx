import React, { Component } from "react";
import "../../styles/component/emoji/emoji.less"
import { message } from "antd";


class Emoji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopen: false,
    };
  }
  isShowEmoji() {
    this.setState({
      isopen: !this.state.isopen,
    });
  }




  // 获取表情
  getEmoji() {
    let tools = [];
    for (let i = 1; i < 10; i++) {
      tools.push(
        <div
          key={i}
          onClick={() => {
            this.props.add(
              "https://mbdp03.bdstatic.com/sdks/emoticon/img/face_0" + i + ".png"
            );
            this.setState({ isopen: false });
          }}
          className="shakeimg"
        >
          <img
            src={"https://mbdp03.bdstatic.com/sdks/emoticon/img/face_0" + i + ".png"}
            alt=""
            style={
              window.screen.width >= 770
                ? { width: "2.3rem" }
                : { width: "1.8rem" }
            }
          />
        </div>
      );
    }
    for (let i = 10; i < 71; i++) {
      tools.push(
        <div
          key={"100" + i}
          onClick={() => {
            this.props.add(
              "https://mbdp03.bdstatic.com/sdks/emoticon/img/face_" + i + ".png"
            );
            this.setState({ isopen: false });
          }}
          className="shakeimg"
          style={{
            backgroundColor: "#f7f7f7",
            padding: "5px 10px",
            borderRadius: "5px",
            display: "inline-block",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          <img
            src={"https://mbdp03.bdstatic.com/sdks/emoticon/img/face_" + i + ".png"}
            alt=""
            style={
              window.screen.width >= 770
                ? { width: "2.3rem" }
                : { width: "1.8rem" }
            }
          />
        </div>
      );
    }
    return tools;
  }
  render() {
    return (
      <div className="emoji-container">
        <div
          style={
            this.state.isopen
              ? {
                border: "1px solid #8A2BE2",
                borderRadius: "1rem",
                color: "#888",
                height: "2rem",
                width: "4rem",
                textAlign: "center",
                margin: "1rem auto",
                lineHeight: "1.7rem",
                cursor: "pointer",
              }
              : {
                borderRadius: "1rem",
                border: "1px solid #8A2BE2",
                color: "#888",
                height: "2rem",
                width: "4rem",
                textAlign: "center",
                margin: "1rem auto",
                lineHeight: "1.7rem",
                cursor: "pointer",
              }
          }
          className="meme_btn meme_color"
          onClick={() => {
            this.isShowEmoji();
          }}
        >
          <span
            className="meme_btnin"
            style={
              this.state.isopen
                ? { color: "#8A2BE2", fontSize: "1.1rem" }
                : { fontSize: "1.1rem" }
            }
          >
            O^O
          </span>
        </div>
        {this.state.isopen ? (
          <div
            className="emoji-content"
          >
            {this.getEmoji()}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Emoji
