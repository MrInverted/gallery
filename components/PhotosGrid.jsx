import PhotoItem from "./PhotoItem";

export default function PhotosGrid({ paginated }) {
  if (paginated.length === 0) return <h3>There are no photos...</h3>

  return (
    <div className="row gy-3 ">
      {paginated.map((item, index) => (
        <div key={index} className="col-sm-12 col-md-6 col-lg-4">
          <PhotoItem item={item} deletable={true} />
        </div>
      ))}
    </div>
  )
}
