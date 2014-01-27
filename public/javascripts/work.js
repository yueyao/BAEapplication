/**
 * Created by DFH on 14-1-27.
 */
var model = avalon.define('works',function(vm){
    vm.simpArr =[
        {name: "华语电影市场APP", value: "works/IMG_0305.PNG",
            href:"http://42.96.188.233:8028/index.html",title:"华语电影市场APP",
            desc:'面向海外的电影资讯APP'},
        {name: "亿利资源集团APP", value: "works/IMG_0310.PNG",
            href:"http://elion.applomo.com",title:"亿利资源集团APP品牌项目",
            desc:'亿利资源企业是沙漠中成长起来的半公益化企业，该项目是在集团25周年推出的新闻资讯类APP，包含：走进亿利，新闻中心，视频中心，党建专栏及社会公益。'},
        {name: "国家电力服务网APP", value: "works/IMG_0308.PNG",
            href:"http://dlfw.applomo.com",title:"国家电力服务网APP",
            desc:'针对国家电力服务网的新闻消息，论坛等功能进行制作，使用户在移动端能便捷浏览！'},
        {name: "华康普美医药产品APP", value: "works/IMG_0306.PNG",
            href:"http://42.96.188.233:8024/index.html",title:"华康普美医药产品APP",
            desc:'针对华康普美科技集团的医疗产品而研发的移动端APP，旨在帮助客户推广产品及相关资讯。'},
        {name: "汇通腾达财务管理APP", value: "works/IMG_0311.PNG",
            href:"http://httd.applomo.com",title:"汇通腾达财务管理APP",
            desc:'财务管理类APP。'},
        {name: "DIY饭订餐管理APP", value: "works/IMG_0312.PNG",
            href:"http://diyfan.applomo.com",title:"DIY饭订餐管理APP",
            desc:'在线订餐APP。'}
    ];
    vm.activeElTitle =  vm.simpArr[0].title;
    vm.activeElDesc =  vm.simpArr[0].desc;
    vm.activeElHref =  vm.simpArr[0].href;
    vm.activeElsrc =  vm.simpArr[0].value;
    vm.show = function(n){
        vm.activeElTitle =  vm.simpArr[n].title;
        vm.activeElDesc =  vm.simpArr[n].desc;
        vm.activeElHref =  vm.simpArr[n].href;
        vm.activeElsrc =  vm.simpArr[n].value;
    }
})
