import React, { useEffect } from "react";
import { User, Trophy, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import Link from "next/link";
import { GetUserApi } from "@/src/features/api/users";

export default function NavBar({ is_search }) {
  const [display, setDisplay] = React.useState("none");
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    if (is_search) {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  }, [is_search]);
 React.useEffect(() => {
  async function FetchUser() {
    try {
      const data = await GetUserApi(); // Ждём Promise
      console.log(data); // { user: [{name, email}] }
      setUserName(data.user[0].name);
      setEmail(data.user[0].email);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  }
  FetchUser();
}, []);

  return (
    <div className="border-b">
      <div className="px-4 sm:px-10 pt-5 pb-4 flex justify-between items-center">
        <Link href="/home">
          <p className="text-xl font-semibold text-primary flex">MathSolve</p>
        </Link>

        <div className={`flex-1 mx-4 sm:mx-10`} style={{ display: display }}>
          <Input placeholder="Введите имя задачи" />
        </div>

        {/* Меню */}
        <div className="flex items-center gap-4 sm:gap-9 text-muted-foreground">
          {/* Скрыть текстовые ссылки на мобильных */}
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <Link
              href={"/choice"}
              className="cursor-pointer hover:text-primary transition-colors"
            >
              Выбрать предмет
            </Link>
            <Link
              href={"/"}
              className="cursor-pointer hover:text-primary transition-colors"
            >
              Домой
            </Link>
            <Link
              href={"https://t.me/RomanLoginov101?text=Здравствуйте! Пишу по поводу MathSolve, нужна небольшая помощь/поддержка."}
              className="cursor-pointer hover:text-primary transition-colors"
            >
              Поддержка
            </Link>
          </div>

          {/* Кнопка профиля */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <User className="sm:hidden w-5 h-5" /> {/* Иконка на мобилке */}
                <span className="hidden sm:inline">профиль</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 sm:w-80" align="start">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3 mt-3">
                  <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center text-white font-medium">
                    {username[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{username}</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                </div>
                <p className="opacity-40">Скоро тут будет статистика 📈</p>

                {/* <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-lg font-bold">142</p>
                    <p className="text-xs text-muted-foreground">Решено</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-lg font-bold">89%</p>
                    <p className="text-xs text-muted-foreground">Точность</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-lg font-bold">15</p>
                    <p className="text-xs text-muted-foreground">Дней подряд</p>
                  </div>
                </div> */}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
