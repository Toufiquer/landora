/*
|-----------------------------------------
| setting up Mutation.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

"use client";

import Image from "next/image";
import { useState } from "react";

import ImagePickerModal from "@/components/dashboard-ui/ImagePickerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { defaultCards, defaultData, parseCards, resolveHomeData, type HomeData } from "./data";

const labels = [
  "Property categories",
  "Featured properties",
  "Land collection",
  "Flats & condominiums",
  "Penthouses",
  "Prime locations",
  "Why Landora",
  "Property journey",
  "After-sales services",
  "Experiences & FAQs",
  "Contact & final CTA",
];
export default function Mutation({ data, onChange }: { data?: Partial<HomeData>; onChange: (data: HomeData) => void }) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);
  const values = resolveHomeData(data);
  const cards = parseCards(values.sectionsJson);
  const update = (next: Partial<HomeData>) => onChange({ ...values, ...next });
  const updateCard = (index: number, field: "title" | "description", value: string) => {
    const next = [...cards];
    while (next.length <= index) next.push({ ...defaultCards[next.length] });
    next[index] = { ...next[index], [field]: value };
    update({ sectionsJson: JSON.stringify(next) });
  };
  return (
    <div className="custom-parent-border bg-[#fffaf0] text-stone-800">
      <div className="mx-auto max-w-7xl space-y-4 p-4">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-[#eadfca] bg-white p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-700">Page editor</p>
            <h2 className="mt-1 text-xl font-semibold">Landora homepage</h2>
            <p className="mt-1 text-sm text-stone-500">Edit the hero and eleven fixed sections.</p>
          </div>
          <label className="flex items-center gap-3 text-sm">
            Force update{" "}
            <Switch
              aria-label="Toggle force update"
              checked={values.forceUpdate === "true"}
              onCheckedChange={(checked) => update({ forceUpdate: checked ? "true" : "false" })}
            />
          </label>
        </header>
        <div className="grid gap-4 lg:grid-cols-[1fr_19rem]">
          <section className="space-y-4 rounded-sm border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">01 / Hero content</h3>
            <label className="grid gap-1 text-sm">
              Eyebrow
              <Input value={values.eyebrow} onChange={(event) => update({ eyebrow: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              Title
              <Input value={values.title} onChange={(event) => update({ title: event.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              Introduction
              <Textarea value={values.intro} onChange={(event) => update({ intro: event.target.value })} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["paddingX", "paddingY"] as const).map((key) => (
                <label className="grid gap-2 text-sm" key={key}>
                  {key === "paddingX" ? "Horizontal padding" : "Vertical padding"}: {values[key]}px
                  <Slider
                    aria-label={key === "paddingX" ? "Horizontal padding" : "Vertical padding"}
                    min={0}
                    max={300}
                    step={1}
                    value={[Number(values[key]) || 0]}
                    onValueChange={([value]) => update({ [key]: value ?? 0 })}
                  />
                </label>
              ))}
            </div>
          </section>
          <section className="rounded-sm border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">Hero image</h3>
            <p className="mt-1 text-xs text-stone-500">Choose an image from the media library or use the default.</p>
            {values.imageUrl ? (
              <Image
                alt={values.imageAlt || defaultData.imageAlt}
                className="mt-4 aspect-video w-full rounded-sm object-cover"
                width={608}
                height={342}
                src={values.imageUrl}
                unoptimized
              />
            ) : (
              <div className="mt-4 grid aspect-video place-items-center bg-[#f4f1e6] text-sm text-stone-500">
                Default editorial image
              </div>
            )}
            <Button
              size="sm"
              type="button"
              className="mt-3 w-full cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200"
              onClick={() => setMediaOpen(true)}
            >
              {" "}
              {values.imageUrl ? "Edit image" : "Choose image"}
            </Button>
            {values.imageUrl && (
              <Button
                size="sm"
                type="button"
                className="mt-2 w-full cursor-pointer bg-red-100 text-red-800 transition duration-700 hover:bg-red-200"
                onClick={() => update({ imageUrl: "" })}
              >
                Remove image
              </Button>
            )}
            <label className="mt-3 grid gap-1 text-sm">
              Image alt text
              <Input value={values.imageAlt} onChange={(event) => update({ imageAlt: event.target.value })} />
            </label>
          </section>
        </div>
        <section className="space-y-3 rounded-sm border border-[#eadfca] bg-white p-4">
          <h3 className="font-semibold">Homepage sections</h3>
          <p className="text-sm text-stone-500">
            The page uses twelve fixed sections. Existing extra section data is retained but is not displayed.
          </p>
          {labels.map((label, index) => {
            const card = cards[index] ?? defaultCards[index];
            const open = expanded === index;
            return (
              <article key={label} className="rounded-sm border border-[#eadfca] bg-[#fffdf8]">
                <div className="flex items-center gap-3 p-3">
                  <span className="text-xs font-semibold text-amber-700">{String(index + 2).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="truncate text-xs text-stone-500">{card.title}</p>
                  </div>
                  <Button
                    size="sm"
                    type="button"
                    aria-expanded={open}
                    className="cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200"
                    onClick={() => setExpanded(open ? null : index)}
                  >
                    {open ? "Close" : "Edit"}
                  </Button>
                </div>
                {open && (
                  <div className="grid gap-3 border-t border-[#eadfca] bg-white p-3">
                    <label className="grid gap-1 text-sm">
                      Heading
                      <Input value={card.title} onChange={(event) => updateCard(index, "title", event.target.value)} />
                    </label>
                    <label className="grid gap-1 text-sm">
                      Description
                      <Textarea
                        value={card.description}
                        onChange={(event) => updateCard(index, "description", event.target.value)}
                      />
                    </label>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
      {mediaOpen && (
        <ImagePickerModal
          close={() => setMediaOpen(false)}
          selectedUrl={values.imageUrl}
          onSelect={(imageUrl) => {
            update({ imageUrl });
            setMediaOpen(false);
          }}
          title="Choose hero image"
        />
      )}
    </div>
  );
}
