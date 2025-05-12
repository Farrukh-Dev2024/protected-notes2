"use client"

import { signOut } from "next-auth/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const handleLogout = async () => {
  try {
    // This will trigger the sign-out process
    toast.success("Logged out!")    

    const res = await signOut({redirect: true,callbackUrl: "/", })


  } catch (err) {
    toast.error("Logout failed")
    console.error("Logout error:", err)
  }
}

export default function LogOutForm() {
  return (
    <div className="form-container-style">
      <div className="form-style"> 
        {/* if form element is present authjs expectes submit and cerf tokken */}
        <h2 className="form-h2-style">Logout</h2>
        <Button onClick= {handleLogout} className="form-button-style1">
          Logout
        </Button>
      </div>
    </div>
  )
}
