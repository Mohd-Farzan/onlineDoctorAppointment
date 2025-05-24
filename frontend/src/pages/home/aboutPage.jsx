import React from 'react';

function AboutUs() {
  return (
    <div className='w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      {/* About Us Section */}
      <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold text-blue-600 mb-6'>About Us</h1>
        <p className='text-gray-700 text-lg leading-relaxed'>
          Welcome to <strong className='text-blue-600'>DocConnect</strong>, where healthcare meets convenience, innovation, and compassion. 
          We’re on a mission to revolutionize the way people access medical care by bridging the gap between patients and trusted healthcare professionals.
          Our platform empowers you to take control of your health with just a few clicks—anytime, anywhere.
        </p>
      </div>

      {/* Who We Are Section */}
      <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8'>
        <h1 className='text-4xl font-bold text-blue-600 mb-6'>Who We Are</h1>
        <p className='text-gray-700 text-lg leading-relaxed'>
          At <strong className='text-blue-600'>DocConnect</strong>, we believe that quality healthcare should be accessible, efficient, and stress-free. Founded in 2025, our platform was born out of a simple idea: to make healthcare appointments as seamless as booking a ride or ordering food. We’re a team of tech enthusiasts, medical professionals, and patient advocates dedicated to creating a future where no one has to wait in long queues or struggle to find urgent care.
          Whether you need a routine checkup, specialist consultation, or emergency medical advice, we’re here to ensure you get the right care at the right time.
        </p>
      </div>

      {/* What We Offer Section */}
      <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8'>
        <h1 className='text-4xl font-bold text-blue-600 mb-6'>What We Offer</h1>
        
        <div className='space-y-6'>
          <div>
            <h3 className='text-2xl font-semibold text-blue-600 mb-2'>Online Doctor Appointments</h3>
            <p className='text-gray-700 text-lg leading-relaxed'>
              Say goodbye to endless phone calls and crowded waiting rooms. Browse through a network of licensed, experienced doctors, check real-time availability, and book appointments instantly. From general physicians to specialists, we connect you with the care you need.
            </p>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-blue-600 mb-2'>Emergency Video Consultations</h3>
            <p className='text-gray-700 text-lg leading-relaxed'>
              Health emergencies don’t wait for convenient times. With our 24/7 emergency video consultation feature, you can connect with a qualified doctor in minutes. Whether you’re at home, traveling, or unable to visit a clinic, we’ve got your back.
            </p>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-blue-600 mb-2'>Appointment Tracking</h3>
            <p className='text-gray-700 text-lg leading-relaxed'>
              Stay informed every step of the way. Our intuitive dashboard lets you track upcoming appointments, view medical history, and receive reminders—so you never miss a consultation or follow-up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;