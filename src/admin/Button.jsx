import React from 'react'

export default function Button({children, className, onClick}) {
  return (
    <button onClick={onClick} className={'py-2 px-5 border border-solid border-gray-200 hover:shadow-md rounded ' + className}>{children}</button>
  )
}
