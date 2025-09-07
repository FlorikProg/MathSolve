"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { loginUserApi } from "@/src/features/api/auth"
import { useRouter } from "next/navigation"

export function LoginForm({className, ...props}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter() // Next.js


  async function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    
    try {
      let res = await loginUserApi(email, password);
      let accessToken = res.access_token;
      
      localStorage.setItem("access_token", accessToken);
      
      router.push('/choice'); 

      
    } catch (err) {
      // Обработка ошибок
      setError(err.message || "Ошибка входа. Проверьте данные.");
      console.error("Login error:", err);
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
      
      {error && (
        <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Почта</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="roman@example.com" 
            required 
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>

          </div>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            required 
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          id="login-button" 
          disabled={loading}
        >
          {loading ? "Секунду..." : "Войти"}
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