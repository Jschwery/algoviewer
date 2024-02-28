import React, { useEffect, useRef, useState } from "react";
import Dijkstra from "../algorithms/dijkstra";
import { algorithmsList } from "../algorithms/util/algoList";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface OptionsProps {
  onCalculate: (start: number, end: number) => void;
  algoCallback: (algo: string) => void;
}

const Options: React.FC<OptionsProps> = ({ onCalculate, algoCallback }) => {
  const [dimension1, setDimension1] = useState("20");
  const [dimension2, setDimension2] = useState("20");
  const [algo, setAlgo] = useState("");
  const [speed, setSpeed] = useState("");
  const [mazePattern, setMazePattern] = useState("");

  useEffect(() => {
    algoCallback(algo);
  }, [algo]);

  return (
    <div className="w-full h-full gap-2 flex-col sm:flex-row flex p-2 bg-slate-500">
      <div className="bg-yellow-200 mx-auto flex w-full justify-between p-2  rounded-sm">
        <div className="flex flex-col space-y-1 items-start w-full">
          <div className="flex items-end gap-5">
            <div className="flex gap-2 w-[75%]">
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {algo ? algo : "Algorithms"}
                    </MenuButton>
                    <MenuList>
                      <MenuOptionGroup
                        defaultValue="asc"
                        title="Algorithms"
                        type="radio"
                      >
                        <MenuItemOption
                          onClick={() => setAlgo("A*")}
                          value="a*"
                        >
                          A*
                        </MenuItemOption>
                        <MenuItemOption
                          onClick={() => setAlgo("Dijkstra")}
                          value="dijkstra"
                        >
                          Dijkstra
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </>
                )}
              </Menu>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {mazePattern ? mazePattern : "Mazes & Patterns"}
                    </MenuButton>
                    <MenuList>
                      <MenuOptionGroup
                        defaultValue="asc"
                        title="Maze & Patterns"
                        type="radio"
                      >
                        <MenuItemOption
                          onClick={() => setMazePattern("Recursive Division")}
                          value="recursiveDivision"
                        >
                          Recursive Division
                        </MenuItemOption>
                        <MenuItemOption
                          onClick={() => setMazePattern("Random")}
                          value="random"
                        >
                          Random
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </>
                )}
              </Menu>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {speed ? speed : "Speed"}
                    </MenuButton>
                    <MenuList>
                      <MenuOptionGroup
                        defaultValue="asc"
                        title="Speed"
                        type="radio"
                      >
                        <MenuItemOption
                          onClick={() => setSpeed("Slow")}
                          value="slow"
                        >
                          Slow
                        </MenuItemOption>
                        <MenuItemOption
                          onClick={() => setSpeed("Normal")}
                          value="normal"
                        >
                          Normal
                        </MenuItemOption>
                        <MenuItemOption
                          onClick={() => setSpeed("Fast")}
                          value="fast"
                        >
                          Fast
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </>
                )}
              </Menu>
            </div>

            <div className="w-full z-10">
              <h5>Dimensions</h5>
              <div className="flex gap-2 items-center">
                <input
                  value={dimension1}
                  onChange={(e) => setDimension1(e.target.value)}
                  className="h-8 text-center w-10 rounded-sm"
                  type="text"
                />
                <h3>X</h3>
                <input
                  value={dimension2}
                  onChange={(e) => setDimension2(e.target.value)}
                  className="h-8 text-center w-10 rounded-sm"
                  type="text"
                />
                <button
                  onClick={() =>
                    onCalculate(Number(dimension1), Number(dimension2))
                  }
                  className="rounded-sm bg-purple-500 hover:bg-purple-400 h-8 px-2 cursor-pointer"
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
