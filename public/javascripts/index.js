/**
 * Created by  DFH on 14-1-10.
 */

$(function(){

    function getShotTime(){
        $.get("/api/showTime",function(data){  console.log(data)
            var adata = data[0];
            var $st= $('.showTime');
            $st.html("<p class='dt'>"+adata.showTime+"  <small><a target='_blank'href='http://www.sodao.com/'>美女时钟By搜道网</a> </small></p><img width=300  alt='美女时钟,搜道网'src="+adata.path+" /><p>"+adata.nickName+" , 年龄:"+adata.age+" , 拍摄地:"+adata.takeCity+"</p>")
        });
    }
    function getTime(){
        var date = new Date();
        var second = date.getSeconds();
        if(second==0){
            getShotTime();
        }
    }
    getShotTime();
    setInterval(function(){
        getTime();
    },1000);



    $.get('/api/getIpInfo',function(data){
        $('.ip').html("您的IP："+data.ip+','+data.isp);
    })

    $.get('/api/weather/today',function(data){
        var date = new Date();
        var hour = date.getHours();
        var info = hour>data.weatherinfo.fchh ? "今天夜间":"今天白天";
        $('.weather').html(data.weatherinfo.city+" : "+info + data.weatherinfo.temp1);
    })


});
