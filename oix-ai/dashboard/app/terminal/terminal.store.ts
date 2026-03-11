import {create} from 'zustand'

export const useterminalStore=create((set)=>({
items:[],
setItems:(items:any)=>set({items})
}))
