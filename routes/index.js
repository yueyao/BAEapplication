
/*
 * GET home page.
 */


var api = require('./api')
    ,blogs = require('./blogs')
    ,im = require('./im')
    ,lab = require('./lab')
    ,works = require('./work');


module.exports = function(app){

    app.get('/',function(req,res){
        /*res.render('index', { title: 'Express' });*/
        res.render('comesoon', { title: 'iyueyao' });
    });
    /**
     * API 接口
     */
    api(app);

    /**
     * lab 测试
     */
    lab(app);

    /**
     * blogs 博客
     */
    blogs(app);

    /**
     * im
     */
    im(app);

    /**
     * work
     */
    works(app);


    app.use(function (req, res) {
        res.render("404");
    });
};