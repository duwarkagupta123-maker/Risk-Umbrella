import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, CheckCircle } from 'lucide-react'

export default function FileUploader({ onFileSelected }) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      if (onFileSelected) onFileSelected(file)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      if (onFileSelected) onFileSelected(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`relative rounded-xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
        isDragging ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="application/pdf,image/*,.doc,.docx"
      />
      
      {selectedFile ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <p className="text-sm font-semibold text-gray-700">{selectedFile.name}</p>
          <p className="text-xs text-gray-500">File attached and ready for analysis</p>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className={`p-3 rounded-full ${isDragging ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Click or drag policy document here</p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (max 10MB)</p>
          </div>
        </div>
      )}
    </div>
  )
}
