import { useEffect, useState } from "react"
import { Calendar, Clock, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { userAppointment } from "@/store/appointment-slice"

// Sample appointment data
// const initialAppointments = [
//   {
//     id: 1,
//     title: "Dental Checkup",
//     date: "2025-03-10",
//     time: "10:00 AM",
//     location: "Smile Dental Clinic",
//     status: "upcoming",
//   },
//   {
//     id: 2,
//     title: "Annual Physical",
//     date: "2025-03-15",
//     time: "2:30 PM",
//     location: "City Health Center",
//     status: "upcoming",
//   },
//   {
//     id: 3,
//     title: "Eye Examination",
//     date: "2025-03-20",
//     time: "11:15 AM",
//     location: "Vision Care Center",
//     status: "upcoming",
//   },
//   {
//     id: 4,
//     title: "Therapy Session",
//     date: "2025-02-28",
//     time: "4:00 PM",
//     location: "Wellness Center",
//     status: "completed",
//   },
//   {
//     id: 5,
//     title: "Dermatologist",
//     date: "2025-02-15",
//     time: "9:30 AM",
//     location: "Skin Care Clinic",
//     status: "cancelled",
//   },
// ]

function Appointment() {
  // const [appointments, setAppointments] = useState()
  // const appointments=useSelector((state)=>state.appointment)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(userAppointment())
  })
   
  
  console.log(userAppointment,"safd")
  // Filter appointments based on active tab
  // const filteredAppointments = appointments.filter((appointment) => appointment.status === activeTab)

  // const handleEdit = (appointment) => {
  //   setEditingAppointment({ ...appointment })
  //   setIsEditDialogOpen(true)
  // }

  // const handleSaveEdit = () => {
  //   if (editingAppointment) {
  //     setAppointments(
  //       appointments.map((appointment) =>
  //         appointment.id === editingAppointment.id ? editingAppointment : appointment,
  //       ),
  //     )
  //     setIsEditDialogOpen(false)
  //     setEditingAppointment(null)
  //   }
  // }

  // const handleCancel = (id) => {
  //   setAppointments(
  //     appointments.map((appointment) =>
  //       appointment.id === id ? { ...appointment, status: "cancelled" } : appointment,
  //     ),
  //   )
  // }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setEditingAppointment({ ...editingAppointment, [name]: value })
  // }

  // const handleSelectChange = (name, value) => {
  //   setEditingAppointment({ ...editingAppointment, [name]: value })
  // }

  // const getStatusBadge = (status) => {
  //   switch (status) {
  //     case "upcoming":
  //       return <Badge variant="default">Upcoming</Badge>
  //     case "completed":
  //       return <Badge variant="success" className='bg-green-600 text-white'>Completed</Badge>
  //     case "cancelled":
  //       return <Badge variant="destructive">Cancelled</Badge>
  //     default:
  //       return <Badge>Unknown</Badge>
  //   }
  // }

  return (
    <>
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">My Appointments</CardTitle>
        <CardDescription>View, edit, and manage your upcoming appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredAppointments.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Appointment</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Time</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="font-medium">{appointment.title}</div>
                          <div className="md:hidden text-sm text-muted-foreground mt-1">
                            {(new Date(appointment.date), "MMM d, yyyy")} at {appointment.time}
                          </div>
                          <div className="md:hidden text-sm text-muted-foreground">{appointment.location}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {(new Date(appointment.date), "MMM d, yyyy")}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {appointment.time}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{appointment.location}</TableCell>
                        <TableCell className="text-right">
                          {appointment.status === "upcoming" ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(appointment)}>
                                  Edit Appointment
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCancel(appointment.id)}>
                                  Cancel Appointment
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <div className="px-2">{getStatusBadge(appointment.status)}</div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-muted-foreground mb-2">No {activeTab} appointments found</div>
                {activeTab === "upcoming" && <Button variant="outline">Schedule New Appointment</Button>}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Appointment Dialog */}
        {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
              <DialogDescription>Make changes to your appointment details here.</DialogDescription>
            </DialogHeader>
            {editingAppointment && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={editingAppointment.title} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={editingAppointment.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={editingAppointment.time} onValueChange={(value) => handleSelectChange("time", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                      <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                      <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={editingAppointment.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </CardContent> 
    </Card>
    </>
  )
}
export default Appointment
