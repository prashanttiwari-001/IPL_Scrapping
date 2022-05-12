const request = require("request");
const cheerio = require("cheerio");
const scoreCardObj = require("./scorecard");
function getAllMatchesLink(url){
    console.log(url)
    request(url,function(err,response,html){
        // console.log(html);
        // console.log(err);
        if(err){
            console.log(err);
            // console.log("aa"); 
        }else{
            // console.log(html);
            extractAllLinks(html);
        }
    })
}
function extractAllLinks(html){
    let $ = cheerio.load(html);
   let scoreCardElem = $("a[data-hover='Scorecard']");
   for(let i=0; i<scoreCardElem.length; i++){
      let link = $(scoreCardElem[i]).attr("href");
          let fullLink ="https://www.espncricinfo.com"+link;
      console.log(fullLink);
      scoreCardObj.ps(fullLink);

   }
}
module.exports ={
    gAlmatches : getAllMatchesLink
}