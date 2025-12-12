import { Button } from '@heroui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex h-[65vh] flex-col items-center justify-center p-4 text-center">
      <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">404</h1>
      <p className="mt-2 text-xl font-medium md:text-2xl">Page Not Found</p>
      <p className="mt-4 text-base md:text-lg">The page you are looking for does not exist.</p>
      <Button
        onPress={() => navigate('/home')}
        className="mt-6 rounded-md  px-4 py-2 transition-colors duration-300 "
      >
        Go to Home
      </Button>
    </div>
  )
}

export default NotFoundPage
