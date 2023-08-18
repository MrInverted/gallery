import React from 'react'
import Comments from '@/components/Comments'
import Header from '@/components/Header'
import { MyContext } from '../_app'

export default function photos({ image }) {
  const { init, setInit, isLoginned } = React.useContext(MyContext)

  console.log(image)
  console.log(init)

  const thisCard = init.filter(item => item.image === image)

  console.log(thisCard)

  return (
    <>
      <Header toMain={true} />

      <div className='container'>
        <div className='row justify-content-center'>
          <div className="border border-2 rounded rounded-4 p-4 bg-light fc">
            <div className="rounded rounded-4 fc">
              <img className="img-fluid rounded rounded-4" src={`/${image}`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = (context) => {
  return {
    props: {
      image: context.params.id
    }
  }
}