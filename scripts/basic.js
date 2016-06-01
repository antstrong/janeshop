/**
 * Created by 51322 on 2016/5/31.
 */
function switchSkin(skinName){
    $("#"+skinName).addClass("selected").siblings().removeClass("selected");
    $("#cssfile").attr("href","styles/skin/" + skinName + ".css");
    $.cookie("MycssSkin", skinName ,{path: '/',expires: 10});
}

function showImg(index){
    var $rollobj = $("#jnImageroll");
    var $rollist = $rollobj.find("div a");
    var newhref = $rollist.eq(index).attr("href");
    $("#JS_imgWrap").attr("href",newhref)
                    .find("img").eq(index).stop(true,true).fadeIn()
                    .siblings().fadeOut();
    $rollist.removeClass("chos").css("opacity","0.7")
            .eq(index).addClass("chos").css("opacity","1");
}

function showBrandList(index){
    var $scrollobj = $("#jnBrandList");
    var rollwidth = $scrollobj.find("li").outerWidth();
    rollwidth = rollwidth * 4;//一个版面的宽度
    $scrollobj.stop(true,false).animate({left: -rollwidth*index},1000);
}
$(function(){
    //搜索框
    $("#inputSearch").focus(function(){
        $(this).addClass("focus");
        if($(this).val() == this.defaultValue){
            $(this).val("");
        }
    }).blur(function(){
        $(this).removeClass("focus");
        if($(this).val() == ""){
            $(this).val(this.defaultValue)
        }
    }).keyup(function(e){
        if(e.which == 13){//监听回车事件
            alert("回车提交表单！")
        }
    });
    //换肤
    var $li = $("#skin li");
    $li.click(function () {
       switchSkin(this.id);
    });
    var cookie_skin = $.cookie("MycssSkin");
    //alert(cookie_skin);
    if(cookie_skin){
        switchSkin(cookie_skin);
    }
    //导航
    $("#nav li").hover(function () {
        if(!$(this).is(":animated")){
            $(this).find(".jnNav").show();
        }
    }, function () {
        if(!$(this).is(":animated")){
            $(this).find(".jnNav").hide();
        }
    });

    //热门商品
    $(".promoted").append("<span class='hot'></span>");
    //广告效果
    var $imgrolls = $("#jnImageroll div a");
    $imgrolls.css("opacity","0.7");
    var len = $imgrolls.length;
    var index = 0;
    var adTimer = null;
    $imgrolls.mouseover(function () {
        index = $imgrolls.index(this);
        showImg(index);
    }).eq(0).mouseover();
    //滑入 停止动画，滑出开始动画
    $("#jnImageroll").hover(function(){
       if(adTimer){
           clearInterval(adTimer);
       }
    }, function () {
        adTimer = setInterval(function(){
                showImg(index);
                index++;
                if(index == len){
                    index = 0;
                }
        },5000);
    }).trigger("mouseout");//模拟鼠标事件mouseout();

    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function (e) {
       this.mytitle = this.title;
       this.title = "";
       var tooltip = $("<div id='tooltip'>" + this.mytitle + "</div>");
       $("body").append(tooltip);
       $("#tooltip").css({
           "top": (e.pageY + y) + "px",
           "left": (e.pageX + x) + "px"
       }).show("fast");
    }).mouseout(function(){
        this.title = this.mytitle;
        $("#tooltip").remove();
    }).mousemove(function (e) {//提示框跟随鼠标移动
        $("#tooltip").css({
           "top": (e.pageY + y) + "px",
            "left": (e.pageX + x) + "px"
        });
    });

    $("#jnBrandTab li a").click(function () {
        $(this).parent().addClass("chos")
            .siblings().removeClass("chos");
        var idx = $("#jnBrandTab li a").index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();

})
