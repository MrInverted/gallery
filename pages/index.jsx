import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

import Categories from "@/components/Categories";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import PhotosGrid from "@/components/PhotosGrid";
import { MyContext } from "@/pages/_app";
import List from "@/components/List";

export default function Home({ fetched, user }) {
  const { init, setInit, setIsLoginned } = React.useContext(MyContext)
  const [filtered, setFiltered] = React.useState(fetched || [])
  const [paginated, setPaginated] = React.useState(fetched || [])

  React.useEffect(() => {
    setInit(fetched)
    setIsLoginned(user)
  }, [])

  React.useEffect(() => {
    setFiltered(init)
    setPaginated(filtered)
  }, [init])

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-3">Photo gallery</h1>
        <Categories init={init} setFiltered={setFiltered} />
        <PhotosGrid paginated={paginated} />
        <Pagination filtered={filtered} setPaginated={setPaginated} />
        <List />
      </div>
    </>
  )
}

// --------------------

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  const user = {
    access: false,
    data: {
      login: '',
      password: '',
      id: ''
    }
  }

  if (token) {
    const access = jwt.decode(token)

    if (access) {
      user.access = true
      user.data = access
    }
  }

  try {
    const { data } = await axios.get('https://gallery-eight-chi.vercel.app/api/items')

    if (!data || data.lenght === 0) {
      return {
        props: {
          fetched: [],
          user: user
        }
      }
    } else {
      return {
        props: {
          fetched: data.success,
          user: user
        }
      }
    }

  } catch (err) {
    return {
      props: {
        fetched: [],
        user: user
      }
    }
  }
}