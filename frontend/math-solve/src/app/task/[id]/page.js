"use client"
import React, { useState, useEffect } from "react";
import NavBar from "@/components/app-navbar";
import { useParams } from "next/navigation";
import { GetFullInfoAboutTask, CompleteTask } from "@/src/features/api/tasks";

export default function QuizPage() {
  const [description, setDescription] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const [photo, setPhoto] = useState("");
  const [feedback, setFeedback] = useState("");
  const [btnColor, setBtnColor] = useState("black");
  const [isDisabled, setIsDisabled] = useState(false);

  const params = useParams();
  const uuid = params.id;

  useEffect(() => {
    async function fetchData() {
      const dataArray = await GetFullInfoAboutTask({ uuid });
      const data = dataArray[0];
      setDescription(data.description || "");
      setSolution(data.answer || "");
      setPhoto(data.photo || "");
    }
    fetchData();
  }, [uuid]);

  const handleClick = () => {
    if (inputAnswer.trim() === solution.trim()) {
      setFeedback("Правильно!");
      setBtnColor("green");
      CompleteTask({uuid})
      setIsDisabled(true); 
    } else {
      setFeedback("Неправильно. Попробуй снова.");
      setBtnColor("black");
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar is_search={false}/>
      </div>

      <div className="h-screen bg-white px-8 py-12 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full text-center">
          <p className="text-xl text-gray-800 mb-10 leading-relaxed text-left">
            {description}
          </p>
          <input
            type="text"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            placeholder="Введите ответ..."
            className="w-full p-4 border rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
          />
          <button
            onClick={handleClick}
            disabled={!inputAnswer.trim() || isDisabled}
            className={`w-full font-semibold py-4 rounded-xl text-lg transition 
              ${btnColor === "green" ? "bg-green-500 text-white" : "bg-black text-white"}
              ${(!inputAnswer.trim() || isDisabled) && "bg-gray-300 text-gray-500 cursor-not-allowed"}
            `}
          >
            Ответить
          </button>
          {feedback && (
            <p className={`mt-4 text-lg ${btnColor === "green" ? "text-green-600" : "text-red-600"}`}>
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
