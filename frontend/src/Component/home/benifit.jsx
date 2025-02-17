function BenefitCard({ title, description }) {
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm pl-7">{description}</p>
      </div>
    )
  }

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 border rounded-lg">
          <BenefitCard
            title="Consult Top Doctors 24x7"
            description="Connect instantly with a 24x7 specialist or choose to video visit a particular doctor."
          />
          <BenefitCard
            title="Convenient and Easy"
            description="Start an instant consultation within 2 minutes or do video consultation at the scheduled time."
          />
          <BenefitCard
            title="100% Safe Consultations"
            description="Be assured that your online consultation will be fully private and secured."
          />
          <BenefitCard
            title="Similar Clinic Experience"
            description="Experience clinic-like consultation through a video call with the doctor. Video consultation is available only on the Practo app."
          />
          <BenefitCard
            title="Free Follow-up"
            description="Get a valid digital prescription and a 7-day, free follow-up for further clarifications."
          />
        </div>
export default BenefitCard