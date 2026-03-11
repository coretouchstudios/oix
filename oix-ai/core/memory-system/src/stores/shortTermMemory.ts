import { MemoryItem } from "../types/memoryTypes"

export class ShortTermMemory {

  private memory: MemoryItem[] = []

  add(item: MemoryItem) {
    this.memory.push(item)
  }

  getAll(): MemoryItem[] {
    return this.memory
  }

  clear() {
    this.memory = []
  }

}
