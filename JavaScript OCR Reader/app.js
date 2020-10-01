const express = require('express');
const app = express();
const fs = require('fs'); // to read and write files
const multer = require('multer');

const { TesseractWorker } = require('tesseract.js')
const worker = new TesseractWorker();

// create our storage where file will be storage
const storage = multer.diskStorage({
    destination: (req,file ,cb) => {
        cb(null, "./uploads")
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
});


const upload = multer({ storage: storage }).single('avatar');
app.use(upload)

// set your view engine to ejs
app.set('view engine', 'ejs');


//setup route
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/upload', (req,res) => {
    upload(req, res, err => {
      console.log("file" + JSON.stringify(req.file))
      fs.readFile(`./uploads/${req.file.originalname}`, (err,data) => {
          if(err){
            return console.log("This is your error" + err)
          } 
          worker
          .recognize(data, "eng", {tessjs_create_pdf:'1'})
          .progress(progress => {console.log(progress)})
          .then(result => {
              res.send(result.text);
          })
          .finally(() => worker.terminate())
      })
    })
})

// spin up your server
const PORT = 5000 || ProcessingInstruction.env.PORT;
app.listen(PORT, 
    () => 
    console.log(`App is listening on port ${PORT}`))