import { Fragment } from "react";

import { Avatar, Divider, Tooltip, Col, Progress, Tag } from "antd";

import "../../styles/component/author/author.less"

import Iconfont from "../../config/icon/alibaba";


//进度条渐变颜色
const ProgressColor = {
  from: "#108ee9",
  to: "#87d068",
};



export const Author = () => {
  return (
    <Fragment>
      <div className="author-container">
        <div>
          <Col xs={0} sm={0} md={24} xl={24}>
            <Avatar
              className="author-avatar"
              size={100}
              src={require("../../assets/images/author.jpg").default}
            />
          </Col>
        </div>

        <div className="author-name">NingBlog</div>
        <div
          className="author-introduction"
          style={{ color: "rgb(0,216,255)" }}
        >
          软件技术
        </div>
        <div
          className="author-introduction"
          style={{ color: "rgb(0,216,255)" }}
        >
          2019-2022级学生
        </div>
        <div className="author-introduction">
          <Iconfont type="icon-dingwei" /> 广东-广州
          <br />
          前端: Next.js + AntDesignUI
          <br />
          后端: Node + MySql
          <br />
          <Iconfont type="icon-shuangsechangyongtubiao-" /> 1700805832@qq.com
          <br />
          <div className="author-introduction"></div>
          <Divider>社交账号</Divider>
          <Tooltip placement="top" title="Github">
            <a
              href="https://github.com/xiaofeifei-sudo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar
                size="large"
                icon={<Iconfont type="icon-github"></Iconfont>}
                className="anthor-socializing"
              />
            </a>
          </Tooltip>
          <Tooltip placement="top" title="Gitee">
            <a
              href="https://gitee.com/wu-zhining"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar
                size="large"
                icon={<Iconfont type="icon-gitee2"></Iconfont>}
                className="anthor-socializing"
              />
            </a>
          </Tooltip>
          <Tooltip
            placement="top"
            title={
              <img width="100" src={require("../../assets/images/wechat.jpg").default}/>
            }
          >
            <Avatar
              size="large"
              icon={<Iconfont type="icon-wechat"></Iconfont>}
              className="anthor-socializing"
            />
          </Tooltip>
          <Tooltip
            placement="top"
            title={
              <img width="100" src={require("../../assets/images/qq.jpg").default}/>
            }
          >
            <Avatar
              size="large"
              icon={<Iconfont type="icon-QQ"></Iconfont>}
              className="anthor-socializing"
            />
          </Tooltip>
        </div>
      </div>

      {/* 博主skill模块 */}
      <div className={`skill-container comm-box`}>
        <div className="skill-content">
          <Divider orientation="center">博主Skills</Divider>
          <Divider style={{backgroundColor:"green"}}></Divider>
          <div className="progress">
            <Divider orientation="left">
              <Tag color="magenta">Html5</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={54}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="red">Css3</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={54}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="volcano">Javascript</Tag>
            </Divider>
            <Progress
              strokeColor={ProgressColor}
              percent={65}
              status="active"
            />
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="orange">JQuery</Tag>
            </Divider>
            <Progress
              strokeColor={ProgressColor}
              percent={64}
              status="active"
            />
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="gold">TypeScript</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={43}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="lime">Bootstrap</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={54}
                status="active"
              />
            </span>
          </div>


          <div className="progress">
            <Divider orientation="left">
              <Tag color="green">Node.js</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={50}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="cyan">Express</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={65}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="blue">React.js</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={80}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="geekblue">Vue.js</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={80}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="purple">Next.js</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={60}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="magenta">Nuxt.js</Tag>
            </Divider>
            <span>
              <Progress
                strokeColor={ProgressColor}
                percent={50}
                status="active"
              />
            </span>
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="magenta">Java</Tag>
            </Divider>
            <Progress
              strokeColor={ProgressColor}
              percent={64}
              status="active"
            />
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="magenta">Spring</Tag>
            </Divider>
            <Progress
              strokeColor={ProgressColor}
              percent={54}
              status="active"
            />
          </div>

          <div className="progress">
            <Divider orientation="left">
              <Tag color="magenta">MySql</Tag>
            </Divider>
            <Progress
              strokeColor={ProgressColor}
              percent={64}
              status="active"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};