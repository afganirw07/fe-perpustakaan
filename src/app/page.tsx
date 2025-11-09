import React from "react";
import { Navbar } from "@/components/landing/navbar";
import HeroSection from "@/components/landing/HeroSection/hero";
export default function Homepage() {

    return(
        <div>
            <Navbar />
            <HeroSection />
        </div>
    );
}