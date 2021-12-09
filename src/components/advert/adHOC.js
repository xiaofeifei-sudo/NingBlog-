import React, {Component} from "react";
import _ from "lodash"
import servicePath from "../../config/api/apiUrl";

import {Spin} from "antd";

//定义Ad高阶组件
export default (WrapedComponent,adName) => {
    return class adComponet extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loding: true,
                data: {},
                isShow: true,
                tip: "广告加载中..."
            };
            this.closeAd = this.closeAd.bind(this);
        }
        componentDidMount() {
            if (!_.isEmpty(adName)){
                React.$http({
                    url: `${React.$http.adornUrl(
                        servicePath.getOneAds
                    )}?${React.$http.adornParams({
                        name:adName
                    })}`,
                    method: "get"
                }).then(({data})=>{
                    if (data.status===200 && !_.isEmpty(data.data)){
                        this.setState({
                            loading: false,
                            data:data.data
                        })
                    }else {
                        this.setState({
                            isShow:false
                        })
                    }
                })
            }
        }

        closeAd() {
            this.setState({
                isShow: false
            })
        }

        render() {
            return (
                this.state.isShow ? (
                    <Spin spinning={this.state.loading}>
                        <div id="adver-container-dp" className="advert-container comm-box">
                        <div id="adver-dp" className="adver-dp">
                            <a href="https://h5.ipinyou.com/" target="_blank" rel="noopener noreferrer"
                               className="adver-logo">
                            </a>
                            <a onClick={this.closeAd} className="adver-logo-close-btn">
                                <img className="adver-logo-close-img" alt="加载失败"
                                     src={require("../../assets/images/adv-close.png").default}></img>
                            </a>
                            <div className="advert-content">
                                <WrapedComponent data={this.state.data}></WrapedComponent>
                            </div>
                            <div>
                                {this.props.username}
                            </div>
                        </div>
                    </div>
                    </Spin>
                ):null
            );
        }

    };

}
