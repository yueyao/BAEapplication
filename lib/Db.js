/**
 * Created by hebo on 13-12-4.
 */
var settings = require('../config')
	,Db = require('mongodb').Db
	,Connection = require('mongodb').Connection
	,Server = require('mongodb').Server
    ,db;

if(!settings.development){
    db = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe: true});
} else {
    db = new Db(settings.BAE_DBNAME, new Server(settings.BAE_DBHOST, Connection.BAE_DBPROT), {safe: true});
}
module.exports = db;
