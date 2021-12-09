import React, { Component } from 'react';
import {Outlet} from "react-router-dom"

import { Header } from './components/header';
import { Footer } from './components/footer';
import {Col, Row} from "antd";

import adHOC from "./components/advert/adHOC";
import ImgAd from "./components/advert/imgAd";



const TopAd = adHOC(ImgAd,"indexTop")


export class Wrapper extends Component {
    render() {
        return (
            <div>
                <Row type="flex" className="header-adver" justify="center">
                    <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                        <TopAd></TopAd>
                    </Col>
                </Row>
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        );
    }
}
