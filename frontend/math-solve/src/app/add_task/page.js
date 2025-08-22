"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import NavBar from "@/components/app-navbar"
import { CreateTaskApi } from "@/src/features/api/tasks"
export default function AddTask() {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      solution: formData.get("solution"),
      answer: formData.get("answer"),
      source: formData.get("source"),
      photo: formData.get("photo"),
      user: "Админ"
    }
   
    CreateTaskApi(data)
  }

  return (
    <div>
     <NavBar/>

     
    <div className="flex items-center justify-center h-screen">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Добавить задачу</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Добавить задачу</DialogTitle>
            <DialogDescription>
              Введите данные о задаче которую хотите добавить
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Название</Label>
              <Input id="name-1" name="name"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Описание</Label>
              <Input id="description-1" name="description"/>
            </div>
              <div className="grid gap-3">
              <Label htmlFor="solution-1">Решение</Label>
              <Input id="soluiton-1" name="solution"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="answer-1">Ответ</Label>
              <Input id="answer-1" name="answer"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="source-1">Источник</Label>
              <Input id="source-1" name="source" defaultValue="Не найден" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="photo-1">Фото(ссылка)</Label>
              <Input id="photo-1" name="photo" defaultValue="Не найден" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
            <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    </div>
    </div>
      )
}
