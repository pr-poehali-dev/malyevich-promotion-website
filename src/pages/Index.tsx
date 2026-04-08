import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/f3228ce1-744a-4fad-bab4-b6f8dff8bac2/files/185cc81e-b689-4fcf-947b-f6649a0de40b.jpg";

const TICKER_ITEMS = [
  "Больше заявок", "Меньше потерь", "Порядок в CRM",
  "Готовые сметы", "Обработка звонков", "Менеджер на аутсорсе",
  "Больше договоров", "Меньше хаоса", "Рост среднего чека",
];

const PAINS = [
  { quote: "Сегодня есть объекты, а что через месяц — непонятно", label: "Нестабильный поток заказов" },
  { quote: "Люди пишут, а мы не всегда успеваем ответить", label: "Заявки теряются и сливаются" },
  { quote: "После сметы — тишина. Клиент ушёл к тем, кто дешевле", label: "Низкая конверсия в договор" },
  { quote: "Я всё тяну сам: прораб, продавец, маркетолог, диспетчер", label: "Собственник работает за всех" },
  { quote: "Хорошо делаем, но нормально показать не можем", label: "Нет упаковки и портфолио" },
  { quote: "На сметы уходит куча времени, иногда что-то забываем", label: "Сметы — медленно и с ошибками" },
];

const SERVICES = [
  {
    icon: "PhoneCall",
    title: "Обработка заявок",
    desc: "Отвечаем на все входящие звонки, сообщения из WhatsApp, Telegram, Авито — записываем клиентов на замер. Пока вы на объекте.",
    tag: "Горячее",
  },
  {
    icon: "TrendingUp",
    title: "Лидогенерация",
    desc: "Настраиваем рекламу, Авито, квизы и лендинг под вашу бригаду. Приводим целевые заявки на ремонт квартир.",
    tag: null,
  },
  {
    icon: "Users",
    title: "Менеджер по продажам",
    desc: "Квалифицируем лида, работаем с возражениями, дожимаем после сметы — доводим до подписания договора.",
    tag: null,
  },
  {
    icon: "FileText",
    title: "Сметы и КП",
    desc: "Готовим профессиональные сметы быстро и без ошибок. Клиенту приходит понятный расчёт — ему проще решиться.",
    tag: null,
  },
  {
    icon: "LayoutDashboard",
    title: "CRM под ключ",
    desc: "Внедряем и ведём CRM: карточки клиентов, этапы воронки, напоминания. Ни один лид не потеряется.",
    tag: null,
  },
  {
    icon: "Megaphone",
    title: "Упаковка бригады",
    desc: "Сайт, Авито, кейсы до/после, отзывы, соцсети. Упаковываем так, чтобы вам доверяли до первого звонка.",
    tag: null,
  },
];

const PACKAGES = [
  {
    name: "Старт",
    price: "19 900",
    period: "/ месяц",
    desc: "Для бригад, которым нужен стабильный поток заявок",
    features: ["Обработка входящих заявок", "Запись на замер", "Ведение CRM", "Отчёт по лидам"],
    featured: false,
  },
  {
    name: "Рост",
    price: "39 900",
    period: "/ месяц",
    desc: "Для тех, кто хочет больше договоров без роста рекламного бюджета",
    features: ["Всё из «Старт»", "Менеджер по продажам", "Дожим после сметы", "Скрипты продаж", "Авито + лендинг"],
    featured: true,
  },
  {
    name: "Офис",
    price: "69 900",
    period: "/ месяц",
    desc: "Полный аутсорс офисных функций для компаний 5–15 человек",
    features: ["Всё из «Рост»", "Сметы и КП", "Упаковка компании", "Контент и соцсети", "Еженедельные отчёты"],
    featured: false,
  },
];

const STEPS = [
  { num: "01", title: "Заявка и звонок", desc: "Оставляете заявку. Мы созваниваемся в течение 15 минут, обсуждаем вашу ситуацию и цели." },
  { num: "02", title: "Аудит и план", desc: "Разбираем текущую воронку, смотрим, где теряете заявки, и предлагаем конкретный план." },
  { num: "03", title: "Запуск за 3 дня", desc: "Подключаемся к вашим каналам, настраиваем инструменты и начинаем работать." },
  { num: "04", title: "Результат и отчёт", desc: "Каждую неделю — отчёт: сколько заявок, замеров, договоров. Прозрачно и по делу." },
];

