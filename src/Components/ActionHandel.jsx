import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css'; // Keep your existing styles if needed
import { Draggable } from "react-beautiful-dnd";

export const ActionHandel = (props) => {
  const { move, moves, setMoves, index, disableDelete = false, refresh, customMove = [], setCustomMove } = props;
  console.log("customMove in ActionHandel: ", customMove); // Debugging line

  // State for individual move's input value
  const [ivalue, setIvalue] = useState(() => {
    const existingMove = customMove.find(item => item.id === move.todo);
    return existingMove ? existingMove.value : 0;
  });

  // Delete handler for moves
  const handleDelete = (idx) => {
    const updatedMoves = moves.filter((_, i) => i !== idx);
    setMoves(updatedMoves);
    refresh();
  };

  // Handler for changing the input value
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0; // Handle NaN cases
    const id = move.todo;

    // Update customMove state
    const updatedCustomMove = customMove
      .filter(item => item.id !== id) // Remove the item with the same id
      .concat({ id, value }); // Add the updated item

    setCustomMove(updatedCustomMove); // Update the parent component's state
    setIvalue(value); // Update the local state

    // Update moves state
    const updatedMoves = moves.map((m, i) => 
      i === index ? { ...m, value } : m // Update the move with the new value
    );
    setMoves(updatedMoves); // Update moves state
  };

  // Sync the ivalue with customMove whenever customMove or move.todo changes
  useEffect(() => {
    const existingMove = customMove.find(item => item.id === move.todo);
    if (existingMove) {
      setIvalue(existingMove.value);
    }
  }, [customMove, move.todo]);

  return (
    <div className="flex items-center justify-between ">
      {disableDelete ? (
        <Draggable key={move.id} draggableId={move.id.toString()} index={index}>
          {(provided) => (
            <div
              className="flex items-center w-full p-2  bg-blue-400 rounded-xl m-2"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <span className="moves__single--text text-base font-semibold text-gray-800">
                {move.todo}
              </span>
              {/* Conditional rendering based on move.todo */}
              {/* {move.todo !== "repeat" && move.todo !== "random position" && (
                <span className="input_val w-1/2 mr-2">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={ivalue}
                    onChange={handleChange}
                  />
                </span>
              )} */}
            </div>
          )}
        </Draggable>
      ) : (
        <div className="flex items-center w-full p-2  bg-blue-400 rounded-xl m-2">
          <span className="moves__single--text text-base font-semibold text-gray-800">
            {move.todo}
          </span>
          {/* Conditional rendering based on move.todo */}
          {move.todo !== "repeat" && move.todo !== "random position" && (
            <span className="input_val w-1/2 mr-2">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={ivalue}
                onChange={handleChange}
              />
            </span>
          )}
          <div>
            <span className="icon cursor-pointer hover:text-red-500" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionHandel;
