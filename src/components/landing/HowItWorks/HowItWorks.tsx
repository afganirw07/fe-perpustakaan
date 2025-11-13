"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

const faq = [
    {
        question: "Bagaimana cara pinjam buku?",
        answer: "Daftar akun, pilih buku, klik 'Pinjam Buku', dan buku akan masuk daftar bacaanmu.",
    },
    {
        question: "Perlu datang ke perpustakaan?",
        answer: "Tidak perlu. Kamu bisa baca digital. Untuk fisik, bisa ambil di perpustakaan terdekat.",
    },
    {
        question: "Berapa lama masa pinjam?",
        answer: "Standar 7–14 hari. Bisa diperpanjang jika buku belum dipesan orang lain.",
    },
    {
        question: "Apakah peminjaman gratis?",
        answer: "Ya, semua peminjaman gratis untuk anggota terdaftar. Koleksi premium mungkin memerlukan izin admin.",
    },
    {
        question: "Bagaimana jika buku sedang dipinjam?",
        answer: "Tekan 'Masuk Daftar Tunggu'. Kamu akan diberi notifikasi saat buku tersedia.",
    },
    {
        question: "Bisa mengembalikan lebih cepat?",
        answer: "Tentu, kembalikan kapan saja lewat halaman 'Buku Saya'. Buku langsung tersedia untuk pengguna lain.",
    },
];


const FAQ = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div
            id="faq"
            className="w-full max-w-(--breakpoint-xl) mx-auto py-8 xs:py-16 px-6 scroll-m-20"
        >
            <div data-aos="fade-right" className="max-w-3xl mx-auto text-center">
            <h2 className="md:text-center text-3xl xs:text-4xl md:text-5xl leading-[1.15]! font-bold tracking-tighter">
                FAQ
            </h2>
            <p className="mt-1.5 md:text-center xs:text-lg text-[hsl(0_0%_45.1%)]">
                Panduan singkat agar kamu bisa mulai membaca dengan mudah.
            </p>
            </div>

            <div data-aos="fade-left" className="min-h-[550px] md:min-h-[320px] xl:min-h-[300px]">
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
