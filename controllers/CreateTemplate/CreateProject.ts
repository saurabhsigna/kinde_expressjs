const fs = require("fs-extra");
import * as path from "path";
import {Request,Response} from "express"
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
// const supabase = createClient(
//   process.env.DATABASE_URL,
//   process.env.DATABASE_KEY
// );

interface ReqBody {
  projectType:string,
  apiName:string,
  projectId:string
}

async function CreateProject(req: Request, res: Response) {
  const { projectType, apiName, projectId }:ReqBody = req.body;

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

    // Create the route.js file
    await fs.writeFile(path.join(mainFolder, "route.js"), "");
    await fs.writeFile(path.join(mainFolder, "route.template.json"), "");
    return "generated";
  } catch (error) {
    console.error(error);
    return "some error";
  }
}
