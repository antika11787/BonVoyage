"use client";

import React from 'react'
import { House, Earth, Wallet, DollarSign, CircleUser } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const path = usePathname();

    return (
        <div className="fixed bottom-0 w-full h-[80px] bg-white z-50 rounded-tl-3xl rounded-tr-3xl px-6 flex items-center justify-between custom-shadow">
            <div className="flex gap-9">
                <div className="flex flex-col items-center gap-1" onClick={() => router.push('/')}>
                    <House className={`${path === '/' ? 'text-blue-500' : 'text-gray-600'}`} />
                    <p className={`${path === '/' ? 'text-blue-500' : 'text-gray-600'}`}>Home</p>
                </div>
                <div className="flex flex-col items-center gap-1" onClick={() => router.push('/tours')}>
                    <Earth className={`${path.includes('/tours') ? 'text-blue-500' : 'text-gray-600'}`} />
                    <p className={`${path.includes('/tours') ? 'text-blue-500' : 'text-gray-600'}`}>Tours</p>
                </div>
            </div>
            <div className="absolute bottom-4 left-[49.15%] transform -translate-x-1/2 flex flex-col items-center gap-1 bg-blue-500 border-4 border-white rounded-full p-6 custom-shadow-item">
                <DollarSign className="text-white" />
            </div>
            <div className="flex gap-9">
                <div className="flex flex-col items-center gap-1">
                    <Wallet className={`${path.includes('/wallet') ? 'text-blue-500' : 'text-gray-600'}`} />
                    <p className={`${path.includes('/wallet') ? 'text-blue-500' : 'text-gray-600'}`}>Wallet</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <CircleUser className={`${path.includes('/users') ? 'text-blue-500' : 'text-gray-600'}`} />
                    <p className={`${path.includes('/users') ? 'text-blue-500' : 'text-gray-600'}`}>Profile</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
