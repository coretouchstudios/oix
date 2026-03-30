import "dotenv/config";
import { saveMemory, searchMemory } from "./memory.js";

await saveMemory("My name is John", "User name stored");

const results = await searchMemory("What is my name?");
console.log(results);