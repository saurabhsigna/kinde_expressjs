const fs = require("fs").promises;
const path = require("path");
const RequestContent = require("../../contents/api/requests/Request");
import {z} from 'zod'
import supabase from '@configs/SupabaseConfig';
import {Request,Response} from "express"
const ReqBodySchema = z.object({
  apiRequests: z.array(
    z.enum(["GET", "POST", "PUT", "DELETE"])
  ),
  apiEndpoint: z.string().refine((value) => value.startsWith('/api/'), {
    message: 'apiEndpoint must start with "/api/"',
  }),
  projectId:z.string()
})

type ReqBodyType = z.infer<typeof ReqBodySchema>


async function CreateApi(req:Request, res:Response) {
  const { apiRequests, apiEndpoint,projectId}:ReqBodyType = req.body;


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

    const fileCreationTasks = apiRequests.map(async (requestType) => {
      const fileName = `${requestType}.js`;
      await fs.writeFile(path.join(requestsFolder, fileName), RequestContent(requestType), (err:any) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File written successfully.");
        }
      });
  
    });

    // Execute file creation tasks in parallel using Promise.all
    await Promise.all(fileCreationTasks);


    // Create the route.js file
    await fs.writeFile(path.join(mainFolder, "route.js"), "");
    await fs.writeFile(path.join(mainFolder, "route.template.json"), "");
    return "generated";
  } catch (error) {
    console.error(error);
    return "some error";
  }
}
