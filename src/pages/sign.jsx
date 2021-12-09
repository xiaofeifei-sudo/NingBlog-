import React, { useState } from "react";

import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import cookies from "react-cookies"

import {useDispatch} from "react-redux"
import { updateInfo } from "../store/user";

import {
  Row,
  Col,
  Button,
  Input,
  Space,
  Radio,
  Popover,
  Avatar,
  Form,
} from "antd";

import servicePath from "../config/api/apiUrl";

import { PhotoSlider, PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/index.css";

import {
  DownloadOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";

import "../styles/pages/sign.less";

import Iconfont from "../config/icon/alibaba";

export const Sign = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // state
  const [qaflag, setQaflag] = useState(false); //qa图放大
  const [email, setEmail] = useState(""); //邮箱
  const [password, setPassword] = useState(""); //密码
  const [pageType, setPageType] = useState(1); //页面类型 login(1) Or Register(2)
  const [sendCaptchaLoading, SetSendCaptchaLoading] = useState(false); //发送验证码Loading

  const forgetMenu = (
    <div>
      <ul className="dropdown-menu">
        <li>
          <a>用手机号码重置密码</a>
        </li>
        <li>
          <a>用邮箱重置密码</a>
        </li>
        <li>
          <a>无法使用海外号码登录</a>
        </li>
        <li>
          <a>无法用Google账号登录</a>
        </li>
      </ul>
    </div>
  );

  const DoLogin = async () => {
    await React.$http({
      url: `${React.$http.adornUrl(servicePath.doLogin)}`,
      method: "post",
      data: React.$http.adornData(
        {
          loginType: 3,
          email,
          password,
        },
        false,
        "form"
      ),
    }).then(({data}) => {
      if (data.status == 200) {
        dispatch(updateInfo(data.data))
        navigate("/")
      }
    });
  };

  const DoRegister = () => {};

  const OnSignInChange = (changedValues, allValues) => {
    setEmail(allValues.email);
    setPassword(allValues.password);
  };

  const OnSignUpChange = (changedValues, allValues) => {};

  const SendCaptcha = () => {};

  return (
    <div className="sign">
      <div className={`logo sign-logo`}>
        <Link to="/">NingBlog</Link>
      </div>
      <Row className="sign-main" type="flex" justify="center">
        <Col className="sign-container" xs={0} sm={0} md={11} lg={11} xl={11}>
          <Row style={{ height: "100%" }}>
            <Col
              className="download-container"
              xs={0}
              sm={0}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="download-content">
                <Button
                  className="download-btn"
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                >
                  <a>下载NingBlogApp</a>
                </Button>

                <div className="download-qa" onClick={() => setQaflag(true)}>
                  <PhotoProvider>
                    <PhotoSlider
                      photoClosable
                      bannerVisible={false}
                      images={[
                        {
                          src: require("../assets/images/down_qa.png").default,
                        },
                      ]}
                      visible={qaflag}
                      onClose={() => setQaflag(false)}
                    />
                  </PhotoProvider>
                  <img
                    alt="QA加载失败"
                    src={require("../assets/images/down_qa.png").default}
                    className="download-qa-smallImg"
                  ></img>
                </div>
              </div>
            </Col>
            <Col className="main" xs={0} sm={0} md={12} lg={12} xl={12}>
              <div className={`comm-box sign-content`}>
                <h4 className="title">
                  <div className="normal-title">
                    <a
                      onClick={() => {
                        setPageType(1);
                      }}
                      className={pageType == 1 ? `active` : null}
                    >
                      登录
                    </a>
                    <b>.</b>
                    <a
                      onClick={() => {
                        setPageType(2);
                      }}
                      className={pageType == 1 ? null : `active`}
                    >
                      注册
                    </a>
                  </div>
                </h4>

                {/* 登录 */}
                {pageType == 1 ? (
                  <div className="sign-in-container">
                    <Form
                      wrapperCol={{ span: 24 }}
                      onValuesChange={OnSignInChange}
                      onFinish={() => {
                        DoLogin();
                      }}
                    >
                      <Form.Item
                        name="email"
                        rules={[{ required: true, message: "邮箱不能为空" }]}
                        hasFeedback={true}
                      >
                        <Input
                          placeholder="请输入邮箱"
                          prefix={<UserOutlined />}
                          allowClear
                          maxLength={24}
                          size="large"
                        ></Input>
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: "密码不能为空" }]}
                      >
                        <Input.Password
                          placeholder="密码"
                          size="large"
                          maxLength={24}
                          prefix={<LockOutlined />}
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone twoToneColor="#8A2BE2" />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                        ></Input.Password>
                      </Form.Item>

                      <div>
                        <Form.Item>
                          <div className={`remember-btn fl`}>
                            <Radio>记住我</Radio>
                          </div>
                          <div className={`forget-btn fr`}>
                            <Popover
                              placement="bottomRight"
                              content={forgetMenu}
                              trigger="click"
                            >
                              <a>登录遇到问题?</a>
                            </Popover>
                          </div>
                        </Form.Item>
                      </div>
                      <Form.Item style={{ width: "100%" }}>
                        <Button
                          shape="round"
                          size="large"
                          type="primary"
                          className="sign-in-btn"
                          htmlType="submit"
                        >
                          登录
                        </Button>
                      </Form.Item>
                    </Form>

                    <div className="more-sign">
                      <h6>社交账号登录</h6>

                      <Space>
                        <a>
                          <Avatar
                            className="more-sign-icon"
                            size="large"
                            icon={<Iconfont type="icon-wechat"></Iconfont>}
                          />
                        </a>

                        <a>
                          <Avatar
                            className="more-sign-icon"
                            size="large"
                            icon={<Iconfont type="icon-QQ"></Iconfont>}
                          />
                        </a>

                        <a>
                          <Avatar
                            className="more-sign-icon"
                            size="large"
                            icon={<Iconfont type="icon-weibo"></Iconfont>}
                          />
                        </a>
                      </Space>
                    </div>
                  </div>
                ) : (
                  <div className="sign-up-container">
                    <Form
                      wrapperCol={{ span: 24 }}
                      onValuesChange={OnSignUpChange}
                      onFinish={() => {
                        DoRegister();
                      }}
                    >
                      <Form.Item
                        name="email"
                        rules={[{ required: true, message: "邮箱不能为空" }]}
                        hasFeedback={true}
                      >
                        <Input
                          placeholder="请输入邮箱"
                          prefix={<UserOutlined />}
                          allowClear
                          maxLength={24}
                          size="large"
                        ></Input>
                      </Form.Item>

                      <Form.Item
                        name="captcha"
                        rules={[{ required: true, message: "验证码不能为空" }]}
                      >
                        <Input.Search
                          onSearch={SendCaptcha}
                          enterButton="发送验证码"
                          loading={sendCaptchaLoading}
                          maxLength="6"
                          size="large"
                          placeholder="验证码"
                        ></Input.Search>
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "0px" }}
                        name="password"
                        rules={[{ required: true, message: "密码不能为空" }]}
                      >
                        <Input.Password
                          placeholder="密码"
                          size="large"
                          maxLength={24}
                          prefix={<LockOutlined />}
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone twoToneColor="#8A2BE2" />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                        ></Input.Password>
                      </Form.Item>

                      <Form.Item style={{ width: "100%", marginBottom: "0px" }}>
                        <Button
                          shape="round"
                          size="large"
                          type="primary"
                          className="sign-up-btn"
                          htmlType="submit"
                        >
                          注册
                        </Button>
                        <p className="sign-up-agreement">
                          点击 “注册” 即表示您同意并愿意遵守NingBlog{" "}
                          <a>用户协议</a> 和 <a>隐私政策</a>
                        </p>
                      </Form.Item>
                    </Form>

                    <div className="more-sign">
                      <h6>社交账号直接注册</h6>

                      <Space size="large">
                        <a>
                          <Avatar
                            className="more-sign-icon"
                            size="large"
                            icon={<Iconfont type="icon-wechat"></Iconfont>}
                          />
                        </a>

                        <a>
                          <Avatar
                            className="more-sign-icon"
                            size="large"
                            icon={<Iconfont type="icon-QQ"></Iconfont>}
                          />
                        </a>
                      </Space>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
