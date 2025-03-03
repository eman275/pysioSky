// import React from 'react'

// const TeamCard = () => {
//   return (
//     <div>
//       <div className=' size-44 rounded-full  border-[20px] border-primary-1 '></div>
//     </div>
//   )
// }

// export default TeamCard

'use client'

import React from 'react'

type TeamCardProps = {
  name: string
  role: string
  src: string
}

const TeamCard = ({ name, role, src }: TeamCardProps) => {
  console.log('test', name, role, src)
  return (
    <div className='flex w-64 flex-col items-center rounded-lg  p-6 pt-8 shadow-lg'>
      {/* Outer Circle Border */}
      <div className='relative h-32 w-32'>
        <div className='flex h-full w-full items-center justify-center rounded-full '>
          {/* Image Positioned to Overflow */}
          <img
            src={src}
            alt={name}
            className='-mt-2 h-28 w-28 rounded-full object-cover'
          />
        </div>
      </div>

      {/* Name */}
      <h3 className='mt-4 text-lg font-bold text-gray-800'>{name}</h3>

      {/* Role */}
      <p className='text-sm text-gray-600'>{role}</p>

      {/* Read Bio Button */}
      <button className='mt-4 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white'>
        Read Bio
      </button>
    </div>
  )
}

// export default TeamCard

const MeetTheTeam = () => {
  const ourTeam = [
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/ff816fd5-c93c-45e6-8973-765b15553e61/nifail.png',
    },
    {
      name: 'Magdalene Teng',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/eb0e533d-0a02-457b-8db4-677492919e32/Magdalene.png',
    },
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/af2e0ea2-398c-419a-b142-52cf0908882c/Ain.png',
    },
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/ff816fd5-c93c-45e6-8973-765b15553e61/nifail.png',
    },
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/ff816fd5-c93c-45e6-8973-765b15553e61/nifail.png',
    },
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/ff816fd5-c93c-45e6-8973-765b15553e61/nifail.png',
    },
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/ff816fd5-c93c-45e6-8973-765b15553e61/nifail.png',
    },
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/ff816fd5-c93c-45e6-8973-765b15553e61/nifail.png',
    },
    {
      name: 'Nifail Zainal',
      role: 'Physiotherapist',
      src: 'https://images.squarespace-cdn.com/content/v1/5f3d0229481bc56aa3f29b27/ff816fd5-c93c-45e6-8973-765b15553e61/nifail.png',
    },
  ]
  return (
    <div>
      <h1 className='my-5 text-center font-bold'> Meet the Team</h1>
      <div className='grid  grid-cols-3 gap-2 '>
        {ourTeam.map((item, index) => (
          <TeamCard
            name={item?.name}
            role={item?.role}
            src={item.src}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default MeetTheTeam
