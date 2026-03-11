'use client'

import { Handle, Position } from 'reactflow'

export default function PluginNode({ data }: any) {
  return (
    <div className="bg-white border rounded-xl p-3 shadow-md w-56">

      <div className="font-bold text-sm text-pink-600 mb-1">
        Plugin Node
      </div>

      <div className="text-xs text-gray-500">
        External plugin integration
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

    </div>
  )
}