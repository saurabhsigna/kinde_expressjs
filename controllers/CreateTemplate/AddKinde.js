const fs = require("fs-extra");

async function updateConfigFile(req,res) {

  const {projectId} = req.body

  try {
    // Load your JSON configuration
    const config = require("./index.template.json");

    const kinde_importing_code = {
      type: "kinde",
      code: 'const { setupKinde, protectRoute, getUser } = require("@kinde-oss/kinde-node-express");',
    };

    const kinde_execution_code = {
      type: "kinde",
      code: `const config = {
  clientId: process.env.KINDE_ID,
  issuerBaseUrl: process.env.ISSUER_URL,
  siteUrl: process.env.SITE_URI,
  secret: process.env.KINDE_SECRET,
  redirectUrl: process.env.KINDE_REDIRECT_URI,
};
setupKinde(config, app);`,
    };

    // Check if the objects haven't been added yet before pushing them
    if (!config.importing_code.some((item) => item.type === "kinde")) {
      config.importing_code.push(kinde_importing_code);
    }

    if (!config.execution_code.some((item) => item.type === "kinde")) {
      config.execution_code.push(kinde_execution_code);
    }

    config.flagBoolean.kinde = true;

    // Convert the modified config object to a JSON string
    const jsonString = JSON.stringify(
      config,
      (_, value) =>
        typeof value === "string" ? value.replace(/\n/g, "\n") : value,
      2
    );

    // Write the JSON string to the file asynchronously
    await fs.writeFile("index.template.json", jsonString);

    console.log("Updated index.template.json with the new content.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the asynchronous function
updateConfigFile();
