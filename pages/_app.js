import React from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import '@/styles/globals.scss'

// import { initialArray } from '@/utils/initial'
export const MyContext = React.createContext()

export default function App({ Component, pageProps }) {
  const [init, setInit] = React.useState([])
  const [isLoginned, setIsLoginned] = React.useState({})

  React.useEffect(() => {
    if (!init) return
    if (init.length === 0) return

    axios.post(`${window.location.origin}/api/items`, init)
      .then(res => console.log(res.data.success))
      .catch(err => console.warn(err))
  }, [init])


  return (
    <MyContext.Provider value={{ init, setInit, isLoginned, setIsLoginned }}>
      <Component {...pageProps} />
    </MyContext.Provider>
  )
}