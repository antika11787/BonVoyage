"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import oceanWaves from "../../../../public/images/oceanWave.svg";
import ImageAtom from "@/components/atoms/image";

const LogoAnimation = () => {
    const text = "BonVoyage";
    const [displayText, setDisplayText] = useState("");
    const typingSpeed = 150; // Adjust speed of typing effect

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i + 1)); // Fixes the "undefined" issue
            i++;
            if (i > text.length) clearInterval(interval);
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="z-10 absolute top-[100px] left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2">
            <ImageAtom src={oceanWaves} alt="Ocean waves" height={50} width={50} />

            {/* Blinking divider (Fixed animation) */}
            <div className="w-[1px] h-[30px] rounded-md bg-gray-100 animate-cursor"></div>

            {/* Typing effect with blinking cursor */}
            <motion.span
                className="text-gray-100 font-medium text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {displayText}
            </motion.span>
        </div>
    );
};

export default LogoAnimation;
