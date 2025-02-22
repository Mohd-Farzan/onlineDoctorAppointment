import * as React from "react"

import { Calendar, Clock, Star } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import dentist from '../../assets/img/dentist.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fatchDoctor } from "@/store/doctor-slice";

function BookingCarousel() {
  const dispatch=useDispatch()
  const {doctorList}=useSelector((state)=>state.doctor)
  useEffect(()=>{
    dispatch(fatchDoctor)
  },[dispatch])

  return (
    <div className="w-full">
      <h1 className='text-3xl font-extrabold text-gray-900 mb-8'>Find experienced doctors across all specialties</h1>
      <Carousel
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {doctorList.map((doctor, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full">
                <div className="relative flex flex-col h-full bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md border">
                  <div className="relative h-45 w-full">
                    <img
                      src={dentist}
                      alt={doctor.name}
                      fill
                      className="object-cover w-full"
                    />
                    <span 
                      variant="secondary" 
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
                    >
                      {doctor.speciality}
                    </span>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-1">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                      {/* <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div> */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {doctor.address}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>Next available: {doctor.availablity}</span>
                      </div>
                      
                      <Button className="w-full">
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 hover:bg-background/80 hover:backdrop-blur-sm" />
        <CarouselNext className="hidden md:flex -right-4 hover:bg-background/80 hover:backdrop-blur-sm" />
      </Carousel>
    </div>
  )
}

export default BookingCarousel
