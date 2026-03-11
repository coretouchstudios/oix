import {create} from 'zustand'

export const useaiStore=create((set)=>({
items:[],
setItems:(items:any)=>set({items})
}))
