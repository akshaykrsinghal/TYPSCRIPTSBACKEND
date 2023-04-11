const fs = require("fs");

const db = require("../models");
const Image = db.images;
const path = require('path');

const uploadFiles = async (req, res) => {
  try {
    //console.log(req.body)
    if(req.body.fileName === '' || req.body.fileName === null || req.body.fileName === undefined || req.body.folderName === null || req.body.folderName === undefined || req.body.folderName === ''){
      return res.json({error:true,msg:"fileName or folderName feild invalid."})
    }
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      fileName: req.body.fileName,
      folderName: req.body.folderName,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then(async(image) => {
      var fs = require('fs');
        await fs.writeFile('fileName.png', image.data, 'binary', function (err) {
            if (err) {
                res.json({})
                console.log("There was an error writing the image")
              }
              else {
                return res.sendFile(path.join(__dirname,'../../fileName.png'));
                console.log("The sheel file was written")
            }
        });

    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

const updateUploadFiles = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    Image.findOne({
      where:{
        id:req.body.id
      }
    }).then(res1=>{
      let result = {
        type: req.file.mimetype,
        name: req.file.originalname,
        fileName: res1.fileName,
        folderName: res1.folderName,
      }
      result.data = fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      );
      //console.log(req.file.filename)
      Image.update(result,{
        where:{
          id:req.body.id
        }
      })
    }).then(async(image) => {
      res.json({})
   });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,updateUploadFiles
};
