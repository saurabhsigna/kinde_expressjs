const fs = require("fs-extra");
import * as config from "@contents/json/index.template.json";
// Load your JSON configuration

// Generate the importing code
const flagBoolean: Record<string, boolean> = config.flagBoolean;


const importingCode = config.importing_code
  .filter((item) => {
    if (typeof item === "string") {
      return true; // Keep string items
    } else {
  if (flagBoolean[item.type]) {
        return true;
      } else {
        return false;
      }
    }
  })
  .map((item) => (typeof item === "object" ? item.code : item))
  .join("\n");

// Generate the execution code
const executionCode = config.execution_code
  .filter((item) => {
    if (typeof item === "string") {
      return true; // Keep string items
    } else {
      // Keep object items only if the flag is true
if (flagBoolean[item.type]) {
        return true;
      } else {
        return false;
      }
    }
  })
  .map((item) => (typeof item === "object" ? item.code : item))
  .join("\n");

// ... Generate other sections as needed ...

// Combine the generated code sections
const fullCode = `
${importingCode}


${executionCode}

${config.routing_code.join("\n")}

${config.app_listen_code.join("\n")}
`;

// Write the combined code to a file
fs.writeFileSync("index.js", fullCode);

console.log("index.js file generated successfully.");
