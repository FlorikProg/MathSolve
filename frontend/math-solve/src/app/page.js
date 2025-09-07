"use client"

import { useState, useEffect } from "react"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Calculator,
  BookOpen,
  Target,
  Users,
  BarChart,
  Award,
} from "lucide-react"
import Image from "next/image"

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  }

  return <div className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</div>
}

const Card = ({ children, className = "" }) => {
  return <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>
}

const useSimpleTheme = () => {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Используем состояние вместо localStorage для Claude.ai
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return { theme, setTheme: toggleTheme, mounted }
}

export default function MathSolveLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme: toggleTheme, mounted } = useSimpleTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    function Start() {
      window.location.href = "/create_user"
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Математика",
      description: "Сотни задач по алгебре, геометрии, математическому анализу и другим разделам математики.",
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      title: "Физика",
      description: "Задачи по механике, термодинамике, электричеству, оптике и современной физике.",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Информатика",
      description: "Алгоритмы, структуры данных, программирование и компьютерные науки.",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      title: "Автоматическая проверка",
      description: "Мгновенная проверка ответов с подробным объяснением правильного решения.",
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Подробные решения",
      description: "Пошаговые объяснения для каждой задачи помогут понять методы решения.",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      title: "Для всех уровней",
      description: "От школьной программы до университетского уровня - задачи для каждого.",
      icon: <Users className="w-5 h-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="rounded-lg  flex items-center justify-center text-primary-foreground">
               <Image
                              src="/image/logo/logo.jpg"
                              alt="MathSolve Logo"
                              width={40}
                              height={40}
                              className="h-11 w-11"
                              style={{ borderRadius: "50%" }}
                            />
            </div>
            <span className="text-lg">MathSolve</span>
          </div>
          
          <nav className="hidden md:flex gap-6 lg:gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Предметы
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Отзывы
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Цены
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Вопросы
            </a>
          </nav>
          
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <a
              href="/login_user"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Войти
            </a>
            <Button className="rounded-full">
              Начать
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#features" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Предметы
              </a>
              <a href="#testimonials" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Отзывы
              </a>
              <a href="#pricing" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Цены
              </a>
              <a href="#faq" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Вопросы
              </a>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <a href="/login_user" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Войти
                </a>
                <Button className="rounded-full w-full">
                  Начать
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 xl:py-40 overflow-hidden relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
              <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Образовательная платформа
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                сборник задач
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Решайте задачи по математике, физике, информатике. Больше не нужно искать задачи. Сы сделали всё за вас!
                Задачи для 7, задачи для 8 и 9 классов. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Button onClick={Start} size="lg" className="rounded-full h-12 px-8 text-base">
                  Начать решать
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base bg-transparent">
                  Посмотреть демо
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Бесплатно</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Автопроверка</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Подробные решения</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full">
              <div className="rounded-xl">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <img
                    src="/image/start_img/Frame 8.png"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Предметы
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight px-4">
                математика, физика, информатика
              </h2>
              <p className="max-w-4xl text-muted-foreground text-base sm:text-lg px-4">
                автоматическая проверка ответа и подробное решение. всё сделано для того чтобы вам было удобно решать
                задачи
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {features.map((feature, i) => (
                <div key={i}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base flex-grow">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 sm:mb-16">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Как это работает
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight px-4">
                Простой процесс обучения
              </h2>
              <p className="max-w-4xl text-muted-foreground text-base sm:text-lg px-4">
                Начните решать задачи за несколько минут и увидите разницу в своих знаниях.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 md:gap-12 relative max-w-6xl mx-auto">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Выберите предмет",
                  description: "Выберите математику, физику или информатику и найдите подходящие задачи.",
                },
                {
                  step: "02",
                  title: "Решайте задачи",
                  description: "Решайте задачи в удобном интерфейсе с автоматической проверкой ответов.",
                },
                {
                  step: "03",
                  title: "Изучайте решения",
                  description: "Получайте подробные объяснения и улучшайте свои навыки решения задач.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="relative z-10 flex flex-col items-center text-center space-y-4 px-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight px-4">
                Готовы улучшить свои знания?
              </h2>
              <p className="max-w-3xl text-primary-foreground/80 text-base sm:text-lg md:text-xl px-4">
                Присоединяйтесь к тысячам студентов, которые уже улучшили свои навыки решения задач с нашей платформой.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 px-4">
                <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base">
                  Начать бесплатно
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  Посмотреть примеры
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80 mt-4 px-4">
                Бесплатная регистрация. Сотни задач. Подробные решения.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 font-bold">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                 <Image
                                  src="/image/logo/logo.jpg"
                                  alt="MathSolve Logo"
                                  width={40}
                                  height={40}
                                  className="h-11 w-11"
                                  style={{ borderRadius: "50%" }}
                                />
                </div>
                <span>MathSolve</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Сборник задач по математике, физике и информатике. Решайте задачи и улучшайте свои знания.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Предметы</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Математика
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Физика
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Информатика
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Ресурсы</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Справка
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Руководства
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Поддержка
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Компания</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8 mt-8">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              &copy; {new Date().getFullYear()} MathSolve. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}