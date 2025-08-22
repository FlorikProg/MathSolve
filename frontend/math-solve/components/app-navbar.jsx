import React, { useEffect } from "react";
import { useState } from "react";
import { User, Trophy, Target, Calendar, User2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "./ui/input";

export default function NavBar({is_search}) {
  const [display, setDisplay] = React.useState("none")
  React.useEffect(() => {
    if (is_search) {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  }, [is_search]);

  console.log(display)

  return (
    <div className="border-b">
      <div className="px-10 pt-5 pb-4 flex justify-between items-center">
        {/* Лого */}
        <p className="text-xl font-semibold text-primary">MathSolve</p>
        
        <div className="w-100" style={{display: display}}>
          <Input placeholder="Введите имя задачи"></Input>
        </div>
        <div className="flex items-center gap-9 text-muted-foreground">
          <p className="cursor-pointer hover:text-primary transition-colors text-sm">
            Выбрать предмет
          </p>
          <p className="cursor-pointer hover:text-primary transition-colors text-sm">
            Домой
          </p>
          <p className="cursor-pointer hover:text-primary transition-colors text-sm">
            Профиль
          </p>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">профиль</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="start">
                {/* Профиль пользователя */}
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      АИ
                    </div>
                    <div>
                      <p className="font-semibold">Анна Иванова</p>
                      <p className="text-sm text-muted-foreground">anna.ivanova@example.com</p>
                    </div>
                  </div>
                  
                  {/* Статистика */}
                  <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
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
                  </div>
                </div>
                
                
             
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}