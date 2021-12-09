import React, {Component, Fragment} from "react";


import "../../styles/component/advert/advert.less";

import {Row, Col} from "antd";
import AdHoc from "./adHOC";


// 视频广告组件
class VideoAd extends Component {
    render() {
        return (
            <div>
                <video className="adver-video" autoPlay="autoPlay"
                       src={this.props.src} loop></video>
            </div>
        );
    }
};

VideoAd = AdHoc(VideoAd);

export default VideoAd;
