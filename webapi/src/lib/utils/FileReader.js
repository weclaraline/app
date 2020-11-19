fs = require("fs");
 

module.exports.readFile = async function readFileAsync(filePath) {
  const fsPromises = require('fs').promises;
  const data = await fsPromises.readFile(filePath)
                     .catch((err) => console.error('Failed to read file', err));

  return  data.toString();
}

// module.exports.readFile = (filePath, callback) => {
//   fs.readFile(filePath, "utf8", function (err, data) {
//     if (err) {
//       callback(err);
//     }
//     callback(data);
//   });
// };
