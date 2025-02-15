export default function DoctorProfile({
    name,
    specialty,
    imageUrl,
    rating,
    reviewCount,
    experience,
    education,
    availableDays,
    availableHours,
  }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
        <h3 className="text-xl font-bold mt-4">{name}</h3>
        <p className="text-gray-600">{specialty}</p>
        <p className="text-gray-600">{education}</p>
        <p className="text-gray-600">{availableDays}, {availableHours}</p>
        <p className="text-gray-600">{experience} years of experience</p>
        <p className="text-gray-600">{rating} ({reviewCount} reviews)</p>
      </div>
    );
  }