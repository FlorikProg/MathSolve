"use client"

import { useState } from "react"
import NavBar from "@/components/app-navbar"
import ChoiceSubject from "./choice_subject"
import ChoiceClass from "./choice_class"
import { useRouter } from "next/navigation"

export default function Choice() {
  const [subjectVisible, setSubjectVisible] = useState(true)
  const [classVisible, setClassVisible] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)

  const router = useRouter('')
  function navigate(subjectObj, classObj) {
    if (!subjectObj || !classObj) return
     router.push(`/home/${subjectObj.value}/${classObj.value}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white fixed top-0 left-0 w-full z-100">
        <NavBar />
      </div>

      <div className="pt-16"> 
        <ChoiceSubject
          display={subjectVisible}
          onSelect={(subject) => {
            setSelectedSubject(subject)
            setSubjectVisible(false)
            setClassVisible(true)
          }}
        />

        <ChoiceClass
          display={classVisible}
          onSelect={(cls) => {
            setSelectedClass(cls)
            navigate(selectedSubject, cls)
          }}
        />
      </div>
    </div>
  )
}
