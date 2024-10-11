import * as React from "react";
import { ActionHandel } from "./ActionHandel";
import { Droppable } from "react-beautiful-dnd";
import { Box, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Sprites } from "./Sprite";

import Draggable1 from "react-draggable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WARN_MSG_POS, WARN_MSG_SIZE } from "../constants";

// Import your sprite images
import CatSprite from "../Assets/images/cat2.svg";
import dog from "../Assets/images/dog.svg";

import { yellow } from "@mui/material/colors";

export const WorkArea = (props) => {
  const { moves, setMoves, actions, setActions, setActions2, actions2 ,customMove,setCustomMove,customMove2,setCustomMove2} = props;
  
  const ref = React.useRef();
  const ref2 = React.useRef();

  // Position and transformation variables
  let r = -100; // x position for sprite 1
  let t = 0; // y position for sprite 1
  let scale = 1;
  let angle = 0;

  let r2 = 200; // x position for sprite 2
  let t2 = 0; // y position for sprite 2
  let scale2 = 1;
  let angle2 = 0;

  const [displayAddIcon, setDisplayAddIcon] = React.useState(true);
  const [sprite, setSprite] = React.useState(CatSprite);
  const [sprite2, setSprite2] = React.useState(null);

  // Function to check for collision
  const checkCollision = () => {
    const sprite1Rect = ref.current.getBoundingClientRect();
    const sprite2Rect = ref2.current.getBoundingClientRect();

    return !(
      sprite1Rect.right < sprite2Rect.left ||
      sprite1Rect.left > sprite2Rect.right ||
      sprite1Rect.bottom < sprite2Rect.top ||
      sprite1Rect.top > sprite2Rect.bottom
    );
  };

  // Function to swap actions when collision occurs
  const handleCollision = () => {
    if (checkCollision()) {
      // Swap actions
      const tempActions = [...actions];
      setActions([...actions2]);
      setActions2(tempActions);

      r = -100;
      t = 0;
      r2 = 200;
      t2 = 0;
      scale2 = 1;
      angle2 = 0;
      scale = 1;
      angle = 0;

      if (ref.current) {
        ref.current.style.transform = `translate(${r}px, ${t}px) scale(${scale}) rotate(${angle}deg)`;
      }
      if (ref2.current) {
        ref2.current.style.transform = `translate(${r2}px, ${t2}px) scale(${scale2}) rotate(${angle2}deg)`;
      }
      // Show a toast notification (optional)
      toast.info("Sprites collided! Swapping actions.", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Function to transform sprites
  function transform(x, y, action1) {
    if (action1) {
      r = x;
      t = y;
      ref.current.style.transform = `translate(${r || 0}px, ${t || 0
        }px) scale(${scale}) rotate(${angle}deg)`;
    } else {
      r2 = x;
      t2 = y;
      ref2.current.style.transform = `translate(${r2 || 0}px, ${t2 || 0
        }px) scale(${scale2}) rotate(${angle2}deg)`;
    }

    // Check for collision after movement
    if (!displayAddIcon && ref.current && ref2.current) {
      handleCollision();
    }
  }

  function moveSprite(xDelta, yDelta, isFirstSprite) {
    if (isFirstSprite) {
      r += xDelta;
      t += yDelta;
      // Ensure boundaries
      if (r > 580 || r < -580 || t > 140 || t < -140) {
        refresh(WARN_MSG_POS);
        return;
      }
      ref.current.style.transform = `translate(${r}px, ${t}px) scale(${scale}) rotate(${angle}deg)`;
    } else {
      r2 += xDelta;
      t2 += yDelta;
      if (r2 > 580 || r2 < -580 || t2 > 140 || t2 < -140) {
        refresh(WARN_MSG_POS);
        return;
      }
      ref2.current.style.transform = `translate(${r2}px, ${t2}px) scale(${scale2}) rotate(${angle2}deg)`;
    }

    if (!displayAddIcon && ref.current && ref2.current) {
      handleCollision();
    }
  }

  // Movement functions
  function moveRight(i, action1,value) {
    setTimeout(() => moveSprite(value, 0, action1), i * 1500);
  }

  function moveLeft(i, action1,value) {
    setTimeout(() => moveSprite(-value, 0, action1), i * 1500);
  }
  function MoveDown(i, action1,value) {
    setTimeout(() => moveSprite(0, value, action1), i * 1500);
  }
  function MoveUp(i, action1,value) {
    setTimeout(() => moveSprite(0, -value, action1), i * 1500);
  }
  function RotateSprite(atAngle, i, action1,value) {
    console.log(atAngle);
    setTimeout(() => {
      if (action1) {
        angle += value;
        console.log(atAngle);
      } else {
        angle2 += value;
      }
      transform(action1 ? r : r2, action1 ? t : t2, action1);
    }, i * 1500);
  }

  function MoveRandom(xInput, yInput, random, i, action1) {
    r = typeof r === "undefined" ? "0%" : r.toString();
    r2 = typeof r2 === "undefined" ? "0%" : r2.toString();
    t = typeof t === "undefined" ? "0%" : t.toString();
    t2 = typeof t2 === "undefined" ? "0%" : t2.toString();
    // combined function to move to random postion and to x, y cordinates
    setTimeout(() => {
      let tempR = parseInt(action1 ? r.slice(0, -1) : r2.slice(0, -1));
      let tempT = parseInt(action1 ? t.slice(0, -1) : t2.slice(0, -1));
      // asign the x, y values
      // or to random values
      tempR =
        tempR !== parseInt(xInput) && parseInt(xInput) !== 0
          ? random
            ? Math.floor(Math.random() * (-290 - 290) + 290)
            : parseInt(xInput)
          : tempR;
      tempT =
        tempT !== -parseInt(yInput) && parseInt(yInput) !== 0
          ? random
            ? Math.floor(Math.random() * (-140 - 140) + 140)
            : -parseInt(yInput)
          : tempT;
      if (parseInt(yInput) == 0) {
        tempT = 0;
      }
      if (parseInt(xInput) == 0) {
        tempR = 0;
      }
      //return to intial if it is out of bounds
      if (tempR < -290 || tempR > 290 || tempT < -140 || tempT > 140) {
        refresh(WARN_MSG_POS);
        return;
      }
      let valueR = tempR.toString();
      let valueT = tempT.toString();

      if (action1) {
        r = valueR.concat("%");
        t = valueT.concat("%");
      } else {
        r2 = valueR.concat("%");
        t2 = valueT.concat("%");
      }
      // apply tarnsform for respective sprite
      action1
        ? (ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`)
        : (ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`);
    }, i * 1500);
  }

  // Start actions for sprites
  const startActions = (action, idx, action1,value) => {
    switch (action) {
      case "move right": {
        moveRight(idx, action1,value);
        break;
      }

      case "move left": {
        moveLeft(idx, action1,value);
        break;
      }
      case "Move Down": {
        MoveDown(idx, action1,value);
        break;
      }
      case "Move Up": {
        MoveUp(idx, action1,value);
        break;
      }
      case "turn": {
        RotateSprite(20, idx, action1,value);
        break;
      }
      case "random position": {
        MoveRandom(1, 1, true, idx, action1);
        break;
      }

      case "repeat": {
        setTimeout(() => {
          if (action1) {
            runAction1();
          } else {
            runAction2();
          }
        }, idx * 1500);
        break;
      }
      default:
        break;
    }
  };

  // Clear all timeouts
  function clearTimeouts() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
  }

  // Refresh function to reset positions
  const refresh = (msg) => {
    r = -100;
    t = 0;
    r2 = 200;
    t2 = 0;
    scale2 = 1;
    angle2 = 0;
    scale = 1;
    angle = 0;
    clearTimeouts();

    if (msg) {
      toast.warn(msg, {
        position: "top-center",
        autoClose: 2000,
        borderRadius: "20px",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    if (ref.current) {
      ref.current.style.transform = `translate(${r}px, ${t}px) scale(${scale}) rotate(${angle}deg)`;
    }
    if (ref2.current) {
      ref2.current.style.transform = `translate(${r2}px, ${t2}px) scale(${scale2}) rotate(${angle2}deg)`;
    }
  };
  function runAction1() {
    actions &&
      actions.forEach((item, i) => {
        console.log(item);
        startActions(item.todo, i, true,item.value);
      });
  }

  function runAction2() {
    if (!displayAddIcon && actions2.length) {
      actions2.forEach((item, i) => {
        startActions(item.todo, i, false,item.value);
      });
    }
  }


  return (
    <div className="flex flex-col items-center w-full">
      <ToastContainer />
      <div className="container flex justify-between mt-4 w-full space-x-2">
        <Droppable droppableId="MovesList">
          {(provided) => (
            <div
              className="moves bg-white w-1/3 shadow-md rounded-lg p-5 overflow-y-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="moves__heading text-xl font-bold mb-4">Options</div>
              {console.log(moves)}
              {moves?.map((move, index) => (
                <ActionHandel
                  disableDelete={true}
                  index={index}
                  moves={moves}
                  move={move}
                  key={move.id}
                  setMoves={setMoves}
                  customMove={customMove}
                  setCustomMove={setCustomMove}
                />
              ))}
              {provided.placeholder}
            </div>
          )}

        </Droppable>

        <div className="flex flex-col w-1/3">
          <Droppable droppableId="MovesActions">
            {(provided) => (
              <div
                className="actions bg-white shadow-md w-full rounded-lg p-4 overflow-y-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <span className="moves__heading text-xl font-bold mb-4">Action</span>
                {actions?.map((move, index) => (
                  <ActionHandel
                    index={index}
                    moves={actions}
                    move={move}
                    key={move.id}
                    refresh={refresh}
                    setMoves={setActions}
                    customMove={customMove}
                    setCustomMove={setCustomMove}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {!displayAddIcon && (
            <Droppable droppableId="MovesActions2">
              {(provided) => (
                <div
                  className="actions bg-white shadow-md w-full rounded-lg p-4 overflow-y-auto mt-5"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <span className="moves__heading text-xl font-bold mb-4">Action 2</span>
                  {actions2?.map((move, index) => (
                    <ActionHandel
                      index={index}
                      moves={actions2}
                      move={move}
                      key={move.id}
                      refresh={refresh}
                      setMoves={setActions2}
                      customMove={customMove2}
                      setCustomMove={setCustomMove2}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>

        {displayAddIcon && (
          <div className="flex flex-col items-center justify-center">
            <div className="icon flex flex-col items-center">
              <AddBoxIcon
                sx={{ color: "gray", cursor: "pointer" }}
                onClick={() => {
                  setDisplayAddIcon(false);
                  setSprite2(dog);
                  refresh();
                }}
              />
              {/* <span className="tooltiptext text-gray-600">add sprite</span> */}
            </div>
            <div>
              <DeleteIcon
                onClick={() => setActions([])}
                sx={{ cursor: "pointer", fontSize: "30px", color: "grey" }}
              />
            </div>
          </div>
        )}

        {!displayAddIcon && (
          <div className="icon flex items-center space-x-2">
            <DisabledByDefaultIcon
              sx={{ color: "gray", cursor: "pointer" }}
              onClick={() => {
                setDisplayAddIcon(true);
                setSprite2(null);
                refresh();
              }}
            />
            <DeleteIcon
              onClick={() => {
                setActions([]);
                setActions2([]);
              }}
              sx={{ cursor: "pointer", fontSize: "30px", color: "grey" }}
            />
          </div>
        )}

        <div className="play flex items-center justify-center bg-white shadow-lg rounded-lg p-4 w-full h-[70vh]">
          <div className="flex space-x-4">
            <Draggable1 bounds={{ left: -800, top: -400, right: 800, bottom: 400 }}>
              <div ref={ref} className="relative transition-all duration-500 ease-in-out">
                <img
                  src={sprite}
                  draggable="false"
                  alt="sprite"
                  className="cursor-pointer max-h-24 max-w-24 object-contain transition-all duration-500 ease-in-out"
                />
              </div>
            </Draggable1>
            {!displayAddIcon && (
              <Draggable1 bounds={{ left: -800, top: -400, right: 800, bottom: 400 }}>
                <div ref={ref2} className="relative transition-all duration-500 ease-in-out">
                  <img
                    src={sprite2}
                    draggable="false"
                    alt="sprite2"
                    className="cursor-pointer max-h-24 max-w-24 object-contain transition-all duration-500 ease-in-out"
                  />
                </div>
              </Draggable1>
            )}
          </div>
        </div>
      </div>

      <div className="gameProps flex justify-end  items-center mt-8 mr-24 w-full space-x-4">
        <div className="absolute left-5  w-1/3 p-2 bg-white shadow-lg rounded-lg">
            <h1>Juspay Assignment</h1>
          {/* <h2 className="text-lg font-semibold text-gray-800">Platform Information</h2>
          
          <div className="mt-2 border-t pt-2">
           
            <ul className="mt-2 list-disc list-inside text-gray-600 space-y-2">
              <li><span className="font-semibold">Objective:</span> Implement the following features within the project.</li>
              <li>
                <span className="font-semibold">Motion Animations:</span>
                <ul className="list-disc list-inside ml-4">
                  <li>Move ____ steps</li>
                  <li>Turn ____ degrees</li>
                  <li>Go to x: ___ y: ____</li>
                  <li>Repeat animation (inside controls)</li>
                </ul>
              </li>
             
            </ul>
          
          </div> */}
        </div>

        <Sprites
          setSprite={setSprite}
          setSprite2={setSprite2}
          displayAddIcon={displayAddIcon}
          sprite2={sprite2}
          sprite={sprite}
        />
        <div className="playRefresh flex space-x-4">
          <Button
            variant="contained"
            className="rounded-lg px-4 py-2 text-sm"
            color="success"
            onClick={() => {
              runAction1();
              runAction2();
            }}
          >
            <PlayArrowIcon />
            Run Animation
          </Button>
          <Button
            variant="contained"
            className="rounded-lg px-4 py-2 text-sm"
            color="error"
            onClick={refresh}
          >
            <RefreshIcon sx={{ color: "white" }} />
            Reset
          </Button>
        </div>

      </div>
    </div>
  );


};

export default WorkArea;
