import React from 'react' // Importing components from react
import PdfComp from '../Components/pdf' // Importing the pdf component
import { useContext } from 'react'
import { userContext } from '../store/user'

// Component to render past questions pdf
const DocumentRenderer = ({ navigation }:any) => {
  // Render the pdf component
  const context = useContext(userContext)
  return (
      <PdfComp
        url={`${context.pdf}`}
      />
  )
}

export default DocumentRenderer
