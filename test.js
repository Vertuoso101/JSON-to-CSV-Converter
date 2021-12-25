const express = require("express");
const app = express();
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const converter = require('json-2-csv');
const fs =  require('fs');

//connecting to Mongodb
const connectDB = async () => {
    try {
        await mongoose.connect('url of my data base', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Conected")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
  };
  connectDB();
//accessing the data base
const db = mongojs('my data base name',[]);
//preparing an array of all the existing collection in the database
db.listCollections((err, res)=>{
    if(err){
        console.log(err);
    }
    else {
        for(let k=0;k<res.length;k++){
            //itteratiing through the array to get each individuel collection ready
            db.collection(res[k].name).find({}, (err, doc)=>{
                if(err){
                    console.log(err);
                }
                else {
                    let test = [];
                    for(let i=0;i<doc.length;i++){
                        delete doc[i]._id;
                        test.push(doc[i]);
                    }
                  converter.json2csv(test, (err, csv)=>{
                      
                      if(err){
                          console.log(err);
                      }
                      else {
                          //converting each collection into a csv file
                        fs.writeFileSync(`${res[k].name}.csv`, csv);
                        console.log(`The collection ${res[k].name} was converted successfully to CSV format!`);
                      }
                  })
                  
                    
                }
            
            });
            
        }
    }
})

   
