"use client"

export default function WorkflowControls({save,load}:any){

  return(
    <div style={{
      position:"absolute",
      top:20,
      left:"50%",
      transform:"translateX(-50%)",
      display:"flex",
      gap:10
    }}>

      <button onClick={save}>Save</button>
      <button onClick={load}>Load</button>

    </div>
  )
}