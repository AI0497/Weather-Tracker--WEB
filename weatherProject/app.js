const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req,res){
  const apiKey="667ad2069f3f267d8550325703e74282"
  const query =req.body.cityName
  const unit="metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+ query +"&unit=" + unit

  https.get(url,function(response){
    console.log(res.statusCode);

    response.on("data",function(data){
      const weatherData= JSON.parse(data)

      const icon = weatherData.weather[0].icon

      const iconURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

      const temp=weatherData.main.temp

      const weatherDescription= weatherData.weather[0].description

      res.write("<h1>Temperature of "+ query + "is " + temp + "degree celcius </h1> <br>");

      res.write("<p>weather is expected to have " + "<h2>" + weatherDescription + "</h2></p>");
      res.write("<img src="+iconURL +">")
      res.send();
    })
  })
})



app.listen(3000,function(){
  console.log("server is running on port 3000");
});
