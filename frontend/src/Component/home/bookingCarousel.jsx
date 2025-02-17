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
import dietitian from '../../assets/img/dietitian.jpeg';
import pediatrician from '../../assets/img/pediatrician.jpeg';
import physiotherapy from '../../assets/img/physiotherapy.jpeg';

function BookingCarousel() {
  const image =[dentist,dietitian,physiotherapy,pediatrician]
  const doctorData = [
    {
      image: dentist,
      title: "Dr. Emily Johnson",
      specialty: "Cosmetic Dentistry",
      description: "Specializes in cosmetic dentistry and teeth whitening.",
      rating: 4.8,
      nextAvailable: "Today",
      experience: "15 years",
    },
    {
      image: pediatrician,
      title: "Dr. Michael Smith",
      specialty: "Orthodontics",
      description: "Expert in orthodontics and braces for all ages.",
      rating: 4.9,
      nextAvailable: "Tomorrow",
      experience: "12 years",
    },
    {
      image: physiotherapy,
      title: "Dr. Sarah Lee",
      specialty: "Oral Surgery",
      description: "Provides root canal treatments and oral surgery.",
      rating: 4.7,
      nextAvailable: "Today",
      experience: "10 years",
    },
    {
      image: dietitian,
      title: "Dr. James Brown",
      specialty: "Pediatric Dentistry",
      description: "Focuses on pediatric dentistry and child dental care.",
      rating: 4.9,
      nextAvailable: "In 2 days",
      experience: "18 years",
    },
    {
      image: dentist,
      title: "Dr. Laura Davis",
      specialty: "Restorative Dentistry",
      description: "Offers dental implants and restorative dentistry.",
      rating: 4.8,
      nextAvailable: "Today",
      experience: "14 years",
    },
  ]

  return (
    <div className="w-full">
      <h1 className='text-3xl font-extrabold text-gray-900 mb-8'>Find experienced doctors across all specialties</h1>
      <Carousel
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {doctorData.map((doctor, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full">
                <div className="relative flex flex-col h-full bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md border">
                  <div className="relative h-45 w-full">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.title}
                      fill
                      className="object-cover w-full"
                    />
                    <span 
                      variant="secondary" 
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
                    >
                      {doctor.experience}
                    </span>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-1">{doctor.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {doctor.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>Next available: {doctor.nextAvailable}</span>
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
