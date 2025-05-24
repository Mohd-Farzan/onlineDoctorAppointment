import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const ConsultationForm = () => {
  const [symptom, setSymptom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Consult with a Doctor
        </h2>
        <button className="text-gray-500 hover:text-gray-700">
        <Link  to='/home/consult'>  <X className="w-6 h-6" /></Link>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Tell us your symptom or health problem
          </label>
          <Input
            placeholder="Eg: fever, headache"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">Min 4 characters</p>
        </div>

        <div>
          <p className="text-gray-700 mb-4">
            A relevant speciality will be shown below...
          </p>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Mobile number</label>
          <div className="flex">
            <div className="flex items-center bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3">
              <span className="text-gray-500">🇮🇳</span>
              <span className="text-gray-500 ml-1">+91</span>
            </div>
            <Input
              type="tel"
              placeholder="Enter mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-l-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={() => console.log("Continue clicked")}
          >
            Continue
          </Button>

          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/82c22c9c-1184-416b-861b-1841635e5db8.png"
              alt="Doctor verification"
              className="w-12 h-12"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Verified Doctors</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ConsultForm(){
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ConsultationForm />
    </div>
  );
};

export default ConsultForm;