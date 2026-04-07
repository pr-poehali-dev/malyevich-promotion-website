import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_IMAGE = "https://cdn.poehali.dev/projects/f3228ce1-744a-4fad-bab4-b6f8dff8bac2/files/a5ce2829-e3a2-44d1-b9a4-0eed412134f5.jpg";

const WORK_TYPES = [
  { id: "plaster", label: "Штукатурка стен", price: 650, icon: "Layers" },
  { id: "tile", label: "Укладка плитки", price: 1800, icon: "Grid3x3" },
  { id: "paint", label: "Покраска", price: 450, icon: "Palette" },
  { id: "wallpaper", label: "Поклейка обоев", price: 550, icon: "ScrollText" },
  { id: "floor", label: "Укладка полов", price: 1200, icon: "Square" },
  { id: "ceiling", label: "Натяжные потолки", price: 900, icon: "PanelTop" },
  { id: "complex", label: "Комплексный ремонт", price: 4500, icon: "Home" },
];

const PORTFOLIO_ITEMS = [
  { title: "Квартира на Пречистенке", type: "Комплексный ремонт", area: "120 м²", year: "2024" },
  { title: "Пентхаус Москва-Сити", type: "Дизайнерская отделка", area: "280 м²", year: "2024" },
  { title: "Загородный дом", type: "Полная отделка", area: "350 м²", year: "2023" },
  { title: "Офис в центре", type: "Коммерческая отделка", area: "500 м²", year: "2023" },
  { title: "Апартаменты Садовое", type: "Элитный ремонт", area: "95 м²", year: "2023" },
  { title: "Вилла Рублёвка", type: "Отделка под ключ", area: "600 м²", year: "2022" },
];

const REVIEWS = [
  {
    name: "Александр В.",
    role: "Владелец апартаментов",
    text: "Малевич — это не просто ремонт, это искусство. Каждая деталь продумана, каждый стык идеален. Работают как настоящие мастера своего дела.",
    rating: 5,
  },
  {
    name: "Марина К.",
    role: "Дизайнер интерьеров",
    text: "Сотрудничаю с командой уже 3 года. Единственные, кто воплощает мои проекты именно так, как задумано. Никаких отступлений от чертежей.",
    rating: 5,
  },
  {
    name: "Дмитрий О.",
    role: "Застройщик",
    text: "Сдали объект на 2 недели раньше срока без единого замечания со стороны комиссии. Качество работ превзошло ожидания.",
    rating: 5,
  },
];

const SERVICES = [
  {
    icon: "Layers",
    title: "Черновая отделка",
    desc: "Выравнивание стен, полов и потолков. Подготовка поверхностей под финишную отделку по европейским стандартам.",
    price: "от 450 ₽/м²",
  },
  {
    icon: "Sparkles",
    title: "Чистовая отделка",
    desc: "Финишные работы любой сложности: декоративная штукатурка, роспись, эксклюзивные покрытия.",
    price: "от 900 ₽/м²",
  },
  {
    icon: "Home",
    title: "Ремонт под ключ",
    desc: "Полный цикл от демонтажа до финишной уборки. Фиксированная стоимость, гарантия результата.",
    price: "от 4 500 ₽/м²",
  },
  {
    icon: "Building2",
    title: "Коммерческие объекты",
    desc: "Офисы, торговые площади, рестораны. Работаем круглосуточно для соблюдения сроков сдачи.",
    price: "от 2 000 ₽/м²",
  },
  {
    icon: "Grid3x3",
    title: "Плиточные работы",
    desc: "Укладка плитки, мозаики, керамогранита. Работа со сложными рисунками и нестандартными форматами.",
    price: "от 1 800 ₽/м²",
  },
  {
    icon: "Zap",
    title: "Срочный ремонт",
    desc: "Ремонт в сжатые сроки без потери качества. Увеличенная бригада, работа 24/7.",
    price: "Индивидуально",
  },
];

