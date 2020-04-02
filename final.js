const readline=require('readline');
const fs=require('fs');
var db_url = "mongodb://127.0.0.1:27017/embibe_data"
var MongoClient = require('mongodb').MongoClient;
const puppeteer=require('puppeteer');
const readInterface = readline.createInterface({
    input: fs.createReadStream('/home/embibe/Desktop/Headless_chrome/links.txt'),
    console: true
});
var data=[];
var count=1;
readInterface.on('line', function(line) {
  var obj={id:count,link:line};
  data.push(obj);
  count++;
});
readInterface.on('close', function(){
  (async()=>{
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    let db=await MongoClient.connect(db_url);
    var dbo=db.db("embibe_data");
    var keys = Object.keys(data);
    for(var i in keys){
      await page.goto(data[i].link);
      var HTML=await page.content()
      console.log(HTML);
      var myobj={url:data[i].link,data:HTML};
      dbo.collection("link_data").insertOne(myobj,function(err,res){
        if(err)throw err;
        console.log("docoment inserted");
      });
      console.log(data[i].id);
    }
    db.close();
    browser.close();
  })();
})
