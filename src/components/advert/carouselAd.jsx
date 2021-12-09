import React, {Component, Fragment} from "react";


import "../../styles/component/advert/advert.less";

import {Carousel} from "antd"


// 轮播广告组件
class CarouselAd extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.type == "1" ? (
                        <Carousel dotPosition="right" autoplay>
                            {this.props.data.items.map((item)=>{
                                return <div  key={item._id}>
                                    <a href={item.link} target="_blank">
                                        <img src={"http://127.0.0.1:8080"+item.sImg} />
                                    </a>
                                </div>
                            })}
                        </Carousel>
                    ):null
                }
            </div>
        );
    }
};


export default CarouselAd;
