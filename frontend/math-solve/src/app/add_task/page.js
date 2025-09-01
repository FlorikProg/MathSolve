"use client"
import { useState } from "react"
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
import NavBar from "@/components/app-navbar"
import { CreateTaskApi } from "@/src/features/api/tasks"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AddTask() {
  const [complexity, setComplexity] = useState("")

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
      user: "Админ",
      school_class: Number(formData.get("class")),
      subject: formData.get("subject"),
      tag: formData.get("tag"),
      complex: complexity, // <-- берём из стейта
    }
    console.log(data)
    CreateTaskApi(data)
  }

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center h-screen">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="px-8 py-3 text-lg">
              Добавить задачу
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader className="pb-6">
                <DialogTitle className="text-2xl font-semibold">
                  Добавить задачу
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  Введите данные о задаче которую хотите добавить
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                {/* Левая колонка */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-1">Название</Label>
                    <Input id="name-1" name="name" placeholder="Введите название задачи" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description-1">Описание</Label>
                    <Input id="description-1" name="description" placeholder="Описание задачи" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="solution-1">Решение</Label>
                    <Input id="solution-1" name="solution" placeholder="Пошаговое решение" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="answer-1">Ответ</Label>
                    <Input id="answer-1" name="answer" placeholder="Правильный ответ" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source-1">Источник</Label>
                    <Input id="source-1" name="source" defaultValue="Не найден" />
                  </div>
                </div>

                {/* Правая колонка */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="photo-1">Фото (ссылка)</Label>
                    <Input id="photo-1" name="photo" defaultValue="Не найден" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class-1">Класс</Label>
                    <Input id="class-1" name="class" type="number" min="1" max="11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject-1">Предмет</Label>
                    <Input id="subject-1" name="subject" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complexity-1">Сложность</Label>
                    <Select onValueChange={setComplexity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите сложность задачи" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Сложность</SelectLabel>
                          <SelectItem value="easy">Легко ✅</SelectItem>
                          <SelectItem value="medium">Средне ⚠️</SelectItem>
                          <SelectItem value="hard">Тяжело 🔥</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tag-1">Тема</Label>
                    <Input id="tag-1" name="tag" />
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-6 gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Сохранить задачу
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
