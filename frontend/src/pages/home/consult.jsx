import { Check, ChevronRight, MessageSquare, Sparkles, Stethoscope, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import image from '../../assets/img/counsult.webp'
import BenefitCard from "@/Component/home/benifit"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fatchDoctor } from "@/store/doctor-slice"
import { specialities } from "@/config"

function CunsultPage() {
  const {doctorList}=useSelector((state)=>state.doctor);
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fatchDoctor()).then((data) => {
      console.log(data); 
    });
  },[]);
  console.log(doctorList,"cunsultPage")
  return (
    <div className="min-h-screen ">
      <section className="container px-4 py-8 mx-auto bg-pink-500 bg-opacity-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Skip the travel!</h1>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Take Online Doctor Consultation</h2>
              <p className="text-lg text-gray-600">Private consultation + Audio call · Starts at just ₹199</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                +127 Doctors are online
              </span>
            </div>

            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Consult Now
            </Button>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Verified Doctors
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Digital Prescription
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Free Followup
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src={image}
              alt="Doctor consultation"
              width={600}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <section className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">30+ Specialities</h2>
          <Link to= "/home/doctor">
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            See all Specialities
            <ChevronRight className="w-4 h-4" />
          </Button>
          </Link>
         
        </div>

        <p className="text-gray-600 mb-6">Consult with top doctors across specialities</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          
          {
          doctorList.slice(0,6).map((doctor) => (
            <Card key={doctor._id} className="relative group">
              <div className="p-4 text-center space-y-2">
                <div className="w-20 h-20 mx-auto mb-3">
                  <img
                    src={image}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
                <h3 className="font-medium text-sm">{doctor.speciality}</h3>
                <p className="text-gray-600">₹{doctor.fees}</p>
                
                <Link to="/home/consulting-form"   state={{ speciality: doctor.speciality }}className="text-blue-500 text-sm hover:underline inline-flex items-center gap-1">
                  Consult now
                  <ChevronRight className="w-4 h-4" />
                </Link>
                
              </div>
            </Card>
          ))
          }
        </div>
      </section>


      <section className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Common Health Concerns</h2>
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            See all Symptoms
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-gray-600 mb-6">Consult with top doctors across specialities</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {doctorList.slice(0,6).map((doctor) => (
            <Card key={doctor._id} className="relative group">
              <div className="p-4 text-center space-y-2">
                <div className="w-20 h-20 mx-auto mb-3">
                  <img
                    src={image}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-medium text-sm">{doctor.speciality}</h3>
                <p className="text-gray-600">₹{doctor.fees}</p>
                <Link to="/home/consulting-form" className="text-blue-500 text-sm hover:underline inline-flex items-center gap-1">
                  Consult now
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm">Select a doctor or symptom</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm">Audio/video call with a verified doctor</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm">Get a digital prescription & a free follow-up</p>
          </div>
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gray-200 -z-10"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gray-200 -z-10"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-12 -mx-4 px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">2,00,000+</h3>
            <p className="text-sm text-gray-300">Happy Users</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">20,000+</h3>
            <p className="text-sm text-gray-300">Verified Doctors</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">25+</h3>
            <p className="text-sm text-gray-300">Specialities</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">4.5/5</h3>
            <p className="text-sm text-gray-300">App Rating</p>
          </div>
        </div>
      </section>
      <section className="mb-16 ">
        <h2 className="text-2xl font-bold mb-8">Benefits of Online Consultation</h2>
        <BenefitCard/>
      </section>
    </div>
  )
}
export default CunsultPage
