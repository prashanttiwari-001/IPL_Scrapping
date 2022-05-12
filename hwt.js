const request = require("request");
const cheerio = require("cheerio");
const url = ("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard");
console.log("Before");
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        // console.log(html);
        extractHtml(html);
    }
}
function extractHtml(html){
    let $ = cheerio.load(html);
    let teamsArr = $(".match-info.match-info-MATCH .team");
    let wTeamName;
    for(let i=0; i<teamsArr.length; i++){
        let hasClass = $(teamsArr[i]).hasClass("team-gray");
        if(hasClass == false){
            let teamNameElem = $(teamsArr[i]).find(".name");
            //console.log(teamNameElem.text());
            wTeamName = teamNameElem.text().trim();
        }
    }
    let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    //let htmlStr = "";
    for(let i=0; i<inningsArr.length; i++){
        // let cHtml = $(inningsArr[i]).html();
        // htmlStr += cHtml;

        // team name
        let teamNameElem = $(inningsArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        //console.log(teamName);
        let hwtName ="";
        let hwt = 0;

        if(wTeamName == teamName){
            //console.log(teamName);


           let tableElem = $(inningsArr[i]).find(".table.bowler");
            let allBowlers = $(tableElem).find("tr");
            for(let j=0; j<allBowlers.length; j++){
                let allColsOfPlayer = $(allBowlers[j]).find("td");
                let playerName = $(allColsOfPlayer[0]).text();
                let wickets = $(allColsOfPlayer[4]).text();
                if(wickets >= hwt){
                    hwt = wickets;
                    hwtName = playerName;
                }
                
            }
            // console.log()
            console.log(`Winning Team ${wTeamName} highest wicket Taker playerName: ${hwtName} wickets: ${hwt}`)
        }
    }
    //console.log(htmlStr);
}


