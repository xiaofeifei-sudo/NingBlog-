String.prototype.render = function (context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
};


// 生成随机数,从start到end,不包括end
function randomNum(start, end) {
    return Math.floor(Math.random()*end)+start;
}


let model = [
    ["model/22/model.default.json", "model/22/model.2016.xmas.1.json", "model/22/model.2016.xmas.2.json", "model/22/model.2017.cba-normal.json", "model/22/model.2017.cba-super.json", "model/22/model.2017.newyear.json", "model/22/model.2017.school.json", "model/22/model.2017.summer.normal.1.json", "model/22/model.2017.summer.normal.2.json", "model/22/model.2017.summer.super.1.json", "model/22/model.2017.summer.super.2.json", "model/22/model.2017.tomo-bukatsu.high.json", "model/22/model.2017.tomo-bukatsu.low.json", "model/22/model.2017.valley.json", "model/22/model.2017.vdays.json", "model/22/model.2018.bls-summer.json", "model/22/model.2018.bls-winter.json", "model/22/model.2018.lover.json", "model/22/model.2018.spring.json"],
    ["model/22_high/model.json"],
    ["model/33/model.default.json", "model/33/model.2016.xmas.1.json", "model/33/model.2016.xmas.2.json", "model/33/model.2017.cba-normal.json", "model/33/model.2017.cba-super.json", "model/33/model.2017.newyear.json", "model/33/model.2017.school.json", "model/33/model.2017.summer.normal.1.json", "model/33/model.2017.summer.normal.2.json", "model/33/model.2017.summer.super.1.json", "model/33/model.2017.summer.super.2.json", "model/33/model.2017.tomo-bukatsu.high.json", "model/33/model.2017.tomo-bukatsu.low.json", "model/33/model.2017.valley.json", "model/33/model.2017.vdays.json", "model/33/model.2018.bls-summer.json", "model/33/model.2018.bls-winter.json", "model/33/model.2018.lover.json", "model/33/model.2018.spring.json"],
    ["model/33_high/model.json"],
    ["model/bronya/model.json"],
    ["model/bronya_1/model.json"],
    ["model/haru/haru_01.model.json", "model/haru/haru_02.model.json"],
    ["model/haruto/haruto.model.json"],
    ["model/hibiki/hibiki.model.json"],
    ["model/hijiki/hijiki.model.json", "model/tororo/tororo.model.json"],
    ["model/index/model.json"],
    ["model/izumi/izumi.model.json"],
    ["model/katou_01/katou_01.model.json"],
    ["model/liang/2.json"],
    ["model/live_uu/model.json", "model/live_uu/model_usb.json"],
    ["model/mei/model.json"],
    ["model/miku/miku.model.json"],
    ["model/murakumo/index.json"],
    ["model/xiaomai/xiaomai.model.json"],
    ["model/wanko/wanko.model.json"],
    ["model/shizuku/shizuku.model.json"],
    ["model/Epsilon2.1/Epsilon2.1.model.json"],
    ["model/Pio/model.json", "model/Pio/model1.json", "model/Pio/model2.json", "model/Pio/model3.json", "model/Pio/model4.json", "model/Pio/model5.json"],
    ["model/platelet/model.json"],
    ["model/platelet-2/model.json", "model/platelet-3/kesyoban.model.json"],
    ["model/rem/model.json"],
    ["model/sagiri/sagiri.model.json"],
    ["model/snow_miku/model.json"],
    ["model/Terisa/model.json"],
    ["model/Tia/index.json", "model/Tia/index1.json", "model/Tia/index2.json", "model/Tia/index3.json", "model/Tia/index4.json", "model/Tia/index5.json"],
    ["model/tsumiki/tsumiki.model.json"],
    ["model/unitychan/unitychan.model.json"],
    ["model/yuri/model.json"],
    ["model/z16/z16.model.json"],
    ["model/chitose/chitose.model.json"],
    ["model/HyperdimensionNeptunia/blanc_classic/index.json", "model/HyperdimensionNeptunia/blanc_normal/index.json", "model/HyperdimensionNeptunia/blanc_swimwear/index.json"],
    ["model/HyperdimensionNeptunia/histoire/index.json", "model/HyperdimensionNeptunia/histoirenohover/index.json"],
    ["model/HyperdimensionNeptunia/nepgear/index.json", "model/HyperdimensionNeptunia/nepgearswim/index.json", "model/HyperdimensionNeptunia/nepgear_extra/index.json"],
    ["model/HyperdimensionNeptunia/nepmaid/index.json", "model/HyperdimensionNeptunia/nepnep/index.json", "model/HyperdimensionNeptunia/nepswim/index.json", "model/HyperdimensionNeptunia/neptune_classic/index.json", "model/HyperdimensionNeptunia/neptune_santa/index.json"], ["model/HyperdimensionNeptunia/noir_classic/index.json", "model/HyperdimensionNeptunia/noir/index.json", "model/HyperdimensionNeptunia/noir_santa/index.json", "model/HyperdimensionNeptunia/noireswim/index.json"],
    ["model/HyperdimensionNeptunia/vert_classic/index.json", "model/HyperdimensionNeptunia/vert_normal/index.json", "model/HyperdimensionNeptunia/vert_swimwear/index.json"],
    ["model/mashiro/ryoufuku.model.json", "model/mashiro/seifuku.model.json", "model/mashiro/shifuku.model.json"],
    ["model/makoto0/makoto0.model.json"],
    ["model/penchan/penchan.model.json"],
    ["model/iio/iio.model.json"],
    ["model/yukari_model/yukari_model.model.json"],
    ["model/YuzukiYukari/YuzukiYukari.model.json"],
    ["model/Violet/14.json"],
    ["model/Alice/model.json"],
    ["model/fox/model.json"],
    ["model/himeko/model.json"],
    ["model/kiana/model.json"],
    ["model/redeemer/model.json"],
    ["model/sakura/model.json"],
    ["model/seele/model.json"],
    ["model/sin/model.json"],
    ["model/theresa/model.json"],
    ["model/illyasviel/illyasviel.model.json"],
    ["model/dollsfrontline/88type_1809/normal/model.json", "model/dollsfrontline/88type_1809/destroy/model.json"],
    ["model/dollsfrontline/95type_405/normal/model.json", "model/dollsfrontline/95type_405/destroy/model.json"],
    ["model/dollsfrontline/ags-30/model.json"],
    ["model/dollsfrontline/armor/model1.json", "model/dollsfrontline/armor/model2.json", "model/dollsfrontline/armor/model3.json"],
    ["model/dollsfrontline/command/model1.json", "model/dollsfrontline/command/model2.json", "model/dollsfrontline/command/model3.json"],
    ["model/dollsfrontline/dsr50_1801/normal/model.json", "model/dollsfrontline/dsr50_1801/destroy/model.json"],
    ["model/dollsfrontline/dsr50_2101/normal/model.json", "model/dollsfrontline/dsr50_2101/destroy/model.json"],
    ["model/dollsfrontline/fn57_2203/normal/model.json"],
    ["model/dollsfrontline/fortress/model1.json", "model/dollsfrontline/fortress/model2.json", "model/dollsfrontline/fortress/model3.json"],
    ["model/dollsfrontline/g36c_1202/normal/model.json", "model/dollsfrontline/g36c_1202/destroy/model.json"],
    ["model/dollsfrontline/g41_2401/normal/model.json", "model/dollsfrontline/g41_2401/destroy/model.json"],
    ["model/dollsfrontline/gelina/normal/model.json"],
    ["model/dollsfrontline/golden/model1.json", "model/dollsfrontline/golden/model2.json", "model/dollsfrontline/golden/model3.json"],
    ["model/dollsfrontline/grizzly_2102/normal/model.json", "model/dollsfrontline/grizzly_2102/destroy/model.json"],
    ["model/dollsfrontline/hk416_805/normal/model.json", "model/dollsfrontline/hk416_805/destroy/model.json"],
    ["model/dollsfrontline/kp31_310/normal/model.json", "model/dollsfrontline/kp31_310/destroy/model.json"],
    ["model/dollsfrontline/kp31_1103/normal/model.json", "model/dollsfrontline/kp31_1103/destroy/model.json"],
    ["model/dollsfrontline/kp31_3101/normal/model.json", "model/dollsfrontline/kp31_3101/destroy/model.json"],
    ["model/dollsfrontline/m1928a1_1501/normal/model.json", "model/dollsfrontline/m1928a1_1501/destroy/model.json"],
    ["model/dollsfrontline/mlemk1_604/normal/model.json", "model/dollsfrontline/mlemk1_604/destroy/model.json"],
    ["model/dollsfrontline/ntw20_2301/normal/model.json", "model/dollsfrontline/ntw20_2301/destroy/model.json"],
    ["model/dollsfrontline/ots14_3001/normal/model.json", "model/dollsfrontline/ots14_3001/destroy/model.json"],
    ["model/dollsfrontline/px4storm_2801/normal/model.json", "model/dollsfrontline/px4storm_2801/destroy/model.json"],
    ["model/dollsfrontline/rfb_1601/normal/model.json", "model/dollsfrontline/rfb_1601/destroy/model.json"],
    ["model/dollsfrontline/sat8_2601/normal/model.json", "model/dollsfrontline/sat8_2601/destroy/model.json"],
    ["model/dollsfrontline/shield/model1.json", "model/dollsfrontline/shield/model2.json", "model/dollsfrontline/shield/model3.json"],
    ["model/dollsfrontline/type64-ar_2901/normal/model.json", "model/dollsfrontline/type64-ar_2901/destroy/model.json"],
    ["model/dollsfrontline/vector_1901/normal/model.json", "model/dollsfrontline/vector_1901/destroy/model.json"],
    ["model/dollsfrontline/wa2000_6/normal/model.json", "model/dollsfrontline/wa2000_6/destroy/model.json"],
    ["model/dollsfrontline/welrod_1401/normal/model.json", "model/dollsfrontline/welrod_1401/destroy/model.json"],
    ["model/chiaki_kitty/chiaki_kitty.model.json"],
    ["model/date_16/date_16.model.json", "model/hallo_16/hallo_16.model.json"],
    ["model/kanzaki/kanzaki.model.json"],
    ["model/Kobayaxi/Kobayaxi.model.json"],
    ["model/kuroko/kuroko.model.json"],
    ["model/len/len.model.json", "model/len_impact/len_impact.model.json", "model/len_space/len_space.model.json", "model/len_swim/len_swim.model.json"],
    ["model/ryoufuku/ryoufuku.model.json"],
    ["model/saten/saten.model.json"],
    ["model/seifuku/seifuku.model.json"],
    ["model/shifuku/shifuku.model.json", "model/shifuku2/shifuku2.model.json"],
    ["model/stl/stl.model.json"],
    ["model/touma/touma.model.json"],
    ["model/uiharu/uiharu.model.json"],
    ["model/wed_16/wed_16.model.json"]
]

