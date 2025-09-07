"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { CreateUserApi } from "@/src/features/api/auth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export function LoginForm({className, ...props}) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error_message, setErrorMessage] = useState("")
  const router = useRouter()
  async function HandleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")
    const username = formData.get("username")

    try {
      await CreateUserApi(email, password, username)
    }
    catch (error) {
      console.error("Error creating user:", error);
      if (error.status == 400) {
        setErrorMessage("Похоже вы ввели слишком маленький пароль или имя. Попробуйте еще раз.")
        setOpen(true)
      }

      if (error.status == 409) {
        setErrorMessage("Такой пользователь уже существует")
        setOpen(true)
      }

      if (error.status == 200) {
        router.push('/login_user'); 
        return
      }

      throw error;
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={HandleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Создать аккаунт</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Создайте аккаунт, чтобы начать использовать MathSolve
        </p>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Произошла ошибка</AlertDialogTitle>
            <AlertDialogDescription>
              {error_message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Хорошо</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Почта</Label>
          <Input id="email" name="email" type="email" placeholder="roman@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username">Имя</Label>
          <Input id="username" name="username" type="text" placeholder="Роман" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" id="login-button" disabled={loading}>
          { loading ? "Секунду..." : "Создать" }
        </Button>
      </div>
      <div className="text-center text-sm">
        Есть аккаунт?{" "}
        <a href="login_user" className="underline underline-offset-4">
          Войти
        </a>
      </div>
    </form>
  )
}
