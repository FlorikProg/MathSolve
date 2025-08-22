"use client"
import React from "react";
import Image from "next/image";

export default function MathTasksList() {
    const tasks = [
        { name: "Задача 1", description: "Найти сумму всех чисел от 1 до 100", solve: false},
        { name: "Задача 2", description: "Докажите, что корень квадратный из 2 иррационален", solve: true},
        { name: "Задача 3", description: "Найти наибольший общий делитель чисел 48 и 180", solve: true},
        { name: "Задача 4", description: "Вычислите интеграл от x^2 dx от 0 до 1", solve: false},
    ];

    return (
        <div className="p-10">
            <div className="border border-gray-200 rounded-2xl bg-default_bg">
                <div className="p-5 border-b border-gray-300 text-2xl">
                    Задачи(8)
                </div>

                {tasks.map((task, index) => (
                    <div 
                        key={index} 
                        className="p-5 border-b border-gray-300 flex justify-between items-center transition-all duration-200 cursor-pointer"
                    >
                        <div>
                            <h2 className="text-lg text-gray-800">{task.name}</h2>
                            <p className="text-gray-600">{task.description}</p>
                        </div>
                        <div>
                            <Image
                                src={task.solve ? "/image/chevron/chevron.png" : "/image/chevron/cross.png"} 
                                width={16} 
                                height={16}
                                alt="стрелка"
                                className="opacity-70 mr-2"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
