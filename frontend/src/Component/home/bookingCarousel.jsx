import * as React from "react";
import { Calendar } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import dentist from '../../assets/img/dentist.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fatchDoctor } from "@/store/doctor-slice";
import { Link } from "react-router-dom";

function BookingCarousel() {
  const dispatch = useDispatch();
  const { doctorList } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);

  return (
    <div className="w-full">
      <h1 className='text-3xl font-extrabold text-gray-900 mb-8'>
        Find experienced doctors across all specialties
      </h1>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {doctorList.map((doctor, index) => {
            const availability = doctor._doc.availability?.[0];
            const formattedDate = availability
              ? new Date(availability.date).toISOString().split('T')[0]
              : 'No upcoming slots';
            const firstTimeSlot = availability?.times?.[0] || 'N/A';

            return (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <div className="relative flex flex-col h-full bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md border">
                    <div className="relative h-45 w-full">
                      <img
                        src={dentist}
                        alt={doctor._doc.name}
                        className="object-cover w-full"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
                        {doctor._doc.speciality}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-1">{doctor._doc.name}</h3>
                        <p className="text-sm text-muted-foreground font-semibold text-red-500">
                          ₹{doctor._doc.fees}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Next available: <span className='text-green-500 font-bold'>{formattedDate} at {firstTimeSlot}</span>
                          </span>
                        </div>
                        <Link to="/home/book-appointment">
                          <Button className="w-full">Book Appointment</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 hover:bg-background/80 hover:backdrop-blur-sm" />
        <CarouselNext className="hidden md:flex -right-4 hover:bg-background/80 hover:backdrop-blur-sm" />
      </Carousel>
    </div>
  );
}

export default BookingCarousel;
