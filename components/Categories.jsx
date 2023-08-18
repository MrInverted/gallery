import React from "react";

export default function Categories({ init, setFiltered }) {
  const [isActive, setIsActive] = React.useState("all")
  const [input, setInput] = React.useState("")

  const categories = init
    .map(i => i.category)
    .filter(i => (i.length > 1))
    .map(i => i[0].toUpperCase() + i.slice(1).toLowerCase())
    .filter((i, num, arr) => (arr.indexOf(i) === num));

  const handleClick = (inc) => {
    if (inc === "all") {
      setFiltered(init)
      setIsActive(inc)
    } else {
      const filtered = init.filter(i => i.category.toLowerCase() === inc.toLowerCase())
      setFiltered(filtered)
      setIsActive(inc)
    }
  }

  const handleInput = (e) => {
    setInput(e.target.value)
    setFiltered(init.filter(i => i.title.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div className="my-3">
      <div className="d-flex align-items-center gap-2">
        {
          categories.map(i => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`btn btn-${isActive === i ? "primary" : "outline-primary"}`}
            >{i}</button>
          ))
        }

        <button
          onClick={() => handleClick("all")}
          className={`btn btn-${isActive === "all" ? "primary" : "outline-primary"}`}
        >All categories</button>

        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search"
          value={input}
          onChange={handleInput}
        />
      </div>
    </div>
  )
}
