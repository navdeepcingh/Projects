// Navdeep Singh 2269752149 navdeepcingh@gmail.com
const https= require("https");
const fs = require("fs");
const admZip = require('adm-zip');
const path = require('path');

const PORT 8080;
const HOST "0.0.0.0";

// Downloading unzipping & Sorting

function download(url, callback){
    const fileName = path.baseName(url);
    const req = https.get(url, function(res) {
        const fileStream = fs.createWriteStream(fileName);
        res.pipe(fileStream);
        fileStream.on("error",function(err){
            console.log("Getting Error");
            console.log(err);

        } );

        //Unzipping

        fileStream.on("close",function(){
            console.log('finished downloading');
            var zip = new admZip(fileName);
            console.log('start unzip');
            zip.extractEntryTo(extractEntryTo, outputDir, false, true);
            console.log('finished unzip');
           
            //Sorting as ISO speed is directly proprtional to size, i sorted the images acoording to sizes 

            const ABSPATH = path.dirname(process.mainfolder.filename);
            module.exports = {
                listDir: (path) => {
                    let files = fs.readdirSync( ABSPATH + path ); // You can also use the async method
                    let filesWithStats = [];
                    if( files.length > 1 ) {
                        let sorted = files.sort((a, b) => {
                        let s1 = fs.statSync(ABSPATH + path + a);
                        let s2 = fs.statSync(ABSPATH + path + b);
                        return s1.ctime < s2.ctime;
                    });
                    sorted.forEach(file => {
                        filesWithStats.push({
                            filename: file,
                            date: new Date(fs.statSync(ABSPATH + path + file).ctime),
                            path: path + file
                        });
                    });
                } else {
                    files.forEach(file => {
                        filesWithStats.push({
                            filename: file,
                            date: new Date(fs.statSync(ABSPATH + path + file).ctime),
                            path: path + file
                        });
                    });
                }
                return filesWithStats;
            }
            };
        


            
        });
        fileStream.on("finish",function(){
            fileStream.close();
            console.log("downloded");
        });
    });
    req.on("error",function(){
        console.log("Error");
        console.log(err);
    });
}
download("https://downloads.campbellcloud.io/assessment/202009/Photos_To_Review.zip");
