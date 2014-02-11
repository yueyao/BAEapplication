
/*
 * GET home page.
 */


var api = require('./api')
    ,blogs = require('./blogs')
    ,im = require('./im')
    ,lab = require('./lab')
    ,works = require('./work')
    ,until = require('../lib/until');


module.exports = function(app){

    app.get('/',function(req,res){
        /*res.render('index', { title: 'Express' });*/
        var $a=until.brows(req.headers['user-agent']);
        if($a.IE && $a.IEVersion<10){
            res.render('h5', { title: 'yueyao',brow:$a });
        } else {
            res.render('comesoon', { title: 'yueyao',brow:$a });
        }
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