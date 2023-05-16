const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads');
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname);
    }
})


const upload = multer({storage: storage});


// file with different fields are uploaded from this api.
app.post('/fileuploads', upload.fields([{name:'firstfile',maxCount: 3},{name:'secondfile',maxCount: 4}]), (req,res,next) => {
    res.json(req.files);
})

//  multiple file with single field are uploaded from this api (but not more than 10 files).
app.post('/arrayoffile', upload.array('anyfiles', 10), (req,res,next) => {
    res.json(req.files);
})


app.listen(5000, () => {
    console.log("server is up and listen on port 5000");
})