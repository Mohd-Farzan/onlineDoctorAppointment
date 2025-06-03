import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emergencyRequest } from "@/store/videoCall-slice";
import CommonForm from "@/Component/Common/form";
import { requestForm } from "@/config";


function ConsultForm(){
 const location = useLocation();
const { speciality } = location.state || {};

const dispatch=useDispatch()
  const [formData,setFormData]=useState({problem: "",
    email:"",
    phone: "",
  speciality: speciality || ""})
  useEffect(() => {
  if (speciality) {
    setFormData(prev => ({ ...prev, speciality }));
  }
}, [speciality]);

  
  function onSubmit(event,){
    event.preventDefault()
    dispatch(emergencyRequest(formData)).then((data)=>{
      if(data?.payload?.success){
        alert('your form is submitted we will join you in meeting')
      }else {
                alert("Failed to fill form");
            }
    }).catch((err) => console.error("Error in form entry:", err));
  }
  console.log(formData,"formdata")
  console.log(speciality,"DDD")
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
        {speciality && (
  <div className="text-sm text-gray-500 mb-4">
    <strong>Speciality:</strong> {speciality}
  </div>
)}

        <CommonForm
          formData={formData}
          setFormData={setFormData}
          formControls={requestForm}
          buttonText='continue'
          onSubmit={onSubmit}
      />

        
      </div>
    </div>

      
    </div>
  );
};

export default ConsultForm;