import {create} from 'zustand'

export const useagentsStore=create((set)=>({
items:[],
setItems:(items:any)=>set({items})
}))
