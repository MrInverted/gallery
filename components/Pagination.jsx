import React from "react"

export default function Pagination({ filtered, setPaginated }) {
  const [select, setSelect] = React.useState(100);
  const [pages, setPages] = React.useState({
    array: new Array(Math.ceil(filtered.length / select)).fill(""),
    active: 0
  })

  React.useEffect(() => {
    setPaginated(filtered.slice(0, +select))
    setPages({
      array: new Array(Math.ceil(filtered.length / select)).fill(""),
      active: 0
    })
  }, [filtered, select])

  const handleButtonClick = (index) => {
    setPages({ ...pages, active: +index })
    setPaginated(filtered.slice(index * select, index * select + +select))
  }

  const handleSelectClick = (e) => {
    setSelect(+e.target.value)
    setPaginated(filtered.slice(0, +e.target.value))
  }

  return (
    <div className="my-3">
      <div className="d-flex align-items-center gap-2 ">
        {
          pages.array.map((item, index) => (
            <button
              key={index}
              className={`paginationButton btn btn-${pages.active === index ? "primary" : "outline-primary"}`}
              onClick={() => handleButtonClick(index)}
            >{index + 1}</button>
          ))
        }

        <select
          className="form-select"
          onChange={handleSelectClick}
          value={select}
        >
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  )
}
