const express = require("express");
const app = express();

const mongoose = require('mongoose');
const mongojs = require('mongojs');
const converter = require('json-2-csv');
const fs =  require('fs');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {
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
  
const db = mongojs('test',[]);
let test = [];
db.collection('Sun Aug 15 2021 to Mon Aug 16 2021').find({}, (err, doc)=>{
    if(err){
        console.log(err);
    }
    else {
        
      console.log(doc);
      converter.json2csv(doc, (err, csv)=>{
          if(err){
              console.log(err);
          }
          else {
            fs.writeFileSync('converter.csv', csv);
            console.log('Conversion to CSV is complited!');
          }
      })
      
        
    }

});

   
    


