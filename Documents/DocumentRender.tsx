import React, { useEffect } from 'react' // Importing components from react
import PdfComp from '../Components/pdf' // Importing the pdf component
import { useContext } from 'react'
import { userContext } from '../store/user'

// Component to the pdf
const DocumentRenderer = ({ navigation }:any) => {
  // Render the pdf component
  const context = useContext(userContext)
  useEffect(() => {
    console.log(context.pdf)
  }, [])
  return (
      <PdfComp
        url={`${context.pdf}`}
      />
  )
}

export default DocumentRenderer
