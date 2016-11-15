
//页面所有函数的封装
var Page = {
    newsType:{list:[{text:'热点',type:'热点'},{text:'推荐',type:'推荐'},{text:'国内',type:'国内'},{text:'科技',type:'科技'},{text:'数码',type:'数码'},{text:'娱乐',type:'娱乐'},{text:'视频',type:'视频'},{text:'国际',type:'国际'}]},
    init:function(){

        this.setNav();
        this.loadNews("热点");
        this.events();
    },

    events:function(){
        var _this = this;
        $(".navlist").on('click', 'a', function(event) {
            event.preventDefault();
            var $a = $(this);
            // _this.loadGJNews();
            _this.loadNews($a.data("type"));
        });
    },

    /**
     * 设置新闻分类
     */
    setNav:function(){
        var htmlStr = Mustache.render('{{#list}} <li><a href="#" data-type="{{type}}">{{text}}</a></li> {{/list}}', this.newsType);
        $(".navlist").html(htmlStr);
    },

    loadNews:function(newsType){
        var _this = this;
        $.ajax({
            url:'http://route.showapi.com/109-35',
            dataType: 'json',
            data: {
              'showapi_appid': 25350,
              'showapi_sign':'499321e69f444a25b436cafb9173f6c0',
              'title': newsType,
              'page': 1,
              'needContent':0,//是否需要返回正文，1为需要，其他为不需要
              'maxResult':20//每页返回记录数，值在20-100之间。
          }

        })
        .done(function(data) {
            console.log(data.showapi_res_body.pagebean.contentlist);
            var data = data.showapi_res_body.pagebean;
            //var imagesurl = data.showapi_res_body.pagebean.
            _this.renderTemp(data);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    },

    /**
     * 根据数据列表渲染模板
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    renderTemp:function(data){
        //temp变量获取页面上的模板内容
        var temp = $("#tmpList2").html();
        var partials = {imageurls:"{{#imageurls}}<img src={{url}}>{{/imageurls}}"}
        var htmlStr = Mustache.render(temp, data,partials);
        $(".main-new").html(htmlStr);
    }
}


$(document).ready(function($) {
    
    Page.init();
    
});