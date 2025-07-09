export const dynamic = 'force-dynamic'; 
import React from 'react'

const page = ({params}) => {
  return (
    <div>page dynamic id updated 3.0 using force : {params.id}</div>
  )
}

export default page