import { Separator } from "@/components/ui/seperator/seperator";
import {
    DribbbleIcon,
    TwitterIcon,
    Facebook,
    Instagram,
    Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerSections = [
    {
        title: "Koleksi & Akses",
        links: [
            { title: "Katalog Online", href: "/search" },
            { title: "E-Book", href: "/collection/ebook" },
            { title: "Jurnal Ilmiah", href: "/collection/journal" },
            { title: "Koleksi Arsip", href: "/collection/archive" },
            { title: "Koleksi Anak", href: "/collection/children" },
            { title: "Terbaru", href: "/releases" },
        ],
    },
    {
        title: "Layanan Digital",
        links: [
            { title: "Pendaftaran Anggota", href: "/register" },
            { title: "Pinjam Online", href: "/service/borrow" },
            { title: "Ruang Baca Virtual", href: "/service/virtual-room" },
            { title: "Bantuan Riset", href: "/service/research-help" },
            { title: "Kunjungan Fisik", href: "/service/visit" },
            { title: "Acara & Webinar", href: "/events" },
        ],
    },
    {
        title: "Informasi",
        links: [
            { title: "Tentang Kami", href: "/about" },
            { title: "Struktur Organisasi", href: "/company/structure" },
            { title: "Berita Literasi", href: "/blog" },
            { title: "FAQ", href: "/help" },
            { title: "Karir", href: "/careers" },
            { title: "Mitra Kerja", href: "/partners" },
        ],
    },
    {
        title: "Panduan",
        links: [
            { title: "Syarat & Ketentuan", href: "/legal/terms" },
            { title: "Kebijakan Privasi", href: "/legal/privacy" },
            { title: "Panduan Peminjaman", href: "/guide/borrowing" },
            { title: "Akses Jurnal", href: "/guide/journal-access" },
            { title: "Ketentuan Penggunaan", href: "/legal/usage-policy" },
        ],
    },
];

const Footer = () => {
    const primarySections = footerSections.slice(0, 4);

    return (
        // Menggunakan warna yang sama seperti Hero Section sebelumnya (asumsi primary/dark)
        <footer className="mt-12 xs:mt-20 bg-[hsl(0_0%_9%)]  text-[#E0E1DD] border-t border-[#1B263B]">
            <div className="max-w-7xl mx-auto py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6">
                <div className="col-span-full xl:col-span-3">
                    <Image src="/images/logo/perpus.png" alt="Logo" width={160} height={32} />

                    <p className="mt-4 text-[#C5C6C7]">
                        Temukan dunia literasi di Perpustakaan Nasional! Koleksi lengkap, program edukatif, dan layanan peminjaman digital siap mendukung eksplorasi Anda.
                    </p>

                    {/* Blok Kontak dan Sosial Media di Bawah Deskripsi (khusus layout XL) */}
                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-sm text-[#C5C6C7]">
                            <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                            <span>info@literasinasional.id</span>
                        </div>
                        <div className="flex items-center gap-5 text-[#C5C6C7]">
                            <Link href="https://x.com/perpusnas1" target="_blank" aria-label="Twitter" className="hover:text-[#F1FAEE]">
                                <TwitterIcon className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.facebook.com/ayokeperpusnas" target="_blank" aria-label="Facebook" className="hover:text-[#F1FAEE]">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.instagram.com/perpusnas.go.id" target="_blank" aria-label="Instagram" className="hover:text-[#F1FAEE]">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" target="_blank" aria-label="Youtube" className="hover:text-[#F1FAEE]">
                                <DribbbleIcon className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {primarySections.map(({ title, links }) => (
                    <div key={title} className="col-span-1">
                        <h6 className="font-semibold text-[#F1FAEE]">{title}</h6>
                        <ul className="mt-6 space-y-4">
                            {links.map(({ title, href }) => (
                                <li key={title}>
                                    <Link
                                        href={href}
                                        className="text-[#A8B2C1] hover:text-[#F1FAEE] transition-colors text-sm"
                                    >
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <Separator className="bg-[#1B263B]" />

            <div className="max-w-7xl mx-auto py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6">
                <span className="text-[#A8B2C1] text-center text-sm">
                    &copy; {new Date().getFullYear()}{" "}
                    <Link
                        href="#"
                        target="_blank"
                        className="text-[#F1FAEE] hover:underline"
                    >
                        Perpustukaan Nasional Republik Indonesia
                    </Link>
                    . Seluruh hak cipta dilindungi.
                </span>

                <div className="hidden sm:block">
                </div>

            </div>
        </footer>
    );
};

export default Footer;