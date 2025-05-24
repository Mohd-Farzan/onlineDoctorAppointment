import React from 'react'

function Table() {
  return (
    <div>
       <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Doctor</th>
              <th className="py-3 px-6 text-left">Patient</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            
                <tr  className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6">
                    <span className="bg-green-200 text-green-700 text-sm px-3 py-1 rounded-full">
                      
                    </span>
                  </td>
                </tr>
             
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No appointments found.</td>
              </tr>
            
          </tbody>
        </table>
    </div>
  )
}

export default Table
