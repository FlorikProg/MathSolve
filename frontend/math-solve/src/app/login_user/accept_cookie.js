"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function AcceptCookie() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <Checkbox id="notifications" />
        <Label htmlFor="notifications">Хочу получать системные уведомления на почту</Label>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox id="cookies" defaultChecked />
        <div className="grid gap-1">
          <Label htmlFor="cookies">Принимаю использование куки-файлов</Label>
          <p className="text-muted-foreground text-sm">
            Этот сайт использует куки для улучшения вашего опыта. Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">Enable notifications (disabled)</Label>
      </div>

      <Label className="group flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle"
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm font-medium leading-none">Enable notifications</p>
          <p className="text-muted-foreground text-sm">You can enable or disable notifications at any time.</p>
        </div>
      </Label>
    </div>
  )
}
