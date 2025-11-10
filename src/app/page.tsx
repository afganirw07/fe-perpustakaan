import React from "react";
import { Navbar } from "@/components/landing/navbar";
import HeroSection from "@/components/landing/HeroSection/hero";
import Testimonial from "@/components/landing//testi/testimonial";
export default function Homepage() {

    return(
        <div>
            <Navbar />
            <HeroSection />
            <Testimonial />
        </div>
    );
}