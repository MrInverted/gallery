import React from "react";
import Link from "next/link";
import { MyContext } from "@/pages/_app";

export default function Header({ toMain = false }) {
  const { isLoginned, setIsLoginned } = React.useContext(MyContext)

  const handleLogOut = () => {
    setIsLoginned({
      access: false,
      data: {
        login: '',
        password: '',
        id: ''
      }
    })
    document.cookie = "token=null"
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center ">
        {toMain
          ?
          <div>
            <Link href="/" className="btn btn-primary">To main</Link>
          </div>
          :
          <div>
            {isLoginned.access
              ? <Link href="/upload" className="btn btn-outline-primary">Upload Image</Link>
              : <button disabled={true} className="btn btn-outline-primary">Upload Image</button>
            }
          </div>
        }

        <div className="d-flex align-items-center gap-2">
          {isLoginned.access
            ?
            <>
              <p className="mb-0">Hello, {isLoginned.data?.login}</p>
              <button onClick={handleLogOut} className="btn btn-primary">Log-out</button>
            </>
            :
            <>
              <Link href="/login" className="btn btn-primary">Log-in</Link>
              <Link href="/register" className="btn btn-primary">Register</Link>
            </>
          }
        </div>
      </div>
    </div>
  )
}