var re = /x/;
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000, true);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000, true);
});

$('.waifu-tool .fui-home').click(function (){
    //window.location = 'https://www.fghrsh.net/';
    window.location = window.location.protocol+'//'+window.location.hostname+'/'
});

$('.waifu-tool .fui-eye').click(function (){
    loadOtherModel();
});

$('.waifu-tool .fui-chat').click(function (){
    showHitokoto();
});

$('.waifu-tool .fui-user').click(function (){
    loadRandModel();
});

$('.waifu-tool .fui-info-circle').click(function (){
    //window.open('https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02');
    window.open('https://www.fghrsh.net/post/123.html');
});

$('.waifu-tool .fui-cross').click(function (){
    sessionStorage.setItem('waifu-dsiplay', 'none');
    showMessage('愿你有一天能与重要的人重逢', 1300, true);
    window.setTimeout(function() {$('.waifu').hide();}, 1300);
});

$('.waifu-tool .fui-photo').click(function (){
    showMessage('照好了嘛，是不是很可爱呢？', 5000, true);
    window.Live2D.captureName = 'Pio.png';
    window.Live2D.captureFrame = true;
});

(function (){
    var text;
    //var SiteIndexUrl = 'https://www.fghrsh.net/';  // 手动指定主页
    var SiteIndexUrl = window.location.protocol+'//'+window.location.hostname+'/';  // 自动获取主页

    if (window.location.href == SiteIndexUrl) {      // 如果是主页
        var now = (new Date()).getHours();
        if (now > 23 || now <= 5) {
            text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
        } else if (now > 5 && now <= 7) {
            text = '早上好！一日之计在于晨，美好的一天就要开始了';
        } else if (now > 7 && now <= 11) {
            text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
        } else if (now > 11 && now <= 14) {
            text = '中午了，工作了一个上午，现在是午餐时间！';
        } else if (now > 14 && now <= 17) {
            text = '午后很容易犯困呢，今天的运动目标完成了吗？';
        } else if (now > 17 && now <= 19) {
            text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
        } else if (now > 19 && now <= 21) {
            text = '晚上好，今天过得怎么样？';
        } else if (now > 21 && now <= 23) {
            text = '已经这么晚了呀，早点休息吧，晚安~';
        } else {
            text = '嗨~ 快来逗我玩吧！';
        }
    } else {
        if(document.referrer !== ''){
            var referrer = document.createElement('a');
            referrer.href = document.referrer;
            var domain = referrer.hostname.split('.')[1];
            if (window.location.hostname == referrer.hostname) {
                text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
            } else if (domain == 'baidu') {
                text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
            } else if (domain == 'so') {
                text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
            } else if (domain == 'google') {
                text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
            } else {
                text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
            }
        } else {
            text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }
    showMessage(text, 6000);
})();

//window.hitokotoTimer = window.setInterval(showHitokoto,30000);
/* 检测用户活动状态，并在空闲时 定时显示一言 */
var getActed = false;
window.hitokotoTimer = 0;
var hitokotoInterval = false;

$(document).mousemove(function(e){getActed = true;}).keydown(function(){getActed = true;});
setInterval(function() { if (!getActed) ifActed(); else elseActed(); }, 1000);

function ifActed() {
    if (!hitokotoInterval) {
        hitokotoInterval = true;
        hitokotoTimer = window.setInterval(showHitokoto, 30000);
    }
}

function elseActed() {
    getActed = hitokotoInterval = false;
    window.clearInterval(hitokotoTimer);
}

function showHitokoto(){
	/* 增加 hitokoto.cn API */
    $.getJSON('https://v1.hitokoto.cn',function(result){
        var text = '这句一言来自 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">{creator}</span> 在 hitokoto.cn 投稿的。';
        text = text.render({source: result.from, creator: result.creator});
        showMessage(result.hitokoto, 5000);
        window.setTimeout(function() {showMessage(text, 3000);}, 5000);
    });
	/*
	$.getJSON('https://api.fghrsh.net/hitokoto/rand/?encode=jsc&uid=3335',function(result){
        var text = '这句一言出处是 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">FGHRSH</span> 在 {date} 收藏的！';
        text = text.render({source: result.source, date: result.date});
        showMessage(result.hitokoto, 5000);
        window.setTimeout(function() {showMessage(text, 3000);}, 5000);
    });
	*/
}

function showMessage(text, timeout, flag){
    if(flag || sessionStorage.getItem('waifu-text') === '' || sessionStorage.getItem('waifu-text') === null){
        if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
        //console.log(text);

        if(flag) sessionStorage.setItem('waifu-text', text);

        $('.waifu-tips').stop();
        $('.waifu-tips').html(text).fadeTo(200, 1);
        if (timeout === undefined) timeout = 5000;
        hideMessage(timeout);
    }
}

function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === undefined) timeout = 5000;
    window.setTimeout(function() {sessionStorage.removeItem('waifu-text')}, timeout);
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}

