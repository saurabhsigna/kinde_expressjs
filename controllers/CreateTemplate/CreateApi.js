const fs = require("fs").promises;
const path = require("path");
const { GetContent } = require("../../contents/api/requests/GET");
async function CreateApi() {
  try {
    // Create the main folder
    const mainFolder = path.join(__dirname, "../../outputs", "MyTemplate");
    try {
      await fs.access(mainFolder);
    } catch (err) {
      await fs.mkdir(mainFolder);
    }

    // Create the requests folder and files
    const requestsFolder = path.join(mainFolder, "requests");
    try {
      await fs.access(requestsFolder);
    } catch (err) {
      await fs.mkdir(requestsFolder);
    }
    console.log(GetContent);
    await Promise.all([
      fs.writeFile(path.join(requestsFolder, "GET.js"), GetContent, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully.");
        }
      }),
      fs.writeFile(path.join(requestsFolder, "POST.js"), GetContent, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully.");
        }
      }),  fs.writeFile(path.join(requestsFolder, "DELETE.js"), GetContent, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully.");
        }
      }),
      fs.writeFile(path.join(requestsFolder, "PUT.js"), GetContent, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully.");
        }
      })
    ]);

    // Create the route.js file
    await fs.writeFile(path.join(mainFolder, "route.js"), "");
    return "generated";
  } catch (error) {
    console.error(error);
    return "some error";
  }
}
CreateApi();
