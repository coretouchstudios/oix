import {useState} from 'react'

export default function useSystemStatus(){

const [status,setStatus]=useState('online')

return {status,setStatus}

}