var assetPath = ""


function initModel(waifuPath){
    assetPath = waifuPath

    if (waifuPath === undefined) waifuPath = '';
    var modelId = localStorage.getItem('modelId');
    var modelTexturesId = localStorage.getItem('modelTexturesId');

    if (modelId == null) {
        /* 首次访问加载 指定模型 的 指定材质 */
        var modelId = 0;            // 模型 ID
        var modelTexturesId = 0   // 材质 ID
    }
    loadModel(waifuPath,modelId, modelTexturesId);

	$.ajax({
        cache: true,
        url: waifuPath+'waifu-tips.json',
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(document).on("mouseover", tips.selector, function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.render({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(document).on("click", tips.selector, function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.render({text: $(this).text()});
                    showMessage(text, 3000, true);
                });
            });
            $.each(result.seasons, function (index, tips){
                var now = new Date();
                var after = tips.date.split('-')[0];
                var before = tips.date.split('-')[1] || after;

                if((after.split('/')[0] <= now.getMonth()+1 && now.getMonth()+1 <= before.split('/')[0]) &&
                   (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.render({year: now.getFullYear()});
                    showMessage(text, 6000, true);
                }
            });
        }
    });
}

function loadModel(assetPath,modelId, modelTexturesId){
    localStorage.setItem('modelId', modelId);
    if (modelTexturesId === undefined) modelTexturesId = 0;
    localStorage.setItem('modelTexturesId', modelTexturesId);
    loadlive2d('live2d',"script/live2d/"+model[modelId][modelTexturesId])
    // console.log("模型地址"+"https://api.fghrsh.net/live2d/get/?id="+modelId+"-"+modelTexturesId);
    // loadlive2d('live2d', 'https://api.fghrsh.net/live2d/get/?id='+modelId+'-'+modelTexturesId, console.log('live2d','模型 '+modelId+'-'+modelTexturesId+' 加载完成'));
}

