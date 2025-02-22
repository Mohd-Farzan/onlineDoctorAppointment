import { Calendar } from 'lucide-react';
import profile from '../../assets/img/dietitian.jpeg';
import { Button } from '@/components/ui/button';

export default function DoctorDetails({ doctor }) {
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
            <h3 className="font-semibold text-xl mb-1 ">{doctor.name}</h3>
            <p className="text-sm mb-2">{doctor.speciality}</p>
            <p className='text-sm  mb-2'>{doctor.fees}</p>
        </div>

          <div className="flex items-center gap-2 text-sm text-zinc-950 mb-4">
            <Calendar className="w-4 h-4" />
            <span>Next available: {doctor.availablity} {doctor.time}</span>
          </div>
          <p className="text-sm  mb-6">
            {doctor.address}
          </p>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}