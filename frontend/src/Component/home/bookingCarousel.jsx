import * as React from "react";
import { Calendar } from 'lucide-react';
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import dentist from '../../assets/img/dentist.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fatchDoctor } from "@/store/doctor-slice";
import { Link } from "react-router-dom";

export default function BookingCarousel() {
  const dispatch = useDispatch();
  const { doctorList } = useSelector((state) => state.doctor);
  

  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);
  return (
    <div className="w-full">
      <h1 className='text-3xl font-extrabold mb-8'>
        Find experienced doctors across all specialties
      </h1>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {doctorList.map((doctor, idx) => {
            const data = doctor._doc ?? doctor;
            
            const slot = Array.isArray(data.availability) ? data.availability[0] : undefined;
            
            const dayName = slot.days || "no Upcoming Slots"
            console.log(dayName,"slots")
              const firstTime = slot.times?.[0] ?? 'N/A';
             

            return (
              <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md border overflow-hidden">
                  <div className="h-45 w-full relative">
                    <img src={dentist} alt={data.name} className="object-cover w-full" />
                    <span className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs">
                      {data.speciality}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col h-full">
                    <h3 className="font-semibold text-lg mb-2">{data.name}</h3>
                    <p className="text-sm text-red-500 font-semibold mb-4">₹{data.fees}</p>
                    <div className="mt-auto mb-4 flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Next : <span className='text-green-500 font-bold'>{dayName} at {firstTime}</span>
                      </span>
                    </div>
                    <Link to="/home/book-appointment">
                      <Button className="w-full">Book Appointment</Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4" />
        <CarouselNext className="hidden md:flex -right-4" />
      </Carousel>
    </div>
  );
}
