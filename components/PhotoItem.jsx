import { MyContext } from "@/pages/_app";
import axios from "axios";
import Link from "next/link";
import React from "react";


export default function PhotoItem({ item, deletable }) {
  const { init, setInit, isLoginned } = React.useContext(MyContext)

  const handleDelete = () => {
    const newInit = init.filter(i => i.id !== item.id)

    axios.post(`${window.location.origin}/api/items`, newInit)
      .then(res => console.log(res.data.success))
      .catch(err => console.warn(err))

    setInit(newInit)
  }

  return (
    <div className="close-button-wrapper position-relative">
      {
        deletable &&
        <>
          {isLoginned?.data?.login === item.user &&
            <button
              type="button"
              className="close-button btn-close border border-black rounded"
              onClick={handleDelete}
            ></button>
          }
        </>
      }



      <div className="photoItem border border-2 rounded rounded-4 p-4 bg-light">
        <div className="fg rounded rounded-4 overflow-hidden ">
          <Link href={`/photos/${item.image}`}>
            <img className="img-fluid rounded rounded-4 w-100" src={item.image} alt="" />
          </Link>
        </div>
        <h2 className="mt-4 text-center ">{item.title}</h2>
        <div className="d-flex justify-content-between ">
          <p className="lead text-center mb-0">{item.category}</p>
          <p className="lead text-center mb-0">{item.user}</p>
        </div>
      </div>
    </div>
  )
}
