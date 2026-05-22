import { useI18n } from "../i18n";
import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "trigger",
    type: "input",
    position: { x: 250, y: 0 },
    data: { label: "Trigger" },
  },
  {
    id: "api",
    type: "default",
    position: { x: 250, y: 100 },
    data: { label: "API Call" },
  },
  {
    id: "result",
    type: "output",
    position: { x: 250, y: 200 },
    data: { label: "Set Variable" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "trigger", target: "api", animated: true },
  { id: "e2-3", source: "api", target: "result", animated: true },
];

const nodeTypes = {};

export function ActionFlowPanel() {
  const { t } = useI18n();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full" style={{ minHeight: 400 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
