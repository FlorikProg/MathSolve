"use client";
import React, { useState } from "react";
import TasksList from "./tasks_list";
import NavBar from "@/components/app-navbar";
import Topic from "./topic";

export default function Home() {
  const [active, setActive] = useState("All");
  const options = [
    { name: "Все", value: "All" },
    { name: "Легко", value: "easy" },
    { name: "Средне", value: "medium" },
    { name: "Сложно", value: "hard" }
  ];
  
  return (
    <div id="main" className="bg-white min-h-screen">
      <NavBar is_search={false} />

      <div className="px-4 sm:px-10 pt-5 sm:pt-10">
        <h1 className="text-2xl pb-5 sm:text-3xl font-semibold">Математика</h1>

        <div className="flex justify-start overflow-x-auto pt-2">
          <div className="flex gap-3 sm:gap-5 min-w-max">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActive(opt.value)}
                className={`px-6 py-2 rounded-full border text-sm sm:text-base transition-all duration-200
                  ${
                    active === opt.value
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black/50 hover:text-black"
                  }`}
              >
                {opt.name}
              </button>
            ))}

          </div>
        </div>

        <div className="pt-4">

          <TasksList complexity={active} />
        </div>
      </div>
    </div>
  );
}
