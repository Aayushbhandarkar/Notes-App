import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Alert({ type, message, onClose }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onClose && onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!show) return null

  const alertStyles = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800'
  }

  return (
    <div className={`fixed top-4 right-4 z-50 border rounded-md p-4 ${alertStyles[type]} max-w-md`}>
      <div className="flex items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setShow(false)
            onClose && onClose()
          }}
          className="ml-4 flex-shrink-0"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}