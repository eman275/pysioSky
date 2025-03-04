'use client'
import Link from 'next/link'
import React from 'react'

const LocateUs = () => {
  return (
    <div className=' bg-primary-1 px-2 py-4 lg:px-6 lg:py-8'>
      <h1 className='py-2 text-xl font-bold text-[#a63346] lg:text-xxl '>
        Locate Us
      </h1>
      <div className='flex items-center gap-1'>
        <Link
          href='https://www.google.com/maps/dir//Majarrah,+Block+12+26th+of+July+Corridor,+First+Al+Sheikh+Zayed,+Giza+Governorate+12588/@30.0260084,31.0124309,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x14585bbb4f26d1bf:0x4ba2776cc447ee4f!2m2!1d31.0150058!2d30.0260038?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D'
          target='_blank'
          >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className=' text-white'
          >
            <path d='M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0' />
            <circle cx='12' cy='8' r='2' />
            <path d='M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712' />
          </svg>
        </Link>

        <h4 className='text-base text-white lg:text-lg'>
          Majarrah, Block 12, 26 th of July corridor, Sheikh Zayed City, 6 th of
          October, Egypt
        </h4>
      </div>
      <h1 className='py-1 text-xl font-bold text-[#a63346] lg:text-xxl '>
        Hours
      </h1>
      <h4 className='text-base text-white lg:text-lg'>
        {' '}
        Saturday-Thursday : 4PM -5PM
      </h4>

      <div>
        {/* <LoadScript googleMapsApiKey='YOUR_GOOGLE_MAPS_API_KEY'>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} onClick={handleMarkerClick} />
          </GoogleMap>
        </LoadScript> */}
      </div>
    </div>
  )
}

export default LocateUs
