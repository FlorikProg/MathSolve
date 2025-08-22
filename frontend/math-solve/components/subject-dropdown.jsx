"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const subjects = [
  { value: "math", label: "Математика" },
  { value: "cs", label: "Информатика" },
  { value: "physics", label: "Физика" },
]

export default function SubjectDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-4 py-3 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className="text-gray-700">{selectedSubject.label}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {subjects.map((subject) => (
            <button
              key={subject.value}
              onClick={() => {
                setSelectedSubject(subject)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="text-gray-700">{subject.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
