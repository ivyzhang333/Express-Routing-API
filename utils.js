const fs = require("fs");

//create folder
const createFolder = folderName => {
  //check if folder exists
  if (!fs.existsSync(folderName)) {
    //crate folder
    fs.mkdirSync(folderName);
  }
};

const defaultPosts =
  '[{"id": "2020", "title": "HTML", "url":"http://someurl.com", "description": "The best"}]';

//create file
const createFile = file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, defaultPosts);
  }
};

module.exports = {
  createFolder,
  createFile,
};
