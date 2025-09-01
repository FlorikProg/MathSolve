import React from "react";
import SubjectDropdown from "@/components/subject-dropdown";

export default function ChoiceSubject({ display, onSelect }) {
  return (
    <div className={`${display ? "flex" : "hidden"} relative flex-col items-center justify-center min-h-screen`}>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
                   dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] 
                   bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_60%_20%,#000_70%,transparent_110%)]"
      ></div>

      <main className="flex flex-1 flex-col justify-center items-center space-y-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
          Выберите предмет
        </h1>
        <SubjectDropdown onSelect={onSelect} /> {/* <-- прокидываем колбэк */}
      </main>
    </div>
  );
}
