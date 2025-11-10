import React from "react";
import { Navbar } from "@/components/landing/navbar";
import HeroSection from "@/components/landing/HeroSection/hero";
import Testimonial from "@/components/landing//testi/testimonial";
import Footer from "@/components/landing/footer/footer";
import FAQ from "@/components/landing/HowItWorks/HowItWorks";
import CTASection from "@/components/landing/CtaSection/CtaSection";

export default function Homepage() {

    return(
        <div>
            <Navbar />
            <HeroSection />
            <FAQ />
            <Testimonial />
            <CTASection />
            <Footer />
        </div>
    );
}