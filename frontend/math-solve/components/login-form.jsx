"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { loginUserApi } from "@/src/features/api/auth"

export function LoginForm({className, ...props}) {
  const [loading, setLoading] = useState(false)

  async function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        let res = await loginUserApi(email, password); 
        let accessToken = res.access_token;
        localStorage.setItem("access_token", accessToken);
    } finally {
        setLoading(false);
    }
}
   
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={HandleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Войти в аккаунт</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Введите свою почту ниже, чтобы войти в свой аккаунт
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Почта</Label>
          <Input id="email" name="email" type="email" placeholder="roman@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>
            {/* <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Забыли свой пароль?
            </a> */}
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" id="login-button" disabled={loading}>
          { loading ? "Секунду..." : "Войти" }
        </Button>
      </div>
      <div className="text-center text-sm">
        Нет аккаунта?{" "}
        <a href="/create_user" className="underline underline-offset-4">
          Зарегистрироваться
        </a>
      </div>
    </form>
  )
}
