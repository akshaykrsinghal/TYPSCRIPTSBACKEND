const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
const verifyToken = require("../config/verify");

let routes = (app) => {
  router.get("/", homeController.getHome);

  router.get("/update", homeController.Updatehome);

  
  router.get("/getFiles", homeController.checkRoutes);
  
  router.post("/upload" ,upload.single("file"), uploadController.uploadFiles);
  
  router.post("/Updateupload" ,upload.single("file"), uploadController.updateUploadFiles);
  
  router.post("/deleteImage", homeController.deleteImage);

  return app.use("/", router);
};

module.exports = routes;
