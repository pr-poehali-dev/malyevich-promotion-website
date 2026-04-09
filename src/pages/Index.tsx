import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_PLASTER = "https://cdn.poehali.dev/projects/f3228ce1-744a-4fad-bab4-b6f8dff8bac2/files/9fa7e5a9-4078-49f0-8b8d-bf96f5a32deb.jpg";
const IMG_PAINT = "https://cdn.poehali.dev/projects/f3228ce1-744a-4fad-bab4-b6f8dff8bac2/files/a053bf07-272c-4796-b7cb-ac07a034bfc6.jpg";

const TICKER_ITEMS = [
  "Шпаклёвка стен", "Безвоздушная покраска", "Механизированное нанесение",
  "Квартиры под ключ", "Коммерческие объекты", "Идеальная поверхность",
  "Быстрые сроки", "Гарантия качества",
];

const ADVANTAGES = [
  { icon: "Zap", title: "В 3 раза быстрее", desc: "Механизированный способ сокращает сроки работ в 3 раза по сравнению с ручным нанесением" },
  { icon: "Layers", title: "Равномерный слой", desc: "Машинное нанесение обеспечивает идеально ровный слой шпаклёвки без перепадов и наплывов" },
  { icon: "Sparkles", title: "Без следов и разводов", desc: "Безвоздушная покраска даёт гладкую, фабричную поверхность без полос и следов валика" },
  { icon: "Wallet", title: "Экономия материала", desc: "Расход краски и шпаклёвки ниже на 20–30% за счёт точного дозирования оборудованием" },
  { icon: "ShieldCheck", title: "Гарантия 2 года", desc: "Даём письменную гарантию на все выполненные работы — отвечаем за результат" },
  { icon: "Building", title: "Любые объёмы", desc: "От однокомнатной квартиры до торгового центра — оборудование справляется с любой площадью" },
];

const SERVICES = [
  {
    img: IMG_PLASTER,
    tag: "Шпаклёвка",
    title: "Механизированная шпаклёвка стен",
    points: [
      "Нанесение гипсовой шпаклёвки аппаратом PFT G4 / G5",
      "Выравнивание стен под обои (2 слоя) и под покраску (3 слоя)",
      "Заделка стыков ГКЛ и трещин",
      "Финишное шлифование до идеальной гладкости",
    ],
    price: "от 250 ₽/м²",
  },
  {
    img: IMG_PAINT,
    tag: "Покраска",
    title: "Безвоздушная покраска стен и потолков",
    points: [
      "Покраска аппаратом GRACO / Wagner без воздуха",
      "Равномерное покрытие без полос и следов",
      "Работа с любыми ЛКМ: латекс, акрил, силикон",
      "Покраска потолков, стен, фасадов, конструкций",
    ],
    price: "от 150 ₽/м²",
  },
];

const PROCESS = [
  { num: "01", title: "Выезд и замер", desc: "Бесплатно выезжаем на объект, оцениваем состояние поверхностей и объём работ" },
  { num: "02", title: "Расчёт и договор", desc: "Считаем точную смету, фиксируем цену в договоре — без доплат и сюрпризов" },
  { num: "03", title: "Подготовка", desc: "Грунтуем, заклеиваем, укрываем — подготавливаем помещение к работе" },
  { num: "04", title: "Выполнение", desc: "Механизированное нанесение шпаклёвки и/или покраска безвоздушным аппаратом" },
  { num: "05", title: "Контроль и сдача", desc: "Проверяем качество при боковом свете, устраняем замечания и сдаём объект" },
];

const PRICES = [
  { service: "Шпаклёвка под обои (2 слоя)", price: "от 250 ₽/м²" },
  { service: "Шпаклёвка под покраску (3 слоя)", price: "от 350 ₽/м²" },
  { service: "Покраска стен (2 слоя)", price: "от 150 ₽/м²" },
  { service: "Покраска потолков (2 слоя)", price: "от 180 ₽/м²" },
  { service: "Грунтовка поверхностей", price: "от 50 ₽/м²" },
  { service: "Заделка стыков ГКЛ", price: "от 120 ₽/п.м." },
  { service: "Шлифовка стен", price: "от 80 ₽/м²" },
  { service: "Комплекс: шпаклёвка + покраска", price: "от 450 ₽/м²" },
];

