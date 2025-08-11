import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <div className="flex items-center space-x-12">
          <div className="text-2xl font-bold text-white tracking-tight">StudyLab</div>
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800">
              НАЧАТЬ
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800">
              ПОМОЩЬ
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-white text-black hover:bg-gray-200 font-medium px-6">Начать</Button>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="px-8 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-3 text-sm">
          <span className="font-medium text-white">Математика</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-400">Физика</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-400">Информатика</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero_section px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
            Платформа для практики
            <br />
            <span className="text-gray-400">математических, физических</span>
            <br />
            <span className="text-gray-400">и IT задач</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            StudyLab — это самый быстрый способ изучения точных наук с помощью ИИ-помощника. Лучшая платформа для
            практики и обучения.
          </p>

          {/* Interface Screenshot Placeholder */}
          <div className="mb-20">
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 shadow-2xl">
                <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-gray-500 text-lg">StudyLab Interface Preview</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button className="bg-white text-black hover:bg-gray-200 font-medium px-8 py-3 text-lg">
              Начать бесплатно
            </Button>
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-sm">$</span>
              <code className="bg-gray-800 px-3 py-1 rounded text-sm font-mono">npm install studylab</code>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="px-8 py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">Выберите свой план</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Начните бесплатно или получите полный доступ ко всем возможностям платформы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Бесплатно</h3>
                <div className="text-5xl font-bold text-white mb-2">₽0</div>
                <p className="text-gray-400 mb-8">Для начинающих</p>

                <Button className="w-full mb-8 bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 py-3">
                  Начать бесплатно
                </Button>

                <ul className="text-left space-y-4 text-sm">
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">100 задач в месяц</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Базовые объяснения</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">3 предмета</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-900 rounded-xl p-8 border-2 border-blue-500 relative hover:border-blue-400 transition-colors">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-medium">ПОПУЛЯРНЫЙ</Badge>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Pro</h3>
                <div className="text-5xl font-bold text-white mb-2">
                  ₽990
                  <span className="text-lg text-gray-400 font-normal">/мес</span>
                </div>
                <p className="text-gray-400 mb-8">Для серьёзного изучения</p>

                <Button className="w-full mb-8 bg-blue-500 text-white hover:bg-blue-600 py-3">Попробовать Pro</Button>

                <ul className="text-left space-y-4 text-sm">
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Безлимитные задачи</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">AI Tutor помощник</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Все предметы</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Детальная аналитика</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Приоритетная поддержка</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Team Plan */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Команда</h3>
                <div className="text-5xl font-bold text-white mb-2">
                  ₽2990
                  <span className="text-lg text-gray-400 font-normal">/мес</span>
                </div>
                <p className="text-gray-400 mb-8">Для учебных заведений</p>

                <Button className="w-full mb-8 bg-gray-800 text-white hover:bg-gray-700 border border-gray-600 py-3">
                  Связаться с нами
                </Button>

                <ul className="text-left space-y-4 text-sm">
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">До 50 пользователей</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Все функции Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Управление группами</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Отчёты для преподавателей</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-400 mr-3 h-4 w-4" />
                    <span className="text-gray-300">Персональный менеджер</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6 text-lg">Все планы включают 14-дневный бесплатный период</p>
            <Button variant="link" className="text-white hover:text-gray-300 underline text-lg">
              Сравнить все функции →
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">StudyLab</div>
          <p className="text-gray-400">Платформа для изучения точных наук с помощью искусственного интеллекта</p>
        </div>
      </footer>
    </div>
  )
}
