import { Check } from "lucide-react"

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
  export default BenefitCard