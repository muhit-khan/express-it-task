"use client"

import React from "react"
import Image from "next/image"
import { Globe, Mail, Phone, FileDown } from "lucide-react"

const StickyBanner = () => {
    return (

        <div className="hidden md:block">
            <div className="fixed z-50 bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white/20">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/50">
                        <Image
                            src="/profile.jpg"
                            alt="Muhit Khan"
                            fill
                            sizes="(max-width: 768px) 48px, 64px"
                            className="object-cover"
                        />
                    </div>
                    <a
                        href="https://muhit-khan.vercel.app/MUHIT_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
                    >
                        <FileDown className="w-3 h-3" />
                        View CV
                    </a>
                </div>
                <div className="text-sm text-white">
                    <h2 className="font-bold text-lg mb-1">MUHIT KHAN</h2>
                    <div className="space-y-1">
                        <a
                            href="https://muhit-khan.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                        >
                            <Globe className="h-4 w-4" />
                            muhit-khan.vercel.app
                        </a>
                        <a
                            href="mailto:muhi.dev@gmail.com"
                            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                        >
                            <Mail className="h-4 w-4" />
                            muhi.dev@gmail.com
                        </a>
                        <a
                            href="tel:+8801234567890"
                            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                        >
                            <Phone className="h-4 w-4" />
                            +880 1234-567890
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StickyBanner