const STATS = [
  { num: "350+", label: "объектов выполнено" },
  { num: "3×", label: "быстрее ручного способа" },
  { num: "2 года", label: "гарантия на работы" },
  { num: "24 ч", label: "расчёт сметы" },
];

function useVisible(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, v };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, v } = useVisible();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
      style={{ transitionDelay: v ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", area: "", msg: "" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "var(--gray-1)", color: "var(--text-body)" }}>

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(17,17,16,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => go("hero")} className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--orange)" }}>
              <Icon name="Paintbrush" size={16} className="text-white" />
            </div>
            <span className="font-oswald text-lg font-bold tracking-wider text-white">МАЛЕВИЧ</span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {[["services", "Услуги"], ["advantages", "Преимущества"], ["prices", "Цены"], ["process", "Этапы"], ["contacts", "Контакты"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="nav-item">{l}</button>
            ))}
          </nav>

          <button className="btn-primary hidden md:inline-flex py-2.5 px-6 text-xs" onClick={() => go("contacts")}>
            Рассчитать стоимость
          </button>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 py-5 flex flex-col gap-5" style={{ background: "var(--black)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[["services", "Услуги"], ["advantages", "Преимущества"], ["prices", "Цены"], ["process", "Этапы"], ["contacts", "Контакты"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="nav-item text-left">{l}</button>
            ))}
            <button className="btn-primary text-xs" onClick={() => go("contacts")}>Рассчитать стоимость</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--black)" }}>
        <div className="absolute inset-0">
          <img src={IMG_PLASTER} alt="" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(17,17,16,0.97) 35%, rgba(17,17,16,0.6) 100%)" }} />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "var(--orange)" }} />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-tag mb-6 animate-fade-left opacity-0" style={{ animationFillMode: "forwards" }}>
                Механизированная отделка
              </div>

              <h1
                className="font-oswald font-bold text-white leading-none mb-6 animate-fade-up opacity-0 delay-100"
                style={{ animationFillMode: "forwards", fontSize: "clamp(2.6rem, 6.5vw, 5rem)", lineHeight: 1.05 }}
              >
                Шпаклёвка<br />
                <span style={{ color: "var(--orange)" }}>и покраска</span><br />
                стен
              </h1>

              <p
                className="font-ibm leading-relaxed mb-8 animate-fade-up opacity-0 delay-200"
                style={{ animationFillMode: "forwards", color: "rgba(255,255,255,0.55)", maxWidth: "460px", fontSize: "0.95rem" }}
              >
                Механизированное нанесение шпаклёвки и безвоздушная покраска.
                В 3 раза быстрее ручного способа. Идеальная поверхность — без разводов и следов.
              </p>

              <div className="flex flex-wrap gap-3 mb-10 animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
                <button className="btn-primary" onClick={() => go("contacts")}>
                  <Icon name="Calculator" size={16} />
                  Рассчитать стоимость
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => go("services")}
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)" }}
                >
                  Подробнее об услугах
                </button>
              </div>

              {/* Mini stats */}
              <div
                className="flex flex-wrap gap-x-8 gap-y-3 pt-8 animate-fade-up opacity-0 delay-400"
                style={{ animationFillMode: "forwards", borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-oswald font-bold text-2xl" style={{ color: "var(--orange)" }}>{s.num}</div>
                    <div className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image block */}
            <div className="hidden lg:block relative animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
              <div className="relative">
                <img src={IMG_PLASTER} alt="Механизированная шпаклёвка" className="w-full aspect-[4/5] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "linear-gradient(transparent, rgba(17,17,16,0.9))" }}>
                  <div className="font-oswald text-white text-sm font-semibold tracking-wider">МЕХАНИЗИРОВАННОЕ НАНЕСЕНИЕ</div>
                  <div className="font-ibm text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Аппараты PFT G4 / G5</div>
                </div>
              </div>
              {/* Small accent image */}
              <div className="absolute -bottom-6 -left-6 w-36 h-36 border-4" style={{ borderColor: "var(--orange)" }}>
                <img src={IMG_PAINT} alt="Безвоздушная покраска" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <div className="section-tag mb-4">Наши услуги</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Что мы <span style={{ color: "var(--orange)" }}>делаем</span>
            </h2>
          </Reveal>

          <div className="flex flex-col gap-20">
            {SERVICES.map((s, idx) => (
              <Reveal key={s.title}>
                <div className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <div className="relative" style={{ direction: "ltr" }}>
                    <img src={s.img} alt={s.title} className="w-full aspect-[4/3] object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="font-oswald text-xs font-semibold px-3 py-1.5 tracking-widest" style={{ background: "var(--orange)", color: "#fff" }}>
                        {s.tag}
                      </span>
                    </div>
                  </div>

                  <div style={{ direction: "ltr" }}>
                    <h3 className="font-oswald text-2xl font-bold mb-4" style={{ color: "var(--black)" }}>{s.title}</h3>
                    <ul className="flex flex-col gap-3 mb-6">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 shrink-0" style={{ background: "var(--orange)" }} />
                          <span className="font-ibm text-sm" style={{ color: "var(--gray-4)" }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4">
                      <span className="font-oswald text-2xl font-bold" style={{ color: "var(--orange)" }}>{s.price}</span>
                      <button className="btn-primary py-2.5 px-5 text-xs" onClick={() => go("contacts")}>Рассчитать</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24" style={{ background: "var(--gray-1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="section-tag mb-4">Почему мы</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Преимущества <span style={{ color: "var(--orange)" }}>механизации</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="service-card h-full">
                  <div className="w-11 h-11 flex items-center justify-center mb-4" style={{ background: "rgba(240,90,26,0.08)", color: "var(--orange)" }}>
                    <Icon name={a.icon} size={20} fallback="Star" />
                  </div>
                  <h3 className="font-oswald text-lg font-semibold mb-2" style={{ color: "var(--black)" }}>{a.title}</h3>
                  <p className="font-ibm text-sm leading-relaxed" style={{ color: "var(--gray-4)" }}>{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20" style={{ background: "var(--black)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-12 text-center">
            <div className="section-tag justify-center mb-4" style={{ color: "var(--orange)" }}>Сравнение</div>
            <h2 className="font-oswald font-bold text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              Ручной способ <span style={{ color: "var(--gray-4)" }}>vs</span> <span style={{ color: "var(--orange)" }}>механизированный</span>
            </h2>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Manual */}
              <div className="p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-oswald text-lg font-semibold mb-5 tracking-wider" style={{ color: "var(--gray-4)" }}>Ручной способ</div>
                {["Долго — от 5 дней на комнату", "Неравномерный слой, наплывы", "Следы валика и кисти видны", "Большой расход материала", "Зависит от мастерства рабочего"].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <Icon name="X" size={14} className="shrink-0" style={{ color: "#E55050" }} />
                    <span className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Mechanized */}
              <div className="p-7" style={{ background: "rgba(240,90,26,0.08)", border: "1px solid rgba(240,90,26,0.2)" }}>
                <div className="font-oswald text-lg font-semibold mb-5 tracking-wider" style={{ color: "var(--orange)" }}>Механизированный</div>
                {["Быстро — 1–2 дня на комнату", "Идеально ровный слой по всей площади", "Гладкая поверхность без следов", "Экономия материала 20–30%", "Стабильное качество на каждом объекте"].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(240,90,26,0.08)" }}>
                    <Icon name="Check" size={14} className="shrink-0" style={{ color: "var(--orange)" }} />
                    <span className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="section-tag mb-4">Стоимость</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Цены на <span style={{ color: "var(--orange)" }}>работы</span>
            </h2>
            <p className="font-ibm text-sm mt-3" style={{ color: "var(--gray-4)" }}>
              Точная стоимость — после осмотра объекта. Замер бесплатный.
            </p>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden" style={{ border: "1px solid var(--gray-2)" }}>
              {PRICES.map((p, i) => (
                <div
                  key={p.service}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
                  style={{ borderBottom: i < PRICES.length - 1 ? "1px solid var(--gray-2)" : "none" }}
                >
                  <span className="font-ibm text-sm" style={{ color: "var(--text-body)" }}>{p.service}</span>
                  <span className="font-oswald font-bold text-lg shrink-0 ml-4" style={{ color: "var(--orange)" }}>{p.price}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-6">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: "var(--black)" }}>
              <div>
                <p className="font-oswald text-white text-lg font-semibold tracking-wide">Комплексный расчёт — бесплатно</p>
                <p className="font-ibm text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Выезд замерщика, точная смета и фиксация цены в договоре</p>
              </div>
              <button className="btn-primary shrink-0" onClick={() => go("contacts")}>
                <Icon name="Calculator" size={15} />
                Вызвать замерщика
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24" style={{ background: "var(--gray-1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="section-tag mb-4">Как мы работаем</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Этапы работы
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-0">
            {PROCESS.map((s, i) => (
              <Reveal key={s.num} delay={i * 70}>
                <div className="relative pl-5 pb-10 md:pb-0 md:pl-0 md:pr-6">
                  {/* Connecting line */}
                  {i < PROCESS.length - 1 && (
                    <div className="hidden md:block absolute top-5 right-0 left-16 h-px" style={{ background: "var(--gray-2)" }} />
                  )}
                  <div className="step-num" style={{ fontSize: "2.5rem" }}>{s.num}</div>
                  <div className="my-2" style={{ width: "30px", height: "2px", background: "var(--orange)" }} />
                  <h3 className="font-oswald text-base font-semibold mb-1.5" style={{ color: "var(--black)" }}>{s.title}</h3>
                  <p className="font-ibm text-xs leading-relaxed" style={{ color: "var(--gray-4)" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS STRIP */}
      <section className="py-14" style={{ background: "var(--orange)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="text-center">
                  <div className="font-oswald font-bold text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>{s.num}</div>
                  <div className="font-ibm text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "var(--black)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-oswald font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Идеальные стены —<br /><span style={{ color: "var(--orange)" }}>без переплат за сроки</span>
            </h2>
            <p className="font-ibm text-white mb-8 mx-auto" style={{ opacity: 0.55, maxWidth: "520px", fontSize: "0.95rem" }}>
              Оставьте заявку — рассчитаем стоимость за 1 час. Замер бесплатно.
            </p>
            <button className="btn-primary" onClick={() => go("contacts")}>
              <Icon name="ArrowRight" size={16} />
              Получить расчёт
            </button>
          </Reveal>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="section-tag mb-5" style={{ color: "var(--orange)" }}>Заявка</div>
              <h2 className="font-oswald font-bold text-white mb-3" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
                Бесплатный замер<br />
                <span style={{ color: "var(--orange)" }}>и расчёт за 1 час</span>
              </h2>
              <p className="font-ibm text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
                Оставьте контакты — перезвоним, обсудим объём работ и назовём точную цену.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: "Phone", val: "+7 (900) 000-00-00" },
                  { icon: "MessageCircle", val: "Telegram / WhatsApp" },
                  { icon: "MapPin", val: "Москва и МО" },
                  { icon: "Clock", val: "Пн–Вс, 8:00–21:00" },
                ].map((c) => (
                  <div key={c.val} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "rgba(240,90,26,0.12)", color: "var(--orange)" }}>
                      <Icon name={c.icon} size={16} fallback="Info" />
                    </div>
                    <span className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{c.val}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {["Договор", "Гарантия 2 года", "Фиксированная цена"].map((b) => (
                  <span
                    key={b}
                    className="font-ibm text-xs px-3 py-1.5"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex flex-col gap-3">
                <input
                  className="field-dark"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="field-dark"
                  placeholder="Телефон"
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  className="field-dark"
                  placeholder="Площадь (м²) — примерно"
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                />
                <textarea
                  className="field-dark resize-none"
                  placeholder="Что нужно сделать? Например: шпаклёвка под покраску, 3-комнатная квартира, новостройка"
                  rows={4}
                  value={form.msg}
                  onChange={e => setForm({ ...form, msg: e.target.value })}
                />
                <button className="btn-primary mt-1">
                  <Icon name="Send" size={15} />
                  Отправить заявку
                </button>
                <p className="font-ibm text-xs text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6" style={{ background: "var(--black)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center" style={{ background: "var(--orange)" }}>
              <Icon name="Paintbrush" size={11} className="text-white" />
            </div>
            <span className="font-oswald text-base font-bold tracking-wider text-white">МАЛЕВИЧ</span>
          </div>
          <div className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2024 Малевич. Механизированная шпаклёвка и безвоздушная покраска.
          </div>
          <div className="flex gap-6">
            {[["services", "Услуги"], ["prices", "Цены"], ["contacts", "Контакты"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="nav-item" style={{ fontSize: "0.7rem" }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
