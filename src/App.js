import React, { useState } from "react";
import { WorkArea } from "./Components/WorkArea";
import { DragDropContext } from "react-beautiful-dnd";
import { MOVES } from "./constants";

export default function App() {
  const [moves, setMoves] = useState(MOVES);
  const [actions, setActions] = useState([]);
  const [actions2, setActions2] = useState([]);
  const [customMove, setCustomMove] = useState([
    { id: "move right", value: 0 },
    { id: "move left", value: 0 },
    { id: "Move Down", value: 0 },
    { id: "Move Up", value: 0 },
    { id: "turn", value: 0 },
  ]);
  const [customMove2, setCustomMove2] = useState([
    { id: "move right", value: 0 },
    { id: "move left", value: 0 },
    { id: "Move Down", value: 0 },
    { id: "Move Up", value: 0 },
    { id: "turn", value: 0 },
  ]);

  const onHandleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Make a shallow copy of state arrays to maintain immutability
    const active = Array.from(moves);
    const complete = Array.from(actions);
    const complete2 = Array.from(actions2);

    // Get the dragged item
    const add = active[source.index];

    // Logic for handling the drop destination
    if (destination.droppableId === "MovesActions") {
      complete.push(add);  // Add to actions
    } else {
      complete2.push(add);  // Add to actions2
    }

    // Update state with new arrays
    setActions(complete);
    setActions2(complete2);
    setMoves(active);
  };

  return (
    <div className="bg-blue-100 font-sans text-center">
      <DragDropContext onDragEnd={onHandleDragEnd}>
        <WorkArea
          moves={moves}
          setMoves={setMoves}
          actions={actions}
          actions2={actions2}
          setActions2={setActions2}
          setActions={setActions}
          customMove={customMove}
          setCustomMove={setCustomMove}
          customMove2={customMove2}
          setCustomMove2={setCustomMove2}
        />
      </DragDropContext>
    </div>
  );
}
