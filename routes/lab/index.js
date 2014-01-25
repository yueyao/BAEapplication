/**
 * Created by DFH on 14-1-22.
 */
var testMongo = require('../../lib/mongo.js');

module.exports = function(app){

    app.get('/lab',function(req,res){
        res.render('lab/index',{title:'LAB'})
    })
    /**
     * mongo test
     */
    app.get('/lab/mongo', function(req, res) {
        testMongo(req, res);
    });

    app.get('/lab/mongoose',function(req,res){
        res.render('lab/index', { title: 'todo' });
    })

    app.get('/lab/todo',function(req,res){
        res.render('lab/todo', { title: 'todo' });
    });


}
