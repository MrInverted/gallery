import React from "react";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'

import PhotoItem from "@/components/PhotoItem";
import { pattern } from "@/utils/initial";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { MyContext } from "./_app";

export default function upload() {
  const [form, setForm] = React.useState(pattern)
  const { setInit, isLoginned } = React.useContext(MyContext)
  const [error, setError] = React.useState({
    err: false,
    msg: ''
  })
  const router = useRouter()


  const handleImageChange = (e) => {
    if (!e.target.files[0]) return

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    axios.post('https://gallery-eight-chi.vercel.app/api/upload', formData)
      .then(res => {
        console.log(res.data.success)
        setForm({ ...form, image: res.data.success, user: isLoginned.data.login })
      })
      .catch(err => console.log(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.title || !form.category || !form.image) {
      return setError({ err: true, msg: "All fields must not be empty" })
    }

    setInit(prev => [...prev, { ...form, id: uuidv4() }])
    setForm({ ...pattern, title: '', category: '' })
    router.push('/')
  }

  if (!isLoginned.access) {
    return (
      <>
        <Header toMain={true} />
        <h1 className="text-center text-danger mt-5">You must log-in before</h1>
      </>
    )
  }

  return (
    <>
      <Header toMain={true} />
      <div className="container py-5">
        <h1 className="text-center">Uploading</h1>
        <div className="row justify-content-center  mt-5">
          <div className="col-sm-7 col-md-5 col-lg-5 col-xl-4 ">
            <div className="border rounded-3 bg-light p-4">

              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label d-block">
                    Title
                    <input
                      type="text"
                      className="form-control"
                      value={form.title}
                      onChange={(e) => {
                        setForm({ ...form, title: e.target.value })
                        setError({ err: false, msg: '' })
                      }}
                    />
                  </label>
                </div>
                <div className="mb-2">
                  <label className="form-label d-block">
                    Category
                    <input
                      type="text"
                      className="form-control"
                      value={form.category}
                      onChange={(e) => {
                        setForm({ ...form, category: e.target.value })
                        setError({ err: false, msg: '' })
                      }}
                    />
                  </label>
                </div>
                <div className="mb-2">
                  <label className="form-label d-block">
                    Photo
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <button disabled={error.err} type="submit" className="btn btn-primary mt-1">Submit</button>
              </form>
              {error.err && <p className="mb-0 mt-4 text-center text-danger">{error.msg}</p>}
            </div>
          </div>

          <div className="col-sm-7 col-md-5 col-lg-5 col-xl-4 ">
            <div className="border rounded-3 bg-light p-4">
              <PhotoItem item={form} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
