import { chat } from "./ai.js";

const res1 = await chat("My name is John");
console.log(res1);

const res2 = await chat("What is my name?");
console.log(res2);