import { useEffect, useState } from "react"
import { Calendar, Clock, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { cancleAppointment, userAppointment } from "@/store/appointment-slice"

function Appointment() {
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")
  const { appointment = [], loading, error } = useSelector((state) => state.appointment)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userAppointment())
  }, [dispatch])

  //  const filteredAppointments = appointment // Modify if status filtering is needed
  
 const appointmentList = Array.isArray(appointment) ? appointment : [];

 const filteredCancelAppointment=appointmentList.filter(item => item.patient.status === 'rejected')
const filteredAppointment = appointmentList.filter((app) => app.patient.status == activeTab)


  const handleEdit = (appointment) => {
    setEditingAppointment({ ...appointment })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    // TODO: Add API call
    setIsEditDialogOpen(false)
    setEditingAppointment(null)
  }

 const handleCancel = async (_id, email) => {
  try {
    const result = await dispatch(cancleAppointment({ _id, email }));
    if (cancleAppointment.fulfilled.match(result)) {
      alert("Appointment cancelled");
      // Refresh the appointment list from server
      dispatch(userAppointment());
    } else {
      alert("Failed to cancel appointment");
      console.error(result.payload || result.error);
    }
  } catch (error) {
    console.error("Error in handleCancel:", error);
    alert("An error occurred");
  }
};
    console.log(filteredCancelAppointment,"afdf")
useEffect(()=>{
  dispatch(userAppointment())
},[dispatch])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditingAppointment((prev) => ({
      ...prev,
      patient: { ...prev.patient, [name]: value }
    }))
  }

  const handleSelectChange = (name, value) => {
    setEditingAppointment((prev) => ({
      ...prev,
      patient: { ...prev.patient, [name]: value }
    }))
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-green-600 text-white">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">My Appointments</CardTitle>
          <CardDescription>manage your upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="pending">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="rejected">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredAppointment.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Doctor</TableHead>
                        <TableHead className="hidden md:table-cell">Day</TableHead>
                        <TableHead className="hidden md:table-cell">Time</TableHead>
                        <TableHead className="hidden md:table-cell">Reason</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointment.map((appointment, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{appointment.doctor?.doctorname}</div>
                            <div className="md:hidden text-sm text-muted-foreground mt-1">
                              {appointment.patient?.days} at {appointment.patient?.times}
                            </div>
                            <div className="md:hidden text-sm text-muted-foreground">
                              {appointment.patient?.reason}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {appointment.patient?.days}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {appointment.patient?.times}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{appointment.patient?.reason}</TableCell>
                          <TableCell className="hidden md:table-cell text-red-600 font-semibold">{appointment.patient?.status}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {/* <DropdownMenuItem onClick={() => handleEdit(appointment)}>Edit Appointment</DropdownMenuItem> */}
                                <DropdownMenuItem onClick={() => handleCancel(appointment._id,appointment.patient.email)}>Cancel Appointment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-muted-foreground mb-2">No {activeTab} appointments found</div>
                  {activeTab === "pending" && <Link to ="/home/book-appointment"><Button variant="outline">Schedule New Appointment</Button></Link>}
                  {activeTab==="rejected" && 
                  <TableBody>
                      {filteredCancelAppointment.map((appointment, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{appointment.doctor?.doctorname}</div>
                            <div className="md:hidden text-sm text-muted-foreground mt-1">
                              {appointment.patient?.days} at {appointment.patient?.times}
                            </div>
                            <div className="md:hidden text-sm text-muted-foreground">
                              {appointment.patient?.reason}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {appointment.patient?.days}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {appointment.patient?.times}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{appointment.patient?.reason}</TableCell>
                          <TableCell className="hidden md:table-cell text-red-600 font-semibold">{appointment.patient?.status}</TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  }
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      
       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Make changes to your appointment details here.</DialogDescription>
          </DialogHeader>
          {editingAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="days">Day</Label>
                <Input
                  id="days"
                  name="days"
                  value={editingAppointment.patient?.days}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="times">Time</Label>
                <Select
                  value={editingAppointment.patient?.times}
                  onValueChange={(value) => handleSelectChange("times", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  name="reason"
                  value={editingAppointment.patient?.reason}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Appointment
