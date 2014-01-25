/**
 * Created by DFH on 14-1-22.
 */

module.exports = function(app){

    app.get('/im',function(req,res){
        res.render('im/index',{title:'im'})
    })
}
