const fs = require("fs");

const express = require("express");
const router = express.Router();

let data = JSON.parse(fs.readFileSync("data.json"));
/* In the provided code snippet, the JSON file is being read and parsed into an object (`data`) using `JSON.parse(fs.readFileSync('data.json'))`. This is done to load the initial data from the JSON file into memory so that it can be accessed and manipulated by the API endpoints.
The reason for parsing the JSON file and storing it in memory is to avoid reading the file on every request. If the JSON file is read directly and sent as a response, it would result in reading the file from the disk for each request, which can be inefficient and slow down the API's performance, especially if the file is large or if there are frequent requests.
By parsing the JSON file and storing it in memory, the data is loaded only once when the server starts. Subsequent requests for the data can then be served directly from memory, which is much faster and more efficient.
Additionally, parsing the JSON file allows you to perform any necessary data transformations or manipulations before sending the response. For example, you can filter or sort the data based on certain criteria or modify the structure of the data before sending it back to the client.
Overall, parsing the JSON file and storing it in memory provides better performance and flexibility compared to reading the file directly for each request.  */

router.get("/", (req, res, next) => {
  res.status(200).json(data);
});

router.post("/", (req, res, next) => {
  data.push(req.body);
  console.log(req.body);
  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  });
  res.status(200).json(data);
});

router.put("/:title", (req, res, next) => {
  for (const manga of data) {
    if (manga.title === req.params.title) {
      manga.title = req.body.title;
      manga.author = req.body.author;
    }
  }

  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.json({ message: err.message });
    }
  });

  res.status(200).json(data);
});

    router.delete('/:title',(req,res,next)=>{
        const indexTodelete=data.findIndex(item=>item.title===req.params.title);
        data.splice(indexTodelete,1);
        fs.writeFile('data.json',JSON.stringify(data),
        (err)=>{
            return res.json({"message":err.message})
        }
        )
        res.status(200).json(data);


    })

module.exports = router;
