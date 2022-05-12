let fs = require("fs");
let xlsx = require("xlsx"); 
// let buffer = fs.readFileSync("./example.json");
// console.log(buffer);
// console.log("`````````````````");
// let data = JSON.parse(buffer);
let data = require("./example.json");
//  console.log(data);
// data.push({
//     "Name":"Himanshu",
//     "Last Name":"Tiwari",
//     "Age":23,
//     "isAvengers":false,
//     "Friends":[
//         "Kaushik",
//         "Uttam",
//         "Raman"
//     ],
//     "Address":{
//         "State":"UttarPradesh",
//         "city":"Noida"
//     }


// });
// let stringData = JSON.stringify(data);
// fs.writeFileSync("example.json",stringData);

// wb-> filePath, ws->name, json data
// // new worksheet
function exelWriter(filePath,json,sheetName){

    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB,newWS, sheetName);
    xlsx.writeFile(newWB, filePath);
}
// // json data -> exel format convert
// //newwb , ws, sheet name
// //file path

// Read
// workbook get
function exelReader(filePath,sheetName){
    if(fs.existsSync(filePath)==false){
        return[];
    }
    let wb = xlsx.readFile(filePath);
    let exelData = wb.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(exelData);
    return ans;

}
//sheet
//sheet data get

