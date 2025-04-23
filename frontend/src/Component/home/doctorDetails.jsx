import { Calendar } from 'lucide-react';
import profile from '../../assets/img/dietitian.jpeg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function DoctorDetails({ doctor }) {
  const availability = doctor._doc.availability?.[0];
  const formattedDate = availability
    ? new Date(availability.date).toISOString().split('T')[0]
    : 'No upcoming slots';

  const firstTimeSlot = availability?.times?.[0] || 'N/A';

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative flex flex-col h-full bg-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl border border-gray-100 overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={profile}
            alt={doctor.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-2 text-zinc-950">
            <h3 className="font-semibold text-xl mb-1 ">{doctor._doc.name}</h3>
            {/* <p className="text-sm mb-2">{doctor._doc.speciality}</p> */}
            <p className='text-sm  mb-2 text-red-500 font-semibold'>₹{doctor._doc.fees}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-950 mb-4">
            <Calendar className="w-4 h-4" />
            <span>
              Next available: <span className='text-green-500 font-bold'>{formattedDate} at {firstTimeSlot}</span>
            </span>
          </div>
          <p className="text-sm  mb-6">
            {doctor.address}
          </p>

          <Link to ='/home/book-appointment'> <Button className="w-full  sm:w-auto bg-blue-600 hover:bg-blue-700">
                             Book Appointment
                           </Button></Link>
        </div>
      </div>
    </div>
  );
}