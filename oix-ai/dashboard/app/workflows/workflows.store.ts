import {create} from 'zustand'

export const useworkflowsStore=create((set)=>({
items:[],
setItems:(items:any)=>set({items})
}))
