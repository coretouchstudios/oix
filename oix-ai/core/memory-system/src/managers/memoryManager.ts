import { ShortTermMemory } from "../stores/shortTermMemory"
import { LongTermMemory } from "../stores/longTermMemory"
import { VectorMemory } from "../stores/vectorMemory"
import { MemoryItem } from "../types/memoryTypes"

export class MemoryManager {

  shortTerm = new ShortTermMemory()

  longTerm = new LongTermMemory()

  vector = new VectorMemory()

  remember(content: string) {

    const item: MemoryItem = {

      id: Date.now().toString(),

      content,

      createdAt: Date.now()

    }

    this.shortTerm.add(item)

    this.longTerm.save(item)

  }

}
