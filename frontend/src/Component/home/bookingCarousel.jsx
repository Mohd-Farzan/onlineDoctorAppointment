import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import dentist from '../../assets/img/dentist.jpeg';
import dietitian from '../../assets/img/dietitian.jpeg';
import pediatrician from '../../assets/img/pediatrician.jpeg';
import surgeon from '../../assets/img/surgeon.jpeg';
import physiotherapy from '../../assets/img/physiotherapy.jpeg';

function BookingCarousel() {
  const doctorData = [
    {
      image: dentist,
      title: "Dr. Emily Johnson",
      description: "Specializes in cosmetic dentistry and teeth whitening.",
    },
    {
      image: dietitian,
      title: "Dr. Michael Smith",
      description: "Expert in orthodontics and braces for all ages.",
    },
    {
      image: surgeon,
      title: "Dr. Sarah Lee",
      description: "Provides root canal treatments and oral surgery.",
    },
    {
      image: physiotherapy,
      title: "Dr. James Brown",
      description: "Focuses on pediatric dentistry and child dental care.",
    },
    {
      image: pediatrician,
      title: "Dr. Laura Davis",
      description: "Offers dental implants and restorative dentistry.",
    },
  ];

  return (
    <Carousel className="w-full border border-r-4">
      <CarouselContent className="-ml-1">
        {doctorData.map((doctor, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md h-64"> {/* Adjusted height */}
                <img
                  src={doctor.image}
                  alt={doctor.title}
                  className="w-full h-32 object-cover"
                />
                <h5 className="text-center mt-2 text-lg font-semibold">{doctor.title}</h5> {/* Adjusted text size */}
                <p className="text-sm text-gray-600 text-center mt-2">{doctor.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default BookingCarousel;