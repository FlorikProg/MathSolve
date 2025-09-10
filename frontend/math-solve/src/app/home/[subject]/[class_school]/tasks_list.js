"use client";
import React, { useEffect, useState } from "react";
import { GetTasks } from "@/src/features/api/tasks";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useParams } from "next/navigation";
import Topic from "./topic";
import { TopicContext } from "./topicContext";

export default function MathTasksList(difficult) {
  const [tasks, setTasks] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const params = useParams();
  const subject = params.subject;
  const class_school = params.class_school;

  const allTags = tasks.map(task => task.tag); 
  const uniqueTags = [...new Set(allTags)];

  const topics = [];

  for (let i = 0; i < uniqueTags.length; i++) {
    topics.push({ name: uniqueTags[i], index: i + 1 });
  }

  topics.unshift({ name: "Все", index: 0 });

  useEffect(() => {
    async function fetchTasks() {
      let response = await GetTasks({
        class_school: Number(class_school),
        subject,
      });
      let data = Array.isArray(response) ? response : response ? [response] : [];
      setTasks(data.filter(Boolean));
    }
    fetchTasks();
  }, [class_school, subject]);

  const truncateText = (text, maxLength) => {
    if (!text) return "Описание отсутствует";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const filterTasks = (task) => {
    const matchesDifficulty =
      !difficult.complexity || difficult.complexity === "All" || task.complex.toLowerCase() === difficult.complexity.toLowerCase();

    const matchesTopic =
      !selectedTopic || selectedTopic.name === "Все"
        ? true
        : task.tag === selectedTopic.name;

    return matchesDifficulty && matchesTopic;
  };



 



  return (
    <TopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      <Topic topics={topics} />
      <div className="p-0">
        <div className="border border-gray-200 rounded-2xl bg-default_bg mt-5">
          <div className="p-5 border-b border-gray-300 text-2xl">
            Задачи ({tasks.filter(filterTasks).length})
          </div>

          {tasks.filter(filterTasks).map((task, index) => (
            <Link key={index} href={"/task/" + task.uuid}>
              <div className="p-5 border-b border-gray-300 flex justify-between items-start transition-all duration-200 cursor-pointer">
                <div className="flex-1">
                  <h2 className="text-lg text-gray-800">{task.name || "Без названия"}</h2>
                  <p className="text-gray-600">{truncateText(task.description, 100)}</p>
                </div>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
                  {task.solve ? <Check color="black" size={20} /> : <X color="black" size={20} />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </TopicContext.Provider>
  );
}
