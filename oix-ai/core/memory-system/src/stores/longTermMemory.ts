import { MemoryItem } from "../types/memoryTypes"

export class LongTermMemory {

  private store: Map<string, MemoryItem> = new Map()

  save(item: MemoryItem) {
    this.store.set(item.id, item)
  }

  get(id: string): MemoryItem | undefined {
    return this.store.get(id)
  }

  getAll(): MemoryItem[] {
    return Array.from(this.store.values())
  }

}
