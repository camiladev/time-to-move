import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import style from '../styles/components/SideBar.module.css'

export default function ActiveLink({ href, children }){
    const router = useRouter()

    let className = ''
    if (router.pathname === href) {
        className = `${style.selected}`
    }
   
    return(
        <Link href={href}>
            {React.cloneElement(children, { className })}
        </Link>
    )
}