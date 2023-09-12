import GET from "./GET"
import POST from "./POST"
import PUT from "./PUT"
import DELETE from "./DELETE"


enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export default function RequestContent(type:HttpMethod){

return type
}