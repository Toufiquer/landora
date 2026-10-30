/*
|-----------------------------------------
| setting up Query.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  categories,
  defaultCards,
  defaultData,
  faqs,
  images,
  parseCards,
  resolveHomeData,
  type HomeData,
} from "./data";

const button =
  "inline-flex min-h-11 items-center justify-center gap-5 rounded-sm bg-[#c6aa70] px-6 text-xs font-semibold uppercase tracking-[.13em] text-[#20392b] transition duration-700 hover:bg-[#e0cca0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6aa70]";
const textLink =
  "inline-flex items-center gap-4 border-b border-[#bda36b] pb-2 text-xs font-semibold uppercase tracking-[.15em] transition duration-700 hover:gap-6";
const wrap = "mx-auto max-w-7xl px-5 sm:px-8";
const eyebrow = "text-[10px] font-semibold uppercase tracking-[.25em] text-[#a78a52]";
const title = "font-serif text-4xl leading-[1.08] tracking-[-.035em] sm:text-5xl lg:text-6xl";
const copy = "text-sm leading-7 text-[#697368] sm:text-base";

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden bg-[#d8d8c9] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={!src.startsWith("https://images.unsplash.com/")}
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
      />
    </div>
  );
}
function SectionHeading({
  index,
  label,
  heading,
  description,
}: {
  index: string;
  label: string;
  heading: string;
  description: string;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span className={eyebrow}>
          {index} / {label}
        </span>
        <span className="h-px w-12 bg-[#c6aa70]" />
      </div>
      <h2 className={`${title} mt-5`}>{heading}</h2>
      <p className={`${copy} mt-5 max-w-xl`}>{description}</p>
    </Reveal>
  );
}
export default function Query({ data }: { data?: Partial<HomeData> }) {
  const own = resolveHomeData(data);
  const saved = parseCards(own.sectionsJson);
  const cards = defaultCards.map((fallback, index) => saved[index] ?? fallback);
  const [filter, setFilter] = useState("All");
  const [slide, setSlide] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [search, setSearch] = useState("All");
  const gallery = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroImages = [own.imageUrl || images.hero, images.interior, images.exterior];
  const visibleCategories = filter === "All" ? categories : categories.filter((item) => item.name === filter);
  const selectFilter = (value: string) => {
    setFilter(value);
    setSlide(0);
  };
  const px = Math.min(300, Math.max(0, Number(own.paddingX) || 0));
  const py = Math.min(300, Math.max(0, Number(own.paddingY) || 0));
  return (
    <div
      className="custom-parent-border overflow-hidden bg-[#fffdf8] text-[#233a2d]"
      style={{ paddingInline: `${px}px`, paddingBlock: `${py}px` }}
    >
      {/* 01 Hero */}
      <section
        ref={hero}
        className="relative isolate min-h-[min(820px,calc(100svh-4rem))] overflow-hidden bg-[#233a2d] text-white"
      >
        <motion.div className="absolute inset-0 -z-10 scale-110" style={reduced ? undefined : { y: heroY }}>
          {heroImages.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: heroSlide === index ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 1.1 }}
            >
              <Photo
                src={src}
                alt={
                  index === 0 && own.imageUrl
                    ? own.imageAlt || defaultData.imageAlt
                    : "Illustrative contemporary residential architecture"
                }
                className="h-full w-full"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10261d]/90 via-[#172c22]/65 to-[#172c22]/20" />
        <div className={`${wrap} flex min-h-[min(820px,calc(100svh-4rem))] flex-col justify-end pb-10 pt-28 sm:pb-14`}>
          <motion.div
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
            className="max-w-3xl"
          >
            {[
              <p className="text-[10px] font-semibold uppercase tracking-[.3em] text-[#e1c58d]" key="eyebrow">
                {own.eyebrow}
              </p>,
              <h1
                className="mt-6 font-serif text-6xl leading-[.98] tracking-[-.045em] sm:text-7xl lg:text-[6.5rem]"
                key="title"
              >
                {own.title}
              </h1>,
              <p className="mt-6 max-w-lg text-base leading-7 text-white/80 sm:text-lg" key="intro">
                {own.intro}
              </p>,
              <div className="mt-8 flex flex-wrap items-center gap-7" key="actions">
                <a className={button} href="#collection">
                  Explore properties <span aria-hidden="true">↗</span>
                </a>
                <Link className={`${textLink} text-white`} href="/contact-us">
                  Schedule a visit <span aria-hidden="true">↗</span>
                </Link>
              </div>,
            ].map((child, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.8 } },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-10 flex max-w-md flex-wrap items-end gap-2">
            <label
              className="min-w-40 flex-1 text-[10px] uppercase tracking-[.18em] text-white/80"
              htmlFor="hero-property-type"
            >
              Explore by property type
              <select
                id="hero-property-type"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-2 w-full rounded-sm border border-white/40 bg-[#233a2d]/90 px-3 py-3 text-sm normal-case tracking-normal text-white"
              >
                {["All", ...categories.map((item) => item.name)].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <a href="#collection" onClick={() => selectFilter(search)} className={button}>
              Explore ↗
            </a>
          </div>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-white/25 pt-5">
            <p className="max-w-sm text-xs leading-5 text-white/70">
              A more thoughtful way to discover land, residences and the possibilities beyond.
            </p>
            <div className="flex items-center gap-3" aria-label="Hero image controls">
              {heroImages.map((_, index) => (
                <Button
                  key={index}
                  size="sm"
                  type="button"
                  aria-label={`Show hero image ${index + 1}`}
                  aria-pressed={heroSlide === index}
                  onClick={() => setHeroSlide(index)}
                  className={`h-8 min-w-8 cursor-pointer rounded-sm border border-white/50 transition duration-700 ${heroSlide === index ? "bg-[#c6aa70] text-[#20392b]" : "bg-transparent text-white hover:bg-white/20"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </Button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[10px] text-white/65">
            Photography is illustrative and does not depict Landora listings.
          </p>
        </div>
      </section>
      {/* 02 Categories */}
      <section className={`${wrap} py-20 sm:py-28`} id="categories">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionHeading
              index="02"
              label="Explore by type"
              heading={cards[0].title}
              description={cards[0].description}
            />
          </div>
          <a href="#collection" className={textLink}>
            View collection <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {categories.map((item, index) => (
            <Reveal key={item.name} className={index % 2 ? "lg:translate-y-8" : ""}>
              <a href="#collection" onClick={() => selectFilter(item.name)} className="group block">
                <div className="relative">
                  <Photo src={item.image} alt={item.alt} className="aspect-[3/4]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#12271d]/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white sm:p-6">
                    <div>
                      <p className="text-[10px] tracking-[.2em] text-[#e1c58d]">0{index + 1} / EXPLORE</p>
                      <h3 className="mt-2 font-serif text-2xl sm:text-3xl">{item.name}</h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className="transition duration-700 group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      {/* 03 Gallery */}
      <section id="collection" className="border-y border-[#eadfca] bg-[#f4f2e9] py-20 sm:py-28">
        <div className={wrap}>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHeading
              index="03"
              label="The collection"
              heading={cards[1].title}
              description={cards[1].description}
            />
            <div className="flex flex-wrap gap-2" aria-label="Filter illustrative gallery">
              {["All", ...categories.map((item) => item.name)].map((item) => (
                <Button
                  key={item}
                  type="button"
                  size="sm"
                  aria-pressed={filter === item}
                  onClick={() => selectFilter(item)}
                  className={`cursor-pointer rounded-sm border border-[#d4c7aa] transition duration-700 ${filter === item ? "bg-[#314a37] text-white hover:bg-[#314a37]" : "bg-transparent text-[#314a37] hover:bg-[#e5dfcc]"}`}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div ref={gallery} className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            <motion.div
              key={filter}
              initial={reduced ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex min-w-full gap-5"
            >
              {visibleCategories.map((item, index) => (
                <article key={item.name} className="min-w-[78%] snap-start sm:min-w-[44%] lg:min-w-[31%]">
                  <Photo src={item.image} alt={item.alt} className="aspect-[5/4]" />
                  <div className="flex items-start justify-between border-b border-[#d8cdb8] py-5">
                    <div>
                      <p className={eyebrow}>Illustrative / 0{index + 1}</p>
                      <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
                      <p className="mt-2 text-sm text-[#697368]">Contact us for current availability.</p>
                    </div>
                    <Link
                      href="/contact-us"
                      aria-label={`Enquire about ${item.name}`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[#c8b891] transition duration-700 hover:bg-[#c6aa70]"
                    >
                      ↗
                    </Link>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#697368]">Inspiration only. Images are not Landora property listings.</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                type="button"
                disabled={slide === 0}
                onClick={() => {
                  gallery.current?.scrollBy({ left: -350, behavior: reduced ? "auto" : "smooth" });
                  setSlide(Math.max(0, slide - 1));
                }}
                className="cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200"
                aria-label="Previous gallery items"
              >
                ←
              </Button>
              <Button
                size="sm"
                type="button"
                disabled={visibleCategories.length < 2 || slide >= visibleCategories.length - 1}
                onClick={() => {
                  gallery.current?.scrollBy({ left: 350, behavior: reduced ? "auto" : "smooth" });
                  setSlide(slide + 1);
                }}
                className="cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200"
                aria-label="Next gallery items"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* 04 Land */}
      <section className={`${wrap} py-20 sm:py-28`}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_.65fr]">
          <Reveal className="relative">
            <Photo src={images.landscape} alt="A landscaped residence in a green setting" className="aspect-[4/3]" />
            <div className="absolute -bottom-6 right-5 border border-[#d5c29a] bg-[#fffdf8] px-6 py-5 sm:right-10">
              <span className="font-serif text-3xl text-[#a78a52]">01</span>
              <p className="mt-1 text-[10px] uppercase tracking-[.2em]">A place to begin</p>
            </div>
          </Reveal>
          <div className="lg:pl-8">
            <SectionHeading
              index="04"
              label="The land collection"
              heading={cards[2].title}
              description={cards[2].description}
            />
            <Link href="/contact-us" className={`${textLink} mt-8`}>
              Enquire about land <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      {/* 05 Flats */}
      <section className="bg-[#e9ece1] py-20 sm:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div>
            <SectionHeading
              index="05"
              label="Flats & condominiums"
              heading={cards[3].title}
              description={cards[3].description}
            />
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#c6cdbd] pt-6">
              <div>
                <p className="font-serif text-2xl">Flats</p>
                <p className="mt-2 text-sm text-[#697368]">Spaces for everyday living.</p>
              </div>
              <div>
                <p className="font-serif text-2xl">Condominiums</p>
                <p className="mt-2 text-sm text-[#697368]">A considered residential experience.</p>
              </div>
            </div>
            <Link href="/contact-us" className={`${textLink} mt-8`}>
              Explore possibilities <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <Reveal className="grid grid-cols-[1fr_.65fr] items-end gap-3">
            <Photo src={images.interior} alt="Bright contemporary living space" className="aspect-[3/4]" />
            <Photo
              src={images.detail}
              alt="Elegant modern residential interior detail"
              className="aspect-[3/4] translate-y-6"
            />
          </Reveal>
        </div>
      </section>
      {/* 06 Penthouses */}
      <section className="relative isolate flex min-h-[620px] items-end overflow-hidden bg-[#20392b] py-20 text-white sm:min-h-[720px]">
        <Photo
          src={images.penthouse}
          alt="Illustrative luxury residential interior"
          className="absolute inset-0 -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#14281f]/95 via-[#14281f]/35 to-transparent" />
        <div className={`${wrap} w-full`}>
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[.25em] text-[#dfc48f]">06 / Signature penthouses</p>
            <h2 className={`${title} mt-5`}>{cards[4].title}</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/80">{cards[4].description}</p>
            <Link href="/contact-us" className={`${button} mt-8`}>
              Enquire about penthouses <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </section>
      {/* 07 Locations */}
      <section className={`${wrap} py-20 sm:py-28`}>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              index="07"
              label="Explore locations"
              heading={cards[5].title}
              description={cards[5].description}
            />
            <p className="mt-6 border-l border-[#c6aa70] pl-5 text-sm leading-7 text-[#697368]">
              Ask us about current locations and available properties that match your priorities.
            </p>
            <Link href="/contact-us" className={`${textLink} mt-8`}>
              Discuss locations <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <Reveal className="grid grid-cols-2 gap-3">
            <Photo
              src={images.exterior}
              alt="Contemporary house exterior surrounded by greenery"
              className="aspect-[4/5]"
            />
            <div className="pt-10">
              <Photo
                src={images.residence}
                alt="Modern home interior with architectural details"
                className="aspect-[4/5]"
              />
            </div>
          </Reveal>
        </div>
      </section>
      {/* 08 Why */}
      <section className="border-y border-[#eadfca] bg-[#faf8f1] py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2`}>
          <SectionHeading
            index="08"
            label="The Landora approach"
            heading={cards[6].title}
            description={cards[6].description}
          />
          <Reveal>
            <div className="divide-y divide-[#ded5c4] border-y border-[#ded5c4]">
              {[
                ["01", "Property guidance", "A considered starting point for your property search."],
                ["02", "Clear communication", "Conversations that help you understand your options."],
                ["03", "Customer care", "A personal approach throughout your journey."],
                ["04", "Long-term service", "Support that continues beyond the purchase."],
              ].map(([number, name, description]) => (
                <div className="grid grid-cols-[2rem_1fr] gap-4 py-5 sm:grid-cols-[2rem_1fr_1fr]" key={name}>
                  <span className="text-xs text-[#ac9059]">{number}</span>
                  <h3 className="font-serif text-xl">{name}</h3>
                  <p className="col-start-2 text-sm leading-6 text-[#697368] sm:col-start-auto">{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* 09 Journey */}
      <section className={`${wrap} py-20 sm:py-28`}>
        <div className="max-w-2xl">
          <SectionHeading
            index="09"
            label="Your property journey"
            heading={cards[7].title}
            description={cards[7].description}
          />
        </div>
        <div className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Discover", "Tell us what you are looking for and explore your options."],
            ["02", "Visit", "Arrange a conversation about visiting a property of interest."],
            ["03", "Purchase", "Move forward with guidance through the purchase process."],
            ["04", "After-sales support", "Stay connected for assistance and property care."],
          ].map(([number, name, description]) => (
            <Reveal key={number} className="border-t border-[#c6aa70] py-6 pr-6">
              <span className="font-serif text-4xl text-[#c6aa70]">{number}</span>
              <h3 className="mt-6 font-serif text-2xl">{name}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#697368]">{description}</p>
            </Reveal>
          ))}
        </div>
      </section>
      {/* 10 Services */}
      <section className="bg-[#233a2d] py-20 text-white sm:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center`}>
          <Reveal>
            <Photo
              src={images.condo}
              alt="Illustrative modern apartment interior"
              className="aspect-[4/5] max-h-[650px]"
            />
          </Reveal>
          <div className="lg:pl-12">
            <p className="text-xs uppercase tracking-[.25em] text-[#d8bd84]">10 / After-sales services</p>
            <h2 className={`${title} mt-5`}>{cards[8].title}</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">{cards[8].description}</p>
            <div className="mt-8 grid gap-0 border-t border-white/20 sm:grid-cols-2">
              {[
                "Maintenance coordination",
                "Post-purchase assistance",
                "Documentation support",
                "Property care services",
              ].map((service, index) => (
                <div key={service} className="border-b border-white/20 py-5 pr-4">
                  <span className="mr-4 text-xs text-[#d8bd84]">0{index + 1}</span>
                  <span className="font-serif text-lg">{service}</span>
                </div>
              ))}
            </div>
            <Link href="/contact-us" className={`${button} mt-8`}>
              Discuss your needs <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      {/* 11 FAQs */}
      <section className={`${wrap} py-20 sm:py-28`}>
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <SectionHeading
              index="11"
              label="Experiences & answers"
              heading={cards[9].title}
              description={cards[9].description}
            />
            <div className="mt-8 border-l border-[#c6aa70] pl-5">
              <p className="font-serif text-xl">Your experience matters.</p>
              <p className="mt-2 text-sm leading-6 text-[#697368]">
                Speak with Landora about your questions and the support you need.
              </p>
            </div>
          </div>
          <div className="border-t border-[#ded5c4]">
            {faqs.map((faq) => (
              <details className="group border-b border-[#ded5c4] py-5" key={faq.q}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl marker:content-none">
                  {faq.q}
                  <span className="text-[#a78a52] transition duration-700 group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-xl pt-4 text-sm leading-7 text-[#697368]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* 12 Contact */}
      <section className="relative isolate overflow-hidden bg-[#20392b] py-24 text-white sm:py-32">
        <Photo src={images.hero} alt="Illustrative contemporary residence" className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-[#183126]/85" />
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_.65fr] lg:items-end`}>
          <Reveal>
            <p className="text-xs uppercase tracking-[.25em] text-[#dfc48f]">12 / Begin the conversation</p>
            <h2 className={`${title} mt-5 max-w-3xl`}>{cards[10].title}</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/75">{cards[10].description}</p>
            <Link href="/contact-us" className={`${button} mt-8`}>
              Contact Landora <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
          <div className="border-t border-white/30 pt-6">
            <p className="font-serif text-2xl">What are you looking for?</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Choose a property type to explore the illustrative collection, or contact us for current information.
            </p>
            <label className="mt-5 block text-xs uppercase tracking-[.15em] text-white/75" htmlFor="property-type">
              Property type
            </label>
            <div className="mt-2 flex gap-2">
              <select
                id="property-type"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="min-w-0 flex-1 rounded-sm border border-white/40 bg-[#233a2d] px-3 py-3 text-sm text-white"
              >
                {["All", ...categories.map((item) => item.name)].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <a href="#collection" onClick={() => selectFilter(search)} className={button}>
                Explore ↗
              </a>
            </div>
            <p className="mt-5 text-xs text-white/60">Photography throughout this page is illustrative.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
