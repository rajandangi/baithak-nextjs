'use client';

import { sidebarLinks } from '@/constants'
import React from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
            <div className='flex flex- flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(link.route);
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                                'bg-blue-1': isActive,
                            })}
                        >
                            {link.label}
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar