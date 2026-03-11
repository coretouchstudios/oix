

import axios from "axios"

const api=axios.create({
baseURL:"http://localhost:7000"
})

export const createKey=()=>api.post("/v1/api-keys")

export const chat=(prompt:string,key:string)=>api.post("/v1/chat",
{prompt},
{headers:{"x-api-key":key}}
)

export const usage=(key:string)=>api.get("/v1/usage",
{headers:{"x-api-key":key}}
)

export default api


