"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import CKEditor with SSR disabled
const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor), { ssr: false })

//const ClassicEditor = dynamic(() => import("@ckeditor/ckeditor5-build-classic"), { ssr: false })

const EditorComponent = () => {
  const [editorData, setEditorData] = useState("")
  const [editorLoaded, setEditorLoaded] = useState(false)

  // Load the actual editor module on client side
  const [Editor, setEditor] = useState(null)

  useEffect(() => {
    import("@ckeditor/ckeditor5-build-classic").then((mod) => {
      setEditor(() => mod.default)
      setEditorLoaded(true)
    })
  }, [])

  if (!editorLoaded || !Editor) {
    return <div className="h-[200px] border rounded-md animate-pulse bg-muted" />
  }

  return (
    <CKEditor
      editor={Editor}
      data={editorData}
      onChange={(event, editor) => {
        const data = editor.getData()
        setEditorData(data)
      }}
      config={{
          toolbar: [
            // Left side tools
            'italic', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo', 'insertTable', 'mediaEmbed', 'link',
            
            // Indent controls
            'outdent', 'indent', // Increase and Decrease Indent buttons

            // Right side tools for headers and text alignment
            '|', // separator
            'heading', 'alignment', 'fontSize', 'fontFamily', 'fontColor'
          ],
          heading: {
            options: [
              { model: 'paragraph', title: 'Normal', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
            ]
          },
          language: 'en', // Optional, set language for editor
        }}
    />
  )
}

export default EditorComponent
