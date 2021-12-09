import React, { Component } from "react";
import {Route,BrowserRouter,Routes} from "react-router-dom"


// 导入页面
import { Wrapper } from "./Wrapper";
import { Home } from "./pages";
import { Sign } from "./pages/sign";
import { Detail } from "./pages/detail";
import {Writer} from "./pages/writer"

import http from "./utils/http/httpRequest";

// 全局$http
React.$http = http;
class App extends Component {

  constructor(props){
    super(props)
    this.state ={}
  }
  render(){
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Wrapper></Wrapper>}>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/detail/:detail_id" element={<Detail></Detail>}></Route>
              <Route path="/writer" element={<Writer></Writer>}></Route>
            </Route>
            <Route path="/sign" element={<Sign />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
