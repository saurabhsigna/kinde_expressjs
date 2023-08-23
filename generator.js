const fs = require('fs-extra')

let configurations = {
    auth:"kinde"
}




fs.mkdir(directoryPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating directory:', err);
    return;
  }

  console.log('Directory created successfully.');
});
