import Link from 'next/link'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import { usePathname } from 'next/navigation'

function SidebarOptions({href,id}:{
    href: string,
    id:string
}) {

    const [data]=useDocumentData(doc(db,"documents",id));

    const pathname=usePathname();
    const isActive=href.includes(pathname)&&pathname!=="/";

    if(!data) return null;

  return (
    <Link href={href} className={`border p-2 rounded-md ${isActive?"bg-gray-300 font-bold border-black":"border-gray-400"}`}>
        <p className='truncate'>{data.title}</p>
    </Link>
  )
}

export default SidebarOptions