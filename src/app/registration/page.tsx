"use client"
import StudentRegistrationForm from '@/features/registration/components/student-registration'
import React from 'react'

const RegistrationPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-black'>
      <StudentRegistrationForm/>
    </div>
  )
}

export default RegistrationPage