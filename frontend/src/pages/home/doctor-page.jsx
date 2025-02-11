import { Search } from "@/Component/home/search"
import { BookingWidget } from "@/Component/home/booking"
import DoctorProfile from "../../Component/home/doctor_profile"


function DoctorPage() {
  return (
  <div className="min-h-screen ">
      <Search />
    <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
            <DoctorProfile />
      </div>
      <div>
        < BookingWidget/>
       </div>
    </div>
    </div>
  </div>
  )
}

export default DoctorPage