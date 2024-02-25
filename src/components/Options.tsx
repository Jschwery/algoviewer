import React, { useEffect, useRef, useState } from "react";
import Dijkstra from "../algorithms/dijkstra";
import { algorithmsList } from "../algorithms/util/algoList";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface OptionsProps {
  onCalculate: (start: number, end: number) => void;
  algoCallback: (algo: string) => void;
}

const Options: React.FC<OptionsProps> = ({ onCalculate, algoCallback }) => {
  const [dimension1, setDimension1] = useState("20");
  const [dimension2, setDimension2] = useState("20");
  const [algo, setAlgo] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");

  useEffect(() => {
    algoCallback(algo);
  }, [algo]);

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown((prev) => (prev === dropdownId ? "" : dropdownId));
  };

  useEffect(() => {
    console.log(openDropdown);
  }, [openDropdown]);

  return (
    <div className="w-full h-full gap-2 flex-col sm:flex-row flex p-2 bg-slate-500">
      <div className="bg-yellow-200 mx-auto flex md:w-[70%] justify-between p-6  rounded-sm">
        <div className="flex flex-col space-y-1 items-start w-full">
          <div className="flex items-end gap-5">
            <div className="bg-emerald-900 flex-col inline-flex sm:!flex-row space-y-2 sm:space-y-0 justify-between">
              <div className="relative flex w-full  items-center justify-start">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {isOpen ? "Close" : "Open"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem onClick={() => alert("Kagebunshin")}>
                          Create a Copy
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </div>
              <div className="relative flex w-full  items-center justify-start">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {isOpen ? "Close" : "Open"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem onClick={() => alert("Kagebunshin")}>
                          Create a Copy
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </div>
              <div className="relative flex w-full  items-center justify-start">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {isOpen ? "Close" : "Open"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem onClick={() => alert("Kagebunshin")}>
                          Create a Copy
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </div>
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
          <div className="ml-auto w-[50%] p-1 my-2 rounded-md hover:bg-cyan-500 cursor-pointer bg-cyan-600 text-center  text-white">
            Start
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
