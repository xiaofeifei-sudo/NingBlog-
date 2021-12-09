import React, {Component} from "react";
import BraftEditor from "braft-editor";

import "../styles/pages/writer.less";
import "braft-editor/dist/index.css";

import {Row, Col, message, Input, Button, Cascader, Select, Tag, Upload} from "antd";
import servicePath from "../config/api/apiUrl";
import {randomColor} from "../utils/helper/helper";
import ImgCrop from "antd-img-crop";
import resolve from "resolve";

const {Option} = Select;

export class Writer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "【无标题】",
            titlePlaceholder: "请输入文章标题 (5~100个字)",
            detail: "",
            categoryTree: [],
            coverList: [],
            tags: [],
            tagsOptions: [],
            digits: "",
            digistPlaceholder: "摘要（必填）：会在推荐、列表等场景外露，帮助读者快速了解内容，限制100个字",
            editorState: BraftEditor.createEditorState(null)
        };
        this.handleUpload = this.handleUpload.bind(this)
        this.coverChange = this.coverChange.bind(this)
    }


    componentDidMount() {
        this.fetchCategory();
        this.fetchTags().then(() => {
            let tagsOptions = [];
            for (let i = 0; i < this.state.tags.length; i++) {
                tagsOptions.push(<Option key={this.state.tags[i]._id}>{this.state.tags[i].name}</Option>);
            }
            this.setState({
                tagsOptions
            });
        });
    }

    async fetchCategory() {
        await React.$http({
            url: React.$http.adornUrl(servicePath.getTypeTree),
            method: "get"
        }).then(({data}) => {
            if (data.status == 200) {
                this.setState({
                    categoryTree: data.data
                });
            }
        });
    }


    async fetchTags() {
        await React.$http({
            url: React.$http.adornUrl(servicePath.getTags),
            method: "get"
        }).then(({data}) => {
            if (data.status == 200) {
                this.setState({
                    tags: data.data
                });
            }
        });
    }

    tagRender(props) {
        const {label, value, closable, onClose} = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={randomColor()}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{marginRight: 3}}
            >
                {label}
            </Tag>
        );
    }


    async handleUpload(data) {
        let formData = new FormData();
        formData.append('file',data.file)
        await React.$http({
            url: React.$http.adornUrl(servicePath.uploadFile),
            method: "post",
            headers: {'contentType': 'multipart/form-data'},
            data: formData
        }).then(({data})=>{
            if (data.status == 200){
                console.log(data);
            }
        })

    }


        coverBeforeUpload(file)
        {
            return true;
        }


        coverChange({fileList: newFileList}){
            this.setState({
                coverList:newFileList
            })
        }



        async coverPreview(file)
        {
            let src = file.url;
            if (!src) {
                src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow.document.write(image.outerHTML);
        }


        render()
        {
            const {TextArea} = Input;
            return (
                <div className="comm-main writer-container">
                    <Row justify="center" type="flex">
                        <Col xs={0}
                             sm={0}
                             md={18}
                             lg={18}
                             xl={18}>
                            <div className={`writer-content-title comm-box`}>
                                <div className={`writer-content-title-box`}>
                                    <TextArea showCount size="large" rows="1" allowClear maxLength="100" minLength="5"
                                              value={this.state.title} onChange={(e) => {
                                        this.setState({
                                            title: e.target.value
                                        });
                                    }
                                    } bordered={false} placeholder={this.state.titlePlaceholder}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" type="flex">
                        <Col xs={0}
                             sm={0}
                             md={18}
                             lg={18}
                             xl={18}>
                            <div className={`writer-content-detail comm-box`}>
                                <div className={`writer-content-detail-box`}>
                                    <BraftEditor value={this.state.detail} onChange={(editorState) => {
                                        this.setState({
                                            detail: editorState
                                        });
                                    }}></BraftEditor>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" type="flex">
                        <Col xs={0}
                             sm={0}
                             md={5}
                             lg={5}
                             xl={5}>
                            <div className={`writer-content-category comm-box`}>
                                <div className={`writer-content-category-box`}>
                                    <label className={`writer-content-category-label`}>分类</label>
                                    <Cascader options={this.state.categoryTree}
                                              fieldNames={{label: "name", value: "name", children: "children"}}
                                              allowClear
                                              size="large"></Cascader>
                                </div>
                            </div>
                        </Col>
                        <Col xs={0}
                             sm={0}
                             md={5}
                             lg={5}
                             xl={5}>
                            <div className={`writer-content-tags comm-box`}>
                                <div className={`writer-content-tags-box`}>
                                    <label className={`writer-content-tags-label`}>标签</label>
                                    <Select tagRender={this.tagRender} allowClear
                                            className={`writer-content-tags-selector`}
                                            mode="multiple" showArrow size="large">
                                        {this.state.tagsOptions}
                                    </Select>
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={0}
                            sm={0}
                            md={8}
                            lg={8}
                            xl={8}
                        >
                            <div className={`writer-content-digest comm-box`}>
                                <div className={`writer-content-digest-box`}>
                                    <label className={`writer-content-digest-label`}>摘要</label>
                                    <TextArea showCount size="large" rows="1" allowClear maxLength="100" minLength="5"
                                              value={this.state.digits} onChange={(e) => {
                                        this.setState({
                                            digits: e.target.value
                                        });
                                    }
                                    } bordered={false} placeholder={this.state.digistPlaceholder}/>
                                </div>
                            </div>
                        </Col>
                    </Row>


                    <Row justify="center" type="flex">
                        <Col xs={0}
                             sm={0}
                             md={9}
                             lg={9}
                             xl={9}>
                            <div className={`writer-content-cover comm-box`}>
                                <div className={`writer-content-digest-box`}>
                                    <label className={`writer-content-digest-label`}>封面</label>
                                    <ImgCrop aspect={1 / 1} grid modalTitle="编辑封面" modalOk="确认上传" quality={1}
                                             modalCancel="取消上传" maxZoom="100" rotate>
                                        <Upload listType="picture-card" customRequest={this.handleUpload}
                                                fileList={this.state.coverList}
                                                beforeUpload={this.coverBeforeUpload} onPreview={this.coverPreview}>
                                            {this.state.coverList.length < 1 && "+上传封面"}
                                        </Upload>
                                    </ImgCrop>
                                </div>
                            </div>
                        </Col>
                        <Col xs={0}
                             sm={0}
                             md={9}
                             lg={9}
                             xl={9}>
                            <div className={`writer-content-submit`}>
                                <div className={`writer-content-submit-box`}>
                                    <Button size="large" type="primary">提交发布</Button>

                                    <Button size="large">保存草稿</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
    }

