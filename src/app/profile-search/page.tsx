"use client"

import { StudentProfileSearch } from '@/features/profile/components/student-profile-search'
import React from 'react'

const ProfileSearch = () => {
  return (
    <div className='flex justify-center min-h-screen bg-black'>
        <StudentProfileSearch/>
    </div>
  )
}

export default ProfileSearch