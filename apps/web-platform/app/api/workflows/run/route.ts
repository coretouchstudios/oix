
import { NextResponse } from "next/server"

export async function POST(req:Request){
 const body = await req.json()
 return NextResponse.json({
  status:"workflow executed",
  workflow:body.workflow || "demo-workflow",
  nodesExecuted:5
 })
}

