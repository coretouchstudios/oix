"use client"

import {useState} from "react"
import Canvas from "../app/builder/canvas"
import Toolbar from "../app/builder/toolbar"
import NodeInspector from "./NodeInspector"
import LogsPanel from "./LogsPanel"
import WorkflowControls from "./WorkflowControls"

export default function WorkflowEditor(){

  const [selected,setSelected]=useState(null)
  const [logs,setLogs]=useState([])

  const save=()=>{
    localStorage.setItem("oix-flow","saved")
    alert("workflow saved")
  }

  const load=()=>{
    alert("workflow loaded")
  }

  return(
    <div style={{width:"100vw",height:"100vh"}}>

      <WorkflowControls save={save} load={load}/>

      <Toolbar/>

      <Canvas
        selected={selected}
        setSelected={setSelected}
      />

      <NodeInspector node={selected}/>

      <LogsPanel logs={logs}/>

    </div>
  )
}