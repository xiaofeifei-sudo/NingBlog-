import React, { useState, useEffect, Fragment, useContext } from "react";

//css样式
import "../../styles/component/header/header.less"

import "../../assets/script/background-music.js"

import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../../store/user";

// 导入symbol图标
import Iconfont from "../../config/icon/alibaba.js";
//router
import {
  Link, //<a> Link to
  Route, //路由
  BrowserRouter as Router, //所有的dom都包含在Router(根节点)
  Routes, //处理无匹配路由
  Redirect, //重定向
  Prompt, //弹窗
  useNavigate
} from "react-router-dom";

// 导入antd的组件
import {
  Row,
  Col,
  Menu,
  Affix,
  Drawer,
  message,
  Modal,
  Tooltip,
  Button,
  Dropdown,
  Avatar
} from "antd";

// 导入图标库
import {
  HomeOutlined,
  FileAddOutlined,
  CameraOutlined,
  CoffeeOutlined,
  WechatOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  MessageOutlined,
  DownOutlined,
  PlaySquareOutlined,
  HighlightOutlined,
  UserOutlined
} from "@ant-design/icons";



// api
import servicePath from "../../config/api/apiUrl";

// 解构confirm,submenu
const { confirm } = Modal;

const { SubMenu } = Menu;




export const Header = ({ toclist }) => {
  // storeState
  const userInfo = useSelector((state) => state.info)

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const [navArr, setNavArr] = useState([]); //导航菜单数组
  const [deftheme, setDefTheme] = useState(true); //默认主题
  const [isOpen, setIsOpen] = useState(false); //折叠菜单
  const [musicPlay, setMusicPlay] = useState(false); //音乐播放
  const [current, setCurrent] = useState("mail");
  const [rightDrawer, setRightDrawer] = useState(false); //右侧菜单导航栏
  const [leftDrawer, setLeftDrawer] = useState(false); //左侧个人详情弹出

  useEffect(() => {
    getTypeInfo();

    // 渲染旋律条
    window.renderMusic();

    // 滚动条监听导航滑动和消失

    window.onscroll = hiddenHeader;
    return (()=>{
      window.onscroll = ""
    })
  }, []);

  //获取分类列表
  const getTypeInfo = async ()=>{
    await React.$http({
      url: React.$http.adornUrl(servicePath.getTypeInfo),
      method: "get",
    }).then(({ data }) => {
      if (data.status == 200){
        setNavArr(data.data.data);
      }
    });
  }

  const hiddenHeader = ()=>{
    let scrollHeight = 0;
    //变量t是滚动条滚动时，距离顶部的距离
    let t = document.documentElement.scrollTop || document.body.scrollTop;
    let header = document.getElementById("scrolldisplay");

    // 防止抖动
    if (t >= 50) {
      if (t - header < 0) {
        header.style.marginTop = "0";
        scrollHeight = t;
      } else {
        header.style.marginTop = "-12rem";
        scrollHeight = t;
      }
    } else {
      // 恢复正常
      header.style.marginTop = "0";
      scrollHeight = t;
    }
  }

  //展示右侧菜单抽屉
  const RightDrawerToggle = () => {
    setRightDrawer(rightDrawer ? false : true);
  };

  //展示左侧菜单抽屉
  const leftDrawerToggle = () => {
    setLeftDrawer(leftDrawer ? false : true);
  };

  //音乐控制
  const playMusic = () => {
    let audio = document.getElementById("bg_music");
    if (musicPlay) {
      setMusicPlay(false);
      audio.pause();
    } else {
      setMusicPlay(true);
      audio.play();
    }
  };

  //退出登录
  const signOutBtn =async () => {
    await React.$http(
        {
          url: React.$http.adornUrl(servicePath.loginOut),
          method: "get"
        }
    ).then(({data})=>{
      if (data.status==200) {
        message.success("退出登录成功!", 1.5)
        dispatch(signOut())
      }
    })
  }


  //发表文章
  const writeDoc = ()=>{
    if (!_.isEmpty(userInfo)){
      navigate("/writer")
    }else {
      message.error("请先登录",1.5)
    }
  }


  const UserMenu = (
    <Menu mode="vertical">
      <Menu.Item icon={<UserOutlined />}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          我的主页
        </a>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          收藏夹
        </a>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          已购内容
        </a>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          我的钱包
        </a>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />}>
        <a target="_blank" onClick={signOutBtn} rel="noopener noreferrer">
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );


  return (
        <div id="scrolldisplay" className="header">
          <Row type="flex" className="header-container" justify="center">
            <Col xs={3} sm={3} md={0} lg={0} xl={0}>
              <Button
                  className={`leftMenu`}
                  type="link"
                  onClick={() => {
                    leftDrawerToggle();
                  }}
              >
                <Iconfont
                    style={{ fontSize: "2rem", textAlign: "center" }}
                    type="icon-gerenxinxi"
                ></Iconfont>
              </Button>
            </Col>

            <Col md={4} lg={4} xl={musicPlay ? 5 : 4}>
              <audio src={require('../../assets/musics/旧人叹(圈9).mp3').default} id="bg_music" loop></audio>

              <div style={musicPlay ? { display: "block" } : { display: "none" }}>
                <Tooltip title="背景音乐控制" placement="bottom" color="#6a11cb">
                  <canvas
                      className="musicCanvas"
                      onClick={() => {
                        playMusic();
                      }}
                  ></canvas>
                </Tooltip>
              </div>

              <div style={musicPlay ? { display: "none" } : null}>
                <Tooltip
                    title="背景音乐控制:(PS:显示音乐旋律条)"
                    onClick={() => {
                      playMusic();
                    }}
                    placement="bottom"
                    color="#6a11cb"
                >
                  <span className="logo">NingBlog</span>
                  <span className="header-txt">开发俱乐部</span>
                </Tooltip>
              </div>
            </Col>
            {/*
        使用antd进行页面编辑
xs<576px sm≥576px md≥768px lg≥992px xl≥1200px xxl≥1600px antd是24栅格化布局 给它24意味着占满 */}

            <Col xs={3} sm={3} md={0} lg={0} xl={0}>
              <Button
                  className="barsMenu"
                  type="link"
                  onClick={() => {
                    RightDrawerToggle();
                  }}
              >
                <span className="barsBtn"></span>
              </Button>
            </Col>

            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={8}>
              <Menu
                  mode="horizontal"
                  selectable={false}
                  overflowedIndicator={
                    isOpen ? (
                        <CaretUpOutlined theme="filled" />
                    ) : (
                        <CaretDownOutlined theme="filled" />
                    )
                  }
                  theme={deftheme ? "light" : "dark"}
                  style={
                    deftheme
                        ? { backgroundColor: "rgba(241, 131, 181,0)" }
                        : { backgroundColor: "rgba(40,54,70,0)" }
                  }
                  onOpenChange={() => {
                    setIsOpen(!isOpen);
                  }}
              >
                <Menu.Item key="首页" icon={<HomeOutlined />}>
                  <Link to="/">
                    首页
                  </Link>
                </Menu.Item>

                <SubMenu key="学习记录" title="学习记录" icon={<FileAddOutlined />}>
                  {navArr.map((item, index) => {
                    return (
                        <Menu.Item key={item._id}>
                          <Link to={"/list?id=" + item._id}>
                            {item.name}
                          </Link>
                        </Menu.Item>
                    );
                  })}
                </SubMenu>

                <Menu.Item key="作品集" icon={<CoffeeOutlined />}>
                  <Link to={"/list?id="}>
                    作品集
                  </Link>
                </Menu.Item>

                <Menu.Item key="摄影" icon={<CameraOutlined />}>
                  摄影
                </Menu.Item>

                <Menu.Item key="直播间" icon={<PlaySquareOutlined />}>
                  <Link to="/live">
                    直播间
                  </Link>
                </Menu.Item>
                <Menu.Item key="聊天室" icon={<WechatOutlined />}>
                  聊天室
                </Menu.Item>
                <Menu.Item key="留言板" icon={<MessageOutlined />}>
                  <Link to="/message">
                    留言板
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>

            <Col className="function-div" xs={0} sm={0} md={0} lg={5} xl={5}>
              <Button type="link">
                <i>Aa</i>
              </Button>


              {_.isEmpty(userInfo) ? (<Fragment>
                <Button type="link">
                  <Link to="/sign">
                    登录
                  </Link>
                </Button>
                <Button
                    type="primary"
                    shape="round"
                    style={{ marginRight: "0.5rem" }}
                >
                  注册
                </Button>
              </Fragment>) : (<Fragment>
                <Dropdown overlay={UserMenu} arrow>
              <span>
                <Avatar className="header-logged-avatar" src={userInfo.logo} >
                </Avatar>
                <DownOutlined />
              </span>
                </Dropdown>
              </Fragment>)}


              <Button type="primary" onClick={()=>{
                writeDoc()
              }} className="header-edit-btn" shape="round" icon={<HighlightOutlined />}>
                写文章
              </Button>
            </Col>

            <Col
                xl={musicPlay ? 5 : 0}
                xs={0}
                lg={0}
                sm={0}
                style={{ position: "relative" }}
            >
              <canvas
                  className="musicCanvas"
                  onClick={() => {
                    playMusic();
                  }}
                  style={
                    musicPlay
                        ? { display: "block", float: "right" }
                        : { display: "none" }
                  }
              ></canvas>
            </Col>

            <Drawer
                width="70%"
                title={<div>个人简介</div>}
                placement="left"
                closable={true}
                onClose={() => {
                  leftDrawerToggle();
                }}
                visible={leftDrawer}
            >
              {/* <Author></Author> */}
            </Drawer>

            <Drawer
                width="70%"
                title={<div>菜单栏</div>}
                closable={true}
                placement="right"
                onClose={() => {
                  RightDrawerToggle();
                }}
                visible={rightDrawer}
            >
              <Menu
                  mode="horizontal"
                  selectable={false}
                  theme={deftheme ? "light" : "dark"}
                  style={
                    deftheme
                        ? { backgroundColor: "rgba(241, 131, 181,0)" }
                        : { backgroundColor: "rgba(40,54,70,0)" }
                  }
                  onOpenChange={() => {
                    setIsOpen(!isOpen);
                  }}
              >
                <Menu.Item key="首页" icon={<HomeOutlined />}>
                  <Link href="/">
                    首页
                  </Link>
                </Menu.Item>

                <SubMenu
                    style={{ padding: "0px" }}
                    key="学习记录"
                    title="学习记录"
                    icon={<FileAddOutlined />}
                >
                  {navArr.map((item, index) => {
                    return (
                        <Menu.Item key={item._id}>
                          <Link to={"/list?id=" + item._id}>
                            {item.name}
                          </Link>
                        </Menu.Item>
                    );
                  })}
                </SubMenu>

                <Menu.Item key="生活" icon={<CoffeeOutlined />}>
                  生活
                </Menu.Item>

                <Menu.Item key="摄影" icon={<CameraOutlined />}>
                  摄影
                </Menu.Item>

                <Menu.Item key="直播间" icon={<PlaySquareOutlined />}>
                  <Link href="/live">
                    直播间
                  </Link>
                </Menu.Item>
                <Menu.Item key="聊天室" icon={<WechatOutlined />}>
                  聊天室
                </Menu.Item>
                <Menu.Item key="留言板" icon={<MessageOutlined />}>
                  <Link href="/message">
                    留言板
                  </Link>
                </Menu.Item>
              </Menu>

              <div className="tocList">{toclist}</div>
            </Drawer>
          </Row>
        </div>
  )
};
