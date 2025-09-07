import { useTopic } from "./topicContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Topic({topics}) {
  const { selectedTopic, setSelectedTopic } = useTopic();
  const [isOpen, setIsOpen] = useState(false);

  // const topics = [
  //   { name: "Все", index: 1 },
  //   { name: "Функции", index: 2 },
  //   { name: "Комбинаторика", index: 3 },
  //   { name: "Уравнения", index: 4 },
  //   { name: "Неравенства", index: 5 },
  //   { name: "Хз что", index: 6 },
  //   { name: "Еще что-то", index: 7 },
  // ];

  const topicClass = (t) =>
    `px-5 py-2 rounded-full border text-base cursor-pointer transition-colors
     ${
       selectedTopic?.index === t.index
         ? "bg-black text-white border-black"
         : "bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:text-black"
     }`;

     
  return (
    <div className="relative pt-1 w-full">
      {/* Dropdown для мобильных */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center bg-white border border-gray-300 px-5 py-3 rounded-xl text-base text-gray-700 hover:border-gray-500 transition-colors"
        >
          {selectedTopic ? selectedTopic.name : "Темы"}
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl z-10">
            {topics.map((t) => (
              <p
                key={t.index}
                onClick={() => {
                  setSelectedTopic(t);
                  setIsOpen(false);
                }}
                className={`px-5 py-2 cursor-pointer text-base transition-colors
                  ${
                    selectedTopic?.index === t.index
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
              >
                {t.name}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Горизонтальный скролл для десктопа */}
      <div className="hidden sm:block overflow-x-auto w-full">
        <div className="inline-flex gap-3 sm:gap-4">
          {topics.map((t) => (
            <p
              key={t.index}
              onClick={() => setSelectedTopic(t)}
              className={topicClass(t)}
            >
              {t.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
