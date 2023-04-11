const path = require("path");
const db = require('../models');
const Image = db.images;

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

const Updatehome = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/indexUpdate.html`));
};

const checkRoutes = async(req, res) => {
  const images = await Image.findAll({attributes:['id','fileName','folderName','name','data','type']
});
const imagesFolder = await Image.findAll({attributes:['folderName']
                ,group:['folderName']
});

  images.map(image=>{
    //console.log(image.type)
    if(image.type === 'text/plain' || image.type === 'text/html'){
      //console.log(image.data.toString())
      image.data = image.data.toString()
    }
  })
  try{
    res.status(200).json({error:false,images:images,folders:imagesFolder});
  }
  catch(err){
    res.status(400).json({err:true,msg:err})
  }
};

const deleteImage = async(req,res)=>{
  //console.log(req.params.id)
await Image.destroy({
  where:{
    id: req.body.id
  }
}).then(result=>{
  res.json({result:result})
}).catch(err =>{
  res.status(400).json({})
})
}

module.exports = {
  getHome: home,
  checkRoutes: checkRoutes,
  Updatehome: Updatehome,
  deleteImage:deleteImage,
};
