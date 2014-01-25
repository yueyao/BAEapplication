/**
 * Created by DFH on 14-1-22.
 */

module.exports= function(app){

    app.get('/works',function(req,res){
         res.render('work/index',{ title: 'work' })
    })
}
