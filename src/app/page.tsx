import React from "react";
import { Navbar } from "@/components/landing/navbar";
import HeroSection from "@/components/landing/HeroSection/hero";
import Testimonial from "@/components/landing//testi/testimonial";
import Footer from "@/components/landing/footer/footer";
import FAQ from "@/components/landing/HowItWorks/HowItWorks";
import CTASection from "@/components/landing/CtaSection/CtaSection";
import BooksPopular from "@/components/landing/BukuPopuler/BooksPopular";
import FeaturedBooks from "@/components/landing/FeaturedBooks/FeaturedBooks";

export default function Homepage() {

    return(
        <div>
            <Navbar />
            <HeroSection />
            <BooksPopular />
            <FeaturedBooks />
            <FAQ />
            <Testimonial />
            <CTASection />
            <Footer />
        </div>
    );
}