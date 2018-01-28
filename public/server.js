var express = require('express');
var cors = require('cors');
//var router = express.Router();
//var botdetail = require('./model/botdetails');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();



/*var schema = new Schema({
    user: [
        {
            sid: int,
			bid: int,
			intent:String,
			steps:int,	
            qst: String,
            fld_type: String,
			ans:String,
			is_active:int
        }
    ]

}, {
    collection: 'users'
});*/

//var Model = mongoose.model('Model', schema);
mongoose.connect('mongodb://<Pooja Sinha>:<Pooja@0309>@ds046867.mlab.com:46867/botuser_database');
mongoose.connection.on('connected', function(){console.log("mongo connected")});
mongoose.connection.on('error', function(){console.log("mongo not connected")});
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());
app.use('/api', router);


var port = process.env.API_PORT || 3000;

app.listen(port, function(){
    console.log("Running on port 3000")
})

//db config
