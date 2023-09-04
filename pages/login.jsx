import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

export default function login() {
  const [form, setForm] = React.useState({
    login: '',
    password: ''
  })

  const [error, setError] = React.useState({
    err: false,
    msg: ''
  })

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`${window.location.origin}/api/login`, form)
      .then(res => {
        console.log(res.data)

        if (res.data.error) {
          return setError({ err: true, msg: res.data.error })
        }

        router.push('/')

      })
      .catch(err => console.log(err))

    setForm({ login: "", password: "" })
  }

  return (
    <>
      <Header toMain={true} />

      <div className="container py-5">
        <h1 className="text-center">Log-in</h1>
        <div className="row justify-content-center mt-5">
          <div className="col-sm-7 col-md-5 col-lg-5 col-xl-4 ">
            <div className="border rounded-3 bg-light p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label d-block">
                    Username
                    <input
                      type="text"
                      className="form-control"
                      value={form.login}
                      onChange={(e) => {
                        setForm({ ...form, login: e.target.value })
                        setError({ err: false, msg: '' })
                      }}
                    />
                  </label>
                </div>
                <div className="mb-2">
                  <label className="form-label d-block">
                    Password
                    <input
                      type="password"
                      className="form-control"
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                        setError({ err: false, msg: '' })
                      }}
                    />
                  </label>
                </div>
                <button disabled={error.err} type="submit" className="btn btn-primary">Submit</button>
              </form>
              {error.err && <p className="mb-0 mt-4 text-center text-danger">{error.msg}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
