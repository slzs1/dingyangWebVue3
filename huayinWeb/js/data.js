jQuery(document).ready(function () {
    var type = getUrlParam("type")
    if (type == "report" || type =="news" || type == "product") {
        $(".our").toggleClass("none")
        var params = {
            type: type,
            id: getUrlParam("id")
        }
        var url = '/api/huayin/article'
        $.ajax({
            type: 'get',
            data: {
                type: type
            },
            url: '/api/huayin/article',
            dataType: 'json',
            success:function(json){
                result = json.result
                var data = {result: []}
                for(var i=0, len=result.length; i<len; i++){
                    result[i].a = "<a href='page.html?type=" + type + "&&id=" + result[i].id + "'>" + result[i].title + "</a>"
                    data.result.push(result[i])
                }
                var tplist = template('tplist', data);
                $('#list').html(tplist);
            }
        })
    } else {
        $(".report").toggleClass("none")
        var params = {
            type: type
        }
        var url = '/api/huayin/other'
    }
    getDatabyId(params)
    function getDatabyId(params) {
        $.ajax({
            type: 'get',
            url: url,
            data: params,
            dataType: 'json',
            success: function (res) {
                if(res.result[0].type=="news"){
                    res.result[0].typeTitle = "新闻中心"
                }
                if(res.result[0].type=="report"){
                    res.result[0].typeTitle = "基金报告"
                }
                if(res.result[0].type=="product"){
                    res.result[0].typeTitle = "旗下产品"
                }
                var html = template('tmplt', res);
                $('#article').html(html);
            }
        })
    }
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null){
            return unescape(r[2]);}
        return null; //返回参数值
    }
})