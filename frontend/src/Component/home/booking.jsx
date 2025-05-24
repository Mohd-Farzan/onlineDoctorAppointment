import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BookingWidget() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Pick a time slot</h2>
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg mb-6">
        <Home className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <p className="font-medium">Clinic Appointment</p>
          <p className="text-sm text-gray-600">₹500 fee</p>
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="font-medium mb-1">Blooming Life Style</h3>
        <p className="text-sm text-gray-600 mb-1">₹500</p>
        <p className="text-sm text-gray-600">Kalyanpur</p>
      </div>
      <Button className="w-full mt-6">Call Now</Button>
    </div>
  )
}

