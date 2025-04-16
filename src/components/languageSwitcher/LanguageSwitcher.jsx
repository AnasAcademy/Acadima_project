'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import ksa from '@/assets/ksa.png'
import usa from '@/assets/usa.png'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {



    const locale = useLocale();



    const pathname = usePathname()
    const params = useParams()

    const currentLang = params?.locale || 'en'

    // Remove locale prefix
    const cleanPath = pathname.replace(`/${currentLang}`, '') // "/user"








    return <>

        <a href={`/${locale === "en" ? "ar" : "en"}${cleanPath}`} className=" rounded-full hover:scale-105 transition">
            <Image
                src={locale === "ar" ? usa : ksa}
                alt={locale === "ar" ? 'العربية' : 'English'}
                width={28}
                height={28}
            />
        </a>

    </>
}
