"use client"
import React from "react"
import TasksList from "./tasks_list"
import Topic from "./topic"
import NavBar from "@/components/app-navbar"
import { useState } from "react"

export default function Home() {
    const [active, setActive] = useState("Легко");

    const options = ["Легко", "Средне", "Тяжело"];
    return (
        <div id="main" className="bg-white">
            <NavBar is_search={true}></NavBar>
            <div className="pl-10 pr-10 pt-10">
                <h1 className="text-3xl">Математика</h1>
            </div>
            <div>
            <div className="px-10 pt-5">
                <div className="flex justify-between items-center pb-2">
                    <div className="border border-gray-200 flex gap-4 text-base bg-default_bg rounded-4xl px-3 py-2 opacity-90">
                    {options.map((opt) => (
                        <button
                        key={opt}
                        onClick={() => setActive(opt)}
                        className={`px-4 py-2 rounded-full hover:cursor-pointer transition-all duration-300 ${
                            active === opt
                            ? "bg-default_button_bg text-black"
                            : "text-foreground hover:bg-default_button_bg/40"
                        }`}
                        >
                        {opt}
                        </button>
                    ))}
                    </div>
                </div>
                </div>

            <Topic/>
            </div>
            
            
            <TasksList/>
        </div>
    )
}