const RESULTS = [
  { num: "×2.4", label: "рост заявок в среднем за 2 месяца" },
  { num: "68%", label: "конверсия из заявки в замер" },
  { num: "3 дня", label: "до первых результатов после запуска" },
  { num: "120+", label: "ремонтных бригад работают с нами" },
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
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", msg: "" });

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
          background: scrolled ? "rgba(17,17,16,0.97)" : "var(--black)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => go("hero")} className="flex items-center gap-1">
            <span className="font-oswald text-xl font-bold tracking-wider" style={{ color: "var(--orange)" }}>РЕМ</span>
            <span className="font-oswald text-xl font-light tracking-wider text-white">ОФИС</span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {[["pains", "Проблемы"], ["services", "Услуги"], ["packages", "Тарифы"], ["how", "Как работаем"], ["contacts", "Контакты"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="nav-item">{l}</button>
            ))}
          </nav>

          <button className="btn-primary hidden md:inline-flex py-2.5 px-6 text-xs" onClick={() => go("contacts")}>
            Получить консультацию
          </button>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 py-5 flex flex-col gap-5" style={{ background: "var(--black)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[["pains", "Проблемы"], ["services", "Услуги"], ["packages", "Тарифы"], ["how", "Как работаем"], ["contacts", "Контакты"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="nav-item text-left">{l}</button>
            ))}
            <button className="btn-primary text-xs" onClick={() => go("contacts")}>Получить консультацию</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--black)" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(17,17,16,0.98) 40%, rgba(17,17,16,0.7) 100%)" }} />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "var(--orange)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="section-tag mb-6 animate-fade-left opacity-0" style={{ animationFillMode: "forwards", color: "var(--orange)" }}>
              Аутсорс для ремонтных бригад
            </div>

            <h1
              className="font-oswald font-bold text-white leading-none mb-6 animate-fade-up opacity-0 delay-100"
              style={{ animationFillMode: "forwards", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05 }}
            >
              Пока вы<br />
              <span style={{ color: "var(--orange)" }}>на объекте —</span><br />
              мы закрываем<br />
              ваш офис
            </h1>

            <p
              className="font-ibm text-base leading-relaxed mb-8 animate-fade-up opacity-0 delay-200"
              style={{ animationFillMode: "forwards", color: "rgba(255,255,255,0.6)", maxWidth: "520px", fontSize: "0.95rem" }}
            >
              Берём на себя обработку заявок, сметы, продажи, CRM и упаковку.
              Вы делаете ремонт — мы делаем так, чтобы следующий объект уже был записан.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
              <button className="btn-primary" onClick={() => go("contacts")}>
                <Icon name="ArrowRight" size={16} />
                Хочу больше заказов
              </button>
              <button
                className="btn-secondary"
                onClick={() => go("packages")}
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)" }}
              >
                Посмотреть тарифы
              </button>
            </div>

            <div
              className="mt-12 pt-8 flex flex-wrap gap-x-10 gap-y-4 animate-fade-up opacity-0 delay-400"
              style={{ animationFillMode: "forwards", borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {RESULTS.map((r) => (
                <div key={r.label}>
                  <div className="result-num" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>{r.num}</div>
                  <div className="font-ibm text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "140px", lineHeight: 1.4 }}>{r.label}</div>
                </div>
              ))}
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

      {/* PAINS */}
      <section id="pains" className="py-24" style={{ background: "var(--gray-1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="section-tag mb-4">Узнаёте себя?</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Типичный день <span style={{ color: "var(--orange)" }}>прораба</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAINS.map((p, i) => (
              <Reveal key={p.label} delay={i * 60}>
                <div className="pain-card">
                  <p className="font-ibm text-sm italic mb-3" style={{ color: "var(--gray-4)" }}>
                    «{p.quote}»
                  </p>
                  <div className="font-oswald text-sm font-semibold" style={{ color: "var(--black)", letterSpacing: "0.05em" }}>
                    → {p.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: "var(--black)" }}>
              <p className="font-ibm text-white text-base" style={{ maxWidth: "560px" }}>
                <strong style={{ color: "var(--orange)" }}>Это нормально — на старте.</strong>{" "}
                Но это не должно продолжаться вечно. Всё это можно делегировать.
              </p>
              <button className="btn-primary shrink-0" onClick={() => go("contacts")}>
                Хочу делегировать
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="section-tag mb-4">Что мы берём на себя</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Услуги
            </h2>
            <p className="font-ibm text-sm mt-3" style={{ color: "var(--gray-4)", maxWidth: "480px" }}>
              Берём ровно те функции, которые отнимают время у собственника — и не требуют строителя на месте.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="service-card h-full">
                  {s.tag && (
                    <span className="inline-block font-oswald text-xs font-semibold px-2 py-0.5 mb-4" style={{ background: "var(--orange)", color: "#fff", letterSpacing: "0.08em" }}>
                      {s.tag}
                    </span>
                  )}
                  <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ background: "rgba(240,90,26,0.08)", color: "var(--orange)" }}>
                    <Icon name={s.icon} size={18} fallback="Star" />
                  </div>
                  <h3 className="font-oswald text-lg font-semibold mb-2" style={{ color: "var(--black)" }}>{s.title}</h3>
                  <p className="font-ibm text-sm leading-relaxed" style={{ color: "var(--gray-4)" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-24" style={{ background: "var(--gray-1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="section-tag mb-4">Стоимость</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Тарифы
            </h2>
            <p className="font-ibm text-sm mt-3" style={{ color: "var(--gray-4)" }}>
              Фиксированная оплата. Без скрытых процентов и сюрпризов.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className={`package-card h-full flex flex-col ${p.featured ? "featured" : ""}`}>
                  {p.featured && (
                    <div className="font-oswald text-xs font-semibold tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                      ★ ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <div className="font-oswald text-2xl font-bold mb-1 tracking-wide" style={{ color: p.featured ? "#fff" : "var(--orange)" }}>
                    {p.name}
                  </div>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="font-oswald font-bold" style={{ fontSize: "2.4rem", lineHeight: 1, color: "#fff" }}>{p.price} ₽</span>
                    <span className="font-ibm text-sm mb-1" style={{ color: p.featured ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)" }}>{p.period}</span>
                  </div>
                  <p className="font-ibm text-sm mb-5" style={{ color: p.featured ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)" }}>
                    {p.desc}
                  </p>
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span style={{ color: p.featured ? "#fff" : "var(--orange)" }}>✓</span>
                        <span className="font-ibm text-sm" style={{ color: p.featured ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => go("contacts")}
                    className={p.featured ? "btn-white" : "btn-secondary"}
                    style={p.featured ? {} : { borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}
                  >
                    Начать с {p.name}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 text-center">
            <p className="font-ibm text-sm" style={{ color: "var(--gray-4)" }}>
              Нужно что-то другое?{" "}
              <button onClick={() => go("contacts")} style={{ color: "var(--orange)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}>
                Обсудим индивидуально
              </button>
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="section-tag mb-4">Процесс</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--black)" }}>
              Как мы работаем
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div>
                  <div className="step-num">{s.num}</div>
                  <div className="my-3" style={{ width: "40px", height: "2px", background: "var(--gray-2)" }} />
                  <h3 className="font-oswald text-lg font-semibold mb-2" style={{ color: "var(--black)" }}>{s.title}</h3>
                  <p className="font-ibm text-sm leading-relaxed" style={{ color: "var(--gray-4)" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS STRIP */}
      <section className="py-16" style={{ background: "var(--black)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {RESULTS.map((r, i) => (
              <Reveal key={r.label} delay={i * 60}>
                <div className="text-center">
                  <div className="result-num">{r.num}</div>
                  <div className="font-ibm text-xs mt-2" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{r.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "var(--orange)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-oswald font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Хватит тянуть всё на себе
            </h2>
            <p className="font-ibm text-white mb-8 mx-auto" style={{ opacity: 0.85, maxWidth: "500px", fontSize: "0.95rem" }}>
              Первая консультация — бесплатно. Расскажите о вашей ситуации, и мы предложим конкретный план.
            </p>
            <button className="btn-white" onClick={() => go("contacts")}>
              <Icon name="ArrowRight" size={16} />
              Записаться на консультацию
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
                Оставьте заявку —<br />
                <span style={{ color: "var(--orange)" }}>ответим за 15 минут</span>
              </h2>
              <p className="font-ibm text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                Созвонимся, разберём вашу ситуацию и предложим конкретный вариант. Без воды и навязывания.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { icon: "Phone", val: "+7 (900) 000-00-00" },
                  { icon: "MessageCircle", val: "Telegram / WhatsApp" },
                  { icon: "Clock", val: "Пн–Вс, 9:00–21:00" },
                ].map((c) => (
                  <div key={c.val} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: "rgba(240,90,26,0.15)", color: "var(--orange)" }}>
                      <Icon name={c.icon} size={15} fallback="Info" />
                    </div>
                    <span className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{c.val}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex flex-col gap-3">
                <input
                  className="field-dark"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  className="field-dark"
                  placeholder="Телефон или Telegram"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  className="field-dark"
                  placeholder="Город"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                />
                <textarea
                  className="field-dark resize-none"
                  placeholder="Коротко о вашей бригаде: сколько человек, какие объекты, главная проблема"
                  rows={4}
                  value={formData.msg}
                  onChange={e => setFormData({ ...formData, msg: e.target.value })}
                />
                <button className="btn-primary mt-1">
                  <Icon name="Send" size={15} />
                  Отправить заявку
                </button>
                <p className="font-ibm text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 border-t" style={{ background: "var(--black)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <span className="font-oswald text-lg font-bold" style={{ color: "var(--orange)" }}>РЕМ</span>
            <span className="font-oswald text-lg font-light text-white">ОФИС</span>
          </div>
          <div className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2024 РемОфис. Аутсорс для ремонтных бригад.
          </div>
          <div className="flex gap-6">
            {[["pains", "Проблемы"], ["services", "Услуги"], ["packages", "Тарифы"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="nav-item" style={{ fontSize: "0.7rem" }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