function useIntersection(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workType, setWorkType] = useState(WORK_TYPES[0]);
  const [area, setArea] = useState(50);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const total = workType.price * area;
  const formatted = total.toLocaleString("ru-RU");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)", color: "var(--text-primary)" }}>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4 border-b border-white/5" : "py-6"
        }`}
        style={{ background: scrolled ? "rgba(13,11,9,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <span className="font-cormorant text-2xl font-light tracking-widest" style={{ color: "var(--gold-light)" }}>
              М
            </span>
            <span className="font-cormorant text-lg font-light tracking-[0.3em] uppercase" style={{ color: "var(--text-primary)" }}>
              Малевич
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[["about", "О нас"], ["services", "Услуги"], ["portfolio", "Портфолио"], ["reviews", "Отзывы"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>
            ))}
          </div>

          <button className="btn-gold hidden md:block" onClick={() => scrollTo("contacts")}>
            Связаться
          </button>

          <button
            className="md:hidden"
            style={{ color: "var(--gold)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 py-4 flex flex-col gap-4 border-t"
            style={{ background: "rgba(13,11,9,0.98)", borderColor: "rgba(201,168,76,0.1)" }}
          >
            {[["about", "О нас"], ["services", "Услуги"], ["portfolio", "Портфолио"], ["calculator", "Калькулятор"], ["reviews", "Отзывы"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-left">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={PORTFOLIO_IMAGE}
            alt="hero"
            className="w-full h-full object-cover"
            style={{ opacity: 0.25 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.6) 50%, rgba(13,11,9,0.9) 100%)" }} />
        </div>

        <div className="absolute top-0 right-16 w-px h-full opacity-10" style={{ background: "var(--gold)" }} />
        <div className="absolute top-1/2 right-10 w-24 h-px opacity-20" style={{ background: "var(--gold)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
          <div className="max-w-3xl">
            <div className="section-label mb-8 animate-fade-in-left opacity-0" style={{ animationFillMode: "forwards" }}>
              Отделочные работы премиум-класса
            </div>

            <h1 className="font-cormorant font-light leading-none mb-6 animate-fade-in-up opacity-0 delay-200"
              style={{ animationFillMode: "forwards", fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              Мастерство<br />
              <em className="font-light italic" style={{ color: "var(--gold)" }}>в каждой</em><br />
              детали
            </h1>

            <p className="font-golos text-base leading-relaxed mb-10 max-w-xl animate-fade-in-up opacity-0 delay-300"
              style={{ animationFillMode: "forwards", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Более 500 реализованных проектов в Москве и Подмосковье.
              Работаем с объектами любой сложности — от квартир до коммерческих пространств.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-400" style={{ animationFillMode: "forwards" }}>
              <button className="btn-gold" onClick={() => scrollTo("calculator")}>
                Рассчитать стоимость
              </button>
              <button className="btn-outline-gold" onClick={() => scrollTo("portfolio")}>
                Смотреть работы
              </button>
            </div>
          </div>

          <div
            className="mt-20 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up opacity-0 delay-500"
            style={{ animationFillMode: "forwards", borderTop: "1px solid rgba(201,168,76,0.15)" }}
          >
            {[["500+", "Проектов"], ["12", "Лет опыта"], ["98%", "Довольных клиентов"], ["3 года", "Гарантия"]].map(([num, label]) => (
              <div key={label}>
                <div className="stat-number">{num}</div>
                <div className="font-golos text-xs mt-1 uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="section-label mb-6">О компании</div>
              <h2 className="font-cormorant font-light leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                12 лет создаём<br />
                <em className="italic" style={{ color: "var(--gold)" }}>безупречные</em><br />
                пространства
              </h2>
              <p className="font-golos leading-relaxed mb-5" style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Компания «Малевич» — это команда профессионалов, для которых отделка — не просто работа, а призвание. Мы верим, что качественное пространство меняет качество жизни.
              </p>
              <p className="font-golos leading-relaxed mb-8" style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Каждый проект мы воспринимаем как возможность создать нечто выдающееся. Именно поэтому наши клиенты возвращаются снова и рекомендуют нас друзьям.
              </p>
              <button className="btn-outline-gold" onClick={() => scrollTo("contacts")}>
                Познакомиться
              </button>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                <img
                  src={PORTFOLIO_IMAGE}
                  alt="about"
                  className="w-full aspect-[4/5] object-cover"
                  style={{ filter: "brightness(0.8)" }}
                />
                <div
                  className="absolute -bottom-6 -left-6 p-6"
                  style={{ background: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <div className="font-cormorant text-5xl font-light" style={{ color: "var(--gold)" }}>12</div>
                  <div className="font-golos text-xs uppercase tracking-widest mt-1" style={{ color: "var(--text-secondary)" }}>лет опыта</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="gold-line mx-6 opacity-20" />

      {/* SERVICES */}
      <section id="services" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16 text-center">
            <div className="section-label justify-center mb-4">Услуги</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Полный спектр<br />отделочных работ
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <AnimatedSection key={s.title}>
                <div
                  className="p-6 h-full transition-all duration-300 cursor-pointer"
                  style={{
                    background: "var(--dark-card)",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)")}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{ background: "rgba(201,168,76,0.08)", color: "var(--gold)" }}
                  >
                    <Icon name={s.icon} size={18} fallback="Star" />
                  </div>
                  <h3 className="font-cormorant text-xl font-medium mb-2">{s.title}</h3>
                  <p className="font-golos text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                  <div className="font-golos text-sm font-semibold" style={{ color: "var(--gold)" }}>{s.price}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28" style={{ background: "var(--dark-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="section-label mb-4">Портфолио</div>
              <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                Наши работы
              </h2>
            </div>
            <p className="font-golos text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Каждый проект — история о доверии, точности и красоте
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <AnimatedSection key={item.title}>
                <div className="portfolio-card" style={{ aspectRatio: i === 0 || i === 3 ? "3/4" : "1/1" }}>
                  <img
                    src={PORTFOLIO_IMAGE}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="overlay" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="font-golos text-xs uppercase tracking-widest mb-1" style={{ color: "var(--gold)" }}>{item.type}</div>
                    <div className="font-cormorant text-xl font-medium">{item.title}</div>
                    <div className="flex gap-4 mt-2">
                      <span className="font-golos text-xs" style={{ color: "var(--text-secondary)" }}>{item.area}</span>
                      <span className="font-golos text-xs" style={{ color: "var(--text-secondary)" }}>{item.year}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="mb-16 text-center">
            <div className="section-label justify-center mb-4">Калькулятор</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Рассчитайте<br />стоимость работ
            </h2>
            <p className="font-golos text-sm mt-4 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              Предварительный расчёт. Точная стоимость определяется после выезда специалиста.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="calc-card">
              <div className="calc-inner">
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="font-cormorant text-xl font-medium mb-6">Тип работ</h3>
                    <div className="flex flex-col gap-2">
                      {WORK_TYPES.map((w) => (
                        <button
                          key={w.id}
                          onClick={() => setWorkType(w)}
                          className="flex items-center gap-3 px-4 py-3 text-left transition-all duration-200"
                          style={{
                            background: workType.id === w.id ? "rgba(201,168,76,0.1)" : "transparent",
                            border: `1px solid ${workType.id === w.id ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.05)"}`,
                            color: workType.id === w.id ? "var(--gold-light)" : "var(--text-secondary)",
                          }}
                        >
                          <Icon name={w.icon} size={14} fallback="Star" />
                          <span className="font-golos text-sm">{w.label}</span>
                          <span className="ml-auto font-golos text-xs">{w.price.toLocaleString("ru-RU")} ₽/м²</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-cormorant text-xl font-medium mb-6">Площадь помещения</h3>
                      <div className="mb-2 flex items-end justify-between">
                        <span className="font-golos text-sm" style={{ color: "var(--text-secondary)" }}>Площадь</span>
                        <span className="font-cormorant text-4xl font-light" style={{ color: "var(--gold)" }}>{area} <span className="text-xl">м²</span></span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={500}
                        step={5}
                        value={area}
                        onChange={e => setArea(Number(e.target.value))}
                        className="w-full my-4"
                      />
                      <div className="flex justify-between">
                        <span className="font-golos text-xs" style={{ color: "var(--text-secondary)" }}>10 м²</span>
                        <span className="font-golos text-xs" style={{ color: "var(--text-secondary)" }}>500 м²</span>
                      </div>
                    </div>

                    <div
                      className="mt-8 p-6"
                      style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      <div className="font-golos text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>
                        {workType.label} · {area} м²
                      </div>
                      <div className="font-cormorant font-light mb-1" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--gold)" }}>
                        {formatted} ₽
                      </div>
                      <div className="font-golos text-xs mb-6" style={{ color: "var(--text-secondary)" }}>
                        Предварительный расчёт
                      </div>
                      <button className="btn-gold w-full" onClick={() => scrollTo("contacts")}>
                        Получить точный расчёт
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28" style={{ background: "var(--dark-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16 text-center">
            <div className="section-label justify-center mb-4">Отзывы</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Что говорят<br />наши клиенты
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <AnimatedSection key={r.name}>
                <div className="review-card h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} style={{ color: "var(--gold)", fontSize: "0.75rem" }}>★</span>
                    ))}
                  </div>
                  <p className="font-golos text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {r.text}
                  </p>
                  <div className="mt-auto">
                    <div className="font-cormorant text-lg font-medium">{r.name}</div>
                    <div className="font-golos text-xs uppercase tracking-widest" style={{ color: "var(--gold)" }}>{r.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.3) 0%, transparent 60%)" }}
        />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <div className="section-label justify-center mb-4">Контакты</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Начнём ваш проект
            </h2>
            <p className="font-golos text-sm mt-4 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              Оставьте заявку — мы перезвоним в течение 15 минут и ответим на все вопросы
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className="p-8"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <h3 className="font-cormorant text-2xl font-medium mb-6">Оставить заявку</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { placeholder: "Ваше имя", type: "text" },
                    { placeholder: "Телефон", type: "tel" },
                    { placeholder: "Email", type: "email" },
                  ].map((f) => (
                    <input
                      key={f.placeholder}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 font-golos text-sm outline-none transition-all duration-200"
                      style={{
                        background: "var(--dark-surface)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
                    />
                  ))}
                  <textarea
                    placeholder="Опишите ваш проект"
                    rows={3}
                    className="w-full px-4 py-3 font-golos text-sm outline-none resize-none transition-all duration-200"
                    style={{
                      background: "var(--dark-surface)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
                  />
                  <button className="btn-gold mt-2">
                    Отправить заявку
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@malevich.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, Пречистенская набережная, 11" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Вс: 9:00 — 21:00" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="flex items-start gap-4 p-5"
                    style={{ background: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.08)" }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center shrink-0"
                      style={{ background: "rgba(201,168,76,0.08)", color: "var(--gold)" }}
                    >
                      <Icon name={c.icon} size={16} fallback="Info" />
                    </div>
                    <div>
                      <div className="font-golos text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>{c.label}</div>
                      <div className="font-golos text-sm">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-cormorant text-xl font-light tracking-widest" style={{ color: "var(--gold)" }}>М</span>
            <span className="font-cormorant text-base tracking-[0.25em] uppercase" style={{ color: "var(--text-secondary)" }}>Малевич</span>
          </div>
          <div className="font-golos text-xs" style={{ color: "var(--text-secondary)" }}>
            © 2024 Малевич. Все права защищены.
          </div>
          <div className="flex gap-6">
            {[["about", "О нас"], ["services", "Услуги"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link" style={{ fontSize: "0.7rem" }}>{label}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
