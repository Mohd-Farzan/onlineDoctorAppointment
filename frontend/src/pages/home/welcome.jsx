

import profile from '../../assets/img/profile.png'
import { BriefcaseMedical, CalendarCheck, GraduationCapIcon, Home, LogOut, Pill } from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom';

import { Button } from '@/components/ui/button';
import BookingCarousel from '@/Component/home/bookingCarousel';
import doctor from "../../assets/img/doctor.jpeg"
import doctor1 from "../../assets/img/doctor3.jpeg"
import doctor2 from "../../assets/img/doctor2.jpeg"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useEffect, useState } from 'react';
import { fatchDoctor } from '@/store/doctor-slice';
import { useDispatch, useSelector } from 'react-redux';
import DoctorDetails from '@/Component/home/doctorDetails';
function Welcome() {
  const dispatch=useDispatch()
  const { doctorList, isLoading, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fatchDoctor(doctorList));
  }, [dispatch]);
  console.log('doctor list',doctorList )
  
  return (
    <>
      <main className='flex-grow'>
      <div className="flex flex-col p-4">
        <div className="flex flex-wrap justify-center mt-4 mx-8 gap-8 h-[250px] p-2">
          <div className="p-4 border-2 shadow-md rounded-2xl w-40 sm:w-48 md:w-55 bg-white hover:shadow-xl hover:bg-blue-100 transition-all duration-200 ease-in-out">
            <img src={doctor} alt="" className='w-full ' />
            <h2 className="text-lg font-bold mt-2">
              <Link to="/home/find-doctor">Find Doctors Near You</Link>
            </h2>
          </div>
          <div className="p-4 border-2 shadow-md rounded-2xl w-40 sm:w-48 md:w-48 bg-white hover:shadow-xl hover:bg-blue-50 transition-all duration-200 ease-in-out">
          <img src={doctor} alt="" className='w-full h-50' />
            <Link className="font-bold text-lg mt-2" to="/home/appointment">
              <h5 className="mt-2">Book Your Appointment</h5>
            </Link>
          </div>
          {/* <div className="p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 bg-white hover:shadow-xl hover:bg-blue-50 transition-all duration-200 ease-in-out">
            <BriefcaseMedical className="text-blue-500 w-6 h-6" />
            <h2 className="font-bold text-lg mt-2">Prescription</h2>
          </div> */}
          <div className="p-4 border-2 shadow-md rounded-2xl w-32 sm:w-48 md:w-55 bg-white hover:shadow-xl hover:bg-blue-50 transition-all duration-200 ease-in-out">
          <img src={doctor} alt="" className='w-full h-50' />
            <Link className="text-lg font-bold" to="/home/medicine">
              <h5 className="mt-2">Medicine</h5>
            </Link>
          </div>
        </div>

      {/* Top Doctors */}
      <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Featured Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
            {isLoading ? (
        <p className='text-center font-extrabolds'>Loading doctors...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : doctorList.length > 0 ? (
        doctorList.slice(0,6).map((doctorData) => (
            <DoctorDetails key={doctorData._id} doctor={doctorData}/>
        ))
      ) : (
        <p>No doctors found.</p>
      )}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/home/find-doctor">View All Doctors</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className='py-12'>
          <div>
            <BookingCarousel/>
          </div>
        </section>
        <section className="py-16 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className='border-b-2'>How do I book an appointment?</AccordionTrigger>
                <AccordionContent>
                  You can book an appointment by filling out the form on our homepage or by calling our customer service
                  number. Choose your preferred doctor, date, and time, and we'll confirm your appointment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className='border-b-2'>Can I cancel or reschedule my appointment?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Use the
                  appointment tracker on our website or contact our customer service for assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className='border-b-2'>Are virtual consultations available?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer virtual consultations for certain types of appointments. When booking, you can choose
                  between in-person or virtual visits, depending on the doctor's availability and your medical needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        </div>
        </main>
    </>
  );
}

export default Welcome;
