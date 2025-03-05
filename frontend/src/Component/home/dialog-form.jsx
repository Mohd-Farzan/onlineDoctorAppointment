import { Dialog, DialogContent } from '@/components/ui/dialog'
import React from 'react'

function DialogForm() {
    const [open,setOpen]=useState(false)
  return <div className="flex">
    
    <Dialog open={open}>
        <DialogContent><h1>open</h1></DialogContent>
    </Dialog>
  </div>
}

export default  DialogForm