import crypto from "crypto"

export function encrypt(text:string){

 const cipher = crypto.createCipher("aes-256-ctr","oix-key")

 let encrypted = cipher.update(text,"utf8","hex")

 encrypted += cipher.final("hex")

 return encrypted

}

export function decrypt(text:string){

 const decipher = crypto.createDecipher("aes-256-ctr","oix-key")

 let decrypted = decipher.update(text,"hex","utf8")

 decrypted += decipher.final("utf8")

 return decrypted

}
