
let servicePath = {
    staticPath: `http://127.0.0.1:3000/st`,
    getArticleList:`/default/getNewestDoc`,// 首页最新文章接口
    getArticleById:`/default/getDocDetail/`,//文章详情页内容接口,需要接收参数
    getTypeInfo:`/default/getTypeInfo`,//文章全部类型
    getTypeTree:`/contentCategory/getTreelist`,//文档类型树形结构
    getListById:`getListById/`,//文章列表
    getTypeById:`getTypeById/`,//获取类型详情
    getArticleCommentById:`/contentMessage/getMessages`,//文章详情页面的评论获取
    postComment: `/contentMessage/postMessages`,//发表和回复评论接口
    getOneAds: `/ads/getOne`,//广告接口

    doLogin:`/user/doLogin`,//用户登录
    loginOut: `/user/logOut`,//退出登录


    // 文档接口
    getList:`/content/getList`,//获取文档接口,可以分页


    // 标签接口
    getTags:`/contentTag/getList`,//获取文档标签

    //上传文件接口
    uploadFile: `/upload/files`
}
export default servicePath
