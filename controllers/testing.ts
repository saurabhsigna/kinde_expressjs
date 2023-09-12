import {Request,Response} from "express"
import supabase from "@configs/SupabaseConfig"
export default async function App(req:Request,res:Response){

console.log("inside testing")
    try {
        
    const {id} = req.body
    let { data, error } = await supabase
    .from('user')
    .select('*')
       console.log(data);
   
       console.log(error)
       res.send(data)
    } catch (error:any) {
        res.status(500).send(error.message)
    }

}