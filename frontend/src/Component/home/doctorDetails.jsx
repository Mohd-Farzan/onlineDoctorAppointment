import { Calendar } from 'lucide-react';
import profile from '../../assets/img/dietitian.jpeg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function DoctorDetails({ doctor }) {
  // 1) guard entirely missing prop
  if (!doctor) return null;

  // 2) normalize the “data” object whether it's a mongoose doc or plain
  const data = doctor._doc ?? doctor;

  // 3) pull fields safely
  const { name, fees, address, availability = [] } = data;

  // 4) get the next slot
  const nextSlot = Array.isArray(availability) ? availability[0] : undefined;

  // 5) format date if present
  const formattedDate = nextSlot?.days
    ?nextSlot.days
    : 'No upcoming slots';

  const firstTime = nextSlot?.times?.[0] ?? 'N/A';

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative flex flex-col h-full bg-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl border border-gray-100 overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={profile}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-2 text-zinc-950">
            <h3 className="font-semibold text-xl mb-1">{name}</h3>
            <p className="text-sm mb-2 text-red-500 font-semibold">₹{fees}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-950 mb-4">
            <Calendar className="w-4 h-4" />
            <span>
              Next available:{' '}
              <span className="text-green-500 font-bold">
                {formattedDate} at {firstTime}
              </span>
            </span>
          </div>

          <p className="text-sm mb-6">{address}</p>

          <Link to="/home/book-appointment">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
