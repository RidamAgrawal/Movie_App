//not needed now (useless)
const fs = require("fs");
const { parse } = require("csv-parse");

var data=[];

fs.createReadStream("./db/movies.csv")
.pipe(
    parse({
    delimiter: ",",
    columns: true,
    ltrim: true,
    })
)
.on("data", function(row) {
    data.push(row);
})
.on("error", function(error) {
    console.log(error.message);
})
.on("end", function() {
    // console.log("parsed csv data:");
    // console.log(data);
    // data=data.map((i)=>{
    //     i._id=uuid();
    //     return i;
    // });
    for(let i=197;i<203;i++){
        console.log(data[i],",");
    }
});


// export var data;