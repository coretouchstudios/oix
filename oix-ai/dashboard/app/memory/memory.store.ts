import {create} from 'zustand'

export const usememoryStore=create((set)=>({
items:[],
setItems:(items:any)=>set({items})
}))
