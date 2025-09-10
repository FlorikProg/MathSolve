"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/app-navbar";
import { useParams } from "next/navigation";
import {
  GetFullInfoAboutTask,
  CompleteTask,
  IsSolvedByUser,
} from "@/src/features/api/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog, 
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "sonner";
import  Solution  from "./Solution";

export default function QuizPage() {
  const [description, setDescription] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [solution, setSolution] = useState("");
  const [photo, setPhoto] = useState("");
  const [feedback, setFeedback] = useState("");
  const [btnColor, setBtnColor] = useState("black");
  const [isDisabled, setIsDisabled] = useState(false);
  const [button_text, setButtonText] = useState("Ответить");
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [class_school, setClassSchool] = useState("");

  const params = useParams();
  const uuid = params.id;

  // Функция для проверки валидности URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Функция для проверки, нужно ли показывать фото
  const shouldShowPhoto = () => {
    return photo &&
           photo !== "none" &&
           photo.trim() !== "" &&
           isValidUrl(photo);
  };

  useEffect(() => {
    async function fetchIsSolved() {
      const is_solved = await IsSolvedByUser({ uuid });
      if (is_solved.is_solved == true) {
        setIsDisabled(true);
        setFeedback("Задача была решена ранее!");
        setBtnColor("green");
        setButtonText("Задача решена");
      }
    }
    fetchIsSolved();
    
    async function fetchData() {
      const dataArray = await GetFullInfoAboutTask({ uuid });
      const data = dataArray[0];
      setDescription(data.description || "");
      setAnswer(data.answer || "");
      setSolution(data.solution || "");
      setPhoto(data.photo || "");
      setSubject(data.subject || "");
      setClassSchool(data.school_class || "");
    }
    fetchData();
  }, [uuid]);

  const handleClick = () => {
    let wrongCount = parseInt(
      sessionStorage.getItem(`wrongAttempts_${uuid}`) || "0"
    );

    if (inputAnswer.trim().toLowerCase() === answer.trim().toLowerCase()) {
      let totalAttempts = wrongCount + 1;
      let accuracy = Math.round((1 / totalAttempts) * 100);

      setFeedback("Правильно!");
      setBtnColor("green");
      setIsDisabled(true);
      setButtonText("Задача решена");

      CompleteTask({ uuid, attempts: wrongCount });

      toast("Задача успешно решена ✅", {
        description: `🎯 Ваша точность составляет: ${accuracy}%`,
      });

      sessionStorage.setItem(`wrongAttempts_${uuid}`, "0");
    } else {
      wrongCount += 1;
      sessionStorage.setItem(`wrongAttempts_${uuid}`, wrongCount);

      setFeedback("Неправильно. Попробуй снова.");
      setBtnColor("black");
      setButtonText("Ответить");
    }
  };

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 bg-white z-1">
        <NavBar is_search={false} link_url={`/home/${subject}/${class_school}`} />
      </div>
      
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full text-center">
        
          {shouldShowPhoto() && (
            <div className="flex justify-center mb-6 w-full pt-12 pb-15">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl transition-all duration-200"
                  >
                    📸 Показать изображение
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/90 border-none">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={photo}
                      alt="Task Photo"
                      width={1200}
                      height={900}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

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
              ${
                btnColor === "green"
                  ? "bg-green-500 text-white"
                  : "bg-black text-white"
              }
              ${
                (!inputAnswer.trim() || isDisabled) &&
                "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {button_text}
          </button>
          
          <div className="fixed bottom-5 right-5 z-1000">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-black text-white px-6 py-3 rounded-xl hover:scale-110 hover:transition-transform duration-300 tracking-wide" size={30}>
                  Решение
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                <SheetTitle>Решение задачи</SheetTitle>
                <SheetDescription asChild>
                  <Solution text={solution} />
                </SheetDescription>

                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          
          {feedback && (
            <p
              className={`mt-4 text-lg ${
                btnColor === "green" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}