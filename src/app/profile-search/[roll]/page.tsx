"use client"
import { StudentProfile } from '@/features/profile/components/student-profile'
import React, { use } from 'react'


const ProfilePage = ({ params }: { params: Promise<{ roll: string }>}) => {
   const { roll } = use(params);
   console.log(roll)
  return (
    <div>
      <StudentProfile rollNumber={roll} />
    </div>
  );
};

export default ProfilePage