const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const AllMatcgObj = require("./allmatches");
const url = ("https://www.espncricinfo.com/series/ipl-2020-21-1210595");
console.log("Before");
const iplPath = path.join(__dirname,"ipl");
dirCreater(iplPath);
request(url,cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        // console.log(html);
        extractLink(html);
    } 
}
function extractLink(html){
   let $ = cheerio.load(html);
   let anchrElem = $("a[data-hover='View All Results']");
   let link = anchrElem.attr("href");
//    console.log(link);
    let fullLink = "https://www.espncricinfo.com"+link;

    // console.log(fullLink);
   AllMatcgObj.gAlmatches(fullLink);
}

function dirCreater(filePath){
    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath);
    }
}

