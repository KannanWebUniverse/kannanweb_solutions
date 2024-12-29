'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router=useRouter()
  useEffect(()=>{
    if(!router){
      return
    }
    router.push("/home")
  },[router])
  return (
<></>
  );
}
