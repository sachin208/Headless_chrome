const express = require('express');
const app = express();
var db_url = "mongodb://127.0.0.1:27017/embibe_data";
var MongoClient=require('mongodb').MongoClient;

(async()=>{
	let db=await MongoClient.connect(db_url);
    var dbo=db.db("embibe_data");
    var link="https://www.embibe.com/questions/jee-questions"
    var v="/embibe_data/"+link;
    app.get('/', async(req, res) => {
    	dbo.collection('link_data').findOne({'url':link},function(err,result){
    		if(err)throw err; 
    		res.send(result.data);
    	});
    });
})();
app.listen(3000, () => console.log('Gator app listening on port 3000!'));