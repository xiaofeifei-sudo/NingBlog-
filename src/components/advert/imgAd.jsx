import React, {Component, Fragment} from "react";


import "../../styles/component/advert/advert.less";


// 图片广告组件
class ImgAd extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.type == "1" ? (<div>
                        {this.props.data.items.map((item) => {
                            return <div key={item._id}>
                                <a href={item.link} target="_blank">
                                    <img src={"http://127.0.0.1:8080" + item.sImg}/>
                                </a>
                            </div>;
                        })}
                    </div>) : null
                }
            </div>
        );
    }
};


export default ImgAd;
