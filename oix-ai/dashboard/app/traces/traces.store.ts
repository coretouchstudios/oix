import {create} from 'zustand'

export const usetracesStore=create((set)=>({
items:[],
setItems:(items:any)=>set({items})
}))
