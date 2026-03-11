import fs from "fs"

export class FileUtil {

 static read(path:string){
  return fs.readFileSync(path,"utf8")
 }

 static write(path:string,data:string){
  fs.writeFileSync(path,data)
 }

}