function loadRandModel(){
    let modelId = localStorage.getItem('modelId');
    let modelTexturesId = localStorage.getItem('modelTexturesId');

    let modelTexturesRandMode = 'rand';     // 可选 'rand'(随机), 'switch'(顺序)


    // 远程获取model
    // $.ajax({
    //     cache: false,
    //     url: 'https://api.fghrsh.net/live2d/'+modelTexturesRandMode+'_textures/?id='+modelId+'-'+modelTexturesId,
    //     dataType: "json",
    //     success: function (result){
    //         if (result.textures['id'] == 1 && (modelTexturesId == 1 || modelTexturesId == 0)) {
    //             showMessage('我还没有其他衣服呢', 3000, true);
    //         } else {
    //             showMessage('我的新衣服好看嘛', 3000, true);
    //         }
    //         loadModel(modelId, result.textures['id']);
    //     }
    // });
    let modelLength = model.length;

    let modelIdRandom = randomNum(0,modelLength);

    while (modelIdRandom == modelId){
        modelIdRandom = randomNum(0,modelLength)
    }

    // 随机装饰
    let modelTexturesIdRandom = randomNum(0,model[modelIdRandom].length)

    loadModel(assetPath,modelIdRandom,modelTexturesIdRandom)

    showMessage("依然是可爱的我呀!",3000,true)

}

function loadOtherModel(){
    let modelId = localStorage.getItem('modelId');

    let modelTexturesId = localStorage.getItem('modelTexturesId');

    let modelTexturesRandMode = 'switch';     // 可选 'rand'(随机), 'switch'(顺序)

    // 远程异步获取模型
    // $.ajax({
    //     cache: false,
    //     url: 'https://api.fghrsh.net/live2d/'+modelTexturesRandMode+'/?id='+modelId,
    //     dataType: "json",
    //     success: function (result){
    //         loadModel(result.model['id']);
    //         showMessage(result.model['message'], 3000, true);
    //     }
    // });

    // 本地模型获取
    let modelDecorate = model[modelId].length;

    // 防止无限循环
    if (modelDecorate>1){
        let randomDecorateNum = randomNum(0,modelDecorate);

        while (randomDecorateNum == modelTexturesId){
            randomDecorateNum = randomNum(0,modelDecorate)
        }
        loadModel(assetPath,modelId,randomDecorateNum)
        showMessage('我的新衣服好看嘛', 3000, true);
    }else {
        showMessage("我还没有其他衣服,好穷呀,没钱买衣服了呢!",3000,true)
    }
}

initModel("script/live2d/");


