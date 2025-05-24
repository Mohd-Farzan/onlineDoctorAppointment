import React, { useState } from 'react'

function BookingDialog(open,setOpen) {
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl text-[#22a5d8]">Book Clinic Visit</DialogTitle>
                <DialogDescription>Please select a time slot to book your appointment</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{doctor.id}</p>
                      <p className="text-sm text-gray-600">Gynecologist/Obstetrician</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹900</p>
                      <p className="text-xs text-green-600">No Booking Fee</p>
                    </div>
                  </div>
    
                  <div className="border-t border-b border-gray-100 py-3 my-2">
                    <p className="font-medium">Select Date & Time</p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="border border-[#22a5d8] bg-blue-50 rounded p-2 text-center">
                        <p className="text-sm font-medium">Today</p>
                        <p className="text-xs text-green-600">6 Slots</p>
                      </div>
                      <div className="border border-gray-200 rounded p-2 text-center">
                        <p className="text-sm font-medium">Tomorrow</p>
                        <p className="text-xs text-green-600">4 Slots</p>
                      </div>
                      <div className="border border-gray-200 rounded p-2 text-center">
                        <p className="text-sm font-medium">Tue, 11 Mar</p>
                        <p className="text-xs text-green-600">4 Slots</p>
                      </div>
                    </div>
    
                    <p className="font-medium mt-4 mb-2">Available Slots</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-[#22a5d8] bg-blue-50 text-[#22a5d8] rounded p-2 text-center text-sm">
                        06:00 PM
                      </div>
                      <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">06:30 PM</div>
                      <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">07:00 PM</div>
                      <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">07:30 PM</div>
                      <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">08:00 PM</div>
                      <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">08:30 PM</div>
                    </div>
                  </div>
    
                  <div>
                    <p className="font-medium">Patient Details</p>
                    <p className="text-sm text-gray-600">Please fill in your details to complete the booking</p>
                    <Button className="bg-[#22a5d8] hover:bg-[#1d94c4] w-full mt-3">Continue</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
  )
}

export default BookingDialog