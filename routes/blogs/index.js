/**
 * Created by DFH on 14-1-22.
 */

module.exports= function(app){

    app.get('/blogs',function(req,res){
         res.render('blogs/index',{ title: 'Blogs' })
    })

    app.get('/blogs/admin',function(req,res){
         res.render('blogs/admin',{ title: 'Blogs' })
    })
    app.get('/blogs/article',function(req,res){
         res.render('blogs/article',{ title: 'Blogs' })
    })
    app.get('/blogs/login',function(req,res){
         res.render('blogs/login',{ title: 'Blogs' })
    })




}
