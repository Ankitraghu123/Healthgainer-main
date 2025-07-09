'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = ({params}) => {
  return (
    <div>page dynamic id updated : {params.id}</div>
  )
}

export default page