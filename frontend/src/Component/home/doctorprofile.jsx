export default function DoctorProfile({
    doctor
  }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* <img src={doctor.image} alt={doctor.userName} className="w-full h-48 object-cover rounded-t-lg" /> */}
        <h3 className="text-xl font-bold mt-4">{doctor.userName}</h3>
        {/* <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-gray-600">{doctor.education}</p> */}
        {/* <p className="text-gray-600">{availableDays}, {availableHours}</p> */}
        {/* <p className="text-gray-600">{doctor.experience} years of experience</p> */}
        {/* <p className="text-gray-600">{rating} ({reviewCount} reviews)</p> */}
      </div>
    );
  }