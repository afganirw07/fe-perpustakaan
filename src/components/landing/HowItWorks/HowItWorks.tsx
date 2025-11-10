"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

const faq = [
    {
        question: "Bagaimana cara meminjam buku di platform ini?",
        answer:
            "Cukup daftar akun gratis, lalu pilih buku yang ingin kamu pinjam. Setelah itu, tekan tombol 'Pinjam Buku' dan buku akan langsung masuk ke daftar bacaanmu.",
    },
    {
        question: "Apakah saya perlu datang langsung ke perpustakaan?",
        answer:
            "Tidak perlu! Kamu bisa membaca buku secara digital langsung dari platform ini. Tapi kalau ingin meminjam versi fisik, beberapa buku juga tersedia untuk diambil di perpustakaan terdekat.",
    },
    {
        question: "Berapa lama masa peminjaman buku?",
        answer:
            "Setiap buku memiliki masa peminjaman standar selama 7 hingga 14 hari. Kamu bisa memperpanjang masa pinjam selama buku belum dipesan pengguna lain.",
    },
    {
        question: "Apakah peminjaman buku berbayar?",
        answer:
            "Tidak, semua peminjaman buku bersifat gratis untuk anggota terdaftar. Namun, beberapa koleksi premium mungkin membutuhkan akses khusus dari admin.",
    },
    {
        question: "Bagaimana jika buku yang ingin saya pinjam sedang dipinjam orang lain?",
        answer:
            "Kamu bisa menekan tombol 'Masuk Daftar Tunggu'. Begitu buku tersebut dikembalikan, kamu akan langsung mendapat notifikasi melalui email atau dashboard.",
    },
    {
        question: "Apakah saya bisa mengembalikan buku sebelum waktunya?",
        answer:
            "Tentu saja! Kamu bisa mengembalikan buku kapan saja melalui halaman 'Buku Saya'. Setelah dikembalikan, buku akan langsung tersedia untuk pengguna lain.",
    },
];

const FAQ = () => {
    return (
        <div
            id="faq"
            className="w-full max-w-(--breakpoint-xl) mx-auto py-8 xs:py-16 px-6"
        >
            <h2 className="md:text-center text-3xl xs:text-4xl md:text-5xl leading-[1.15]! font-bold tracking-tighter">
                Cara Meminjam Buku
            </h2>
            <p className="mt-1.5 md:text-center xs:text-lg text-[hsl(0_0%_45.1%)]">
                Panduan singkat agar kamu bisa mulai membaca dengan mudah.
            </p>

            <div className="min-h-[550px] md:min-h-[320px] xl:min-h-[300px]">
                <Accordion
                    type="single"
                    collapsible
                    className="mt-8 space-y-4 md:columns-2 gap-4"
                >
                    {faq.map(({ question, answer }, index) => (
                        <AccordionItem
                            key={question}
                            value={`question-${index}`}
                            className="bg-[hsl(0_0%_45.1%/0.08)] py-1 px-4 rounded-xl border-none mt-0! mb-4! break-inside-avoid"
                        >
                            <AccordionPrimitive.Header className="flex">
                                <AccordionPrimitive.Trigger
                                    className={cn(
                                        "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                                        "text-start text-lg"
                                    )}
                                >
                                    {question}
                                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionContent
                                className={cn(
                                    "overflow-hidden text-[15px] text-muted-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                                )}
                            >
                                <div className="pb-4">{answer}</div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FAQ;
