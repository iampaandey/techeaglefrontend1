import React from 'react'
import loader from '../../assets/Loader.svg'
const Loading = () => {
  return (
    <div className="flex justify-center mt-44">
     <img src={loader} alt="Laoder" />
    </div>
  )
}

export default Loading;
