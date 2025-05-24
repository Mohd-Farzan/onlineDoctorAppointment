import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const patient=[{
  name:"hell"},
   {name:"kk"},
   {name:"kk"},
   {name:"kk"},

]
const yestarday = [{
  name:"ohh"
},
{name:"aajj"},
{name:"aajj"},
]
const nextTick =[
  {name:"kk"},
  {name:"kk"},
  {name:"kk"},  
  {name:"kk"},
  {name:"kk"},
  {name:"kk"},
]
const data = [
  { name: "Today", value: patient.length },
  { name: "yestarday", value: yestarday.length },
  { name: "NExt patient", value: nextTick.length },

];

const COLORS = ["#FF5733", "#3498db", "#27ae60"];
function PieChartComponent() {
  return (
    <div className="w-screen h-screen flex items-center justify-center mt-3 mr-3 ">
    <div className="w-full max-w-4xl h-full flex items-center justify-center">
      <div className="p-3 bg-white rounded-lg shadow-lg  flex items-center justify-center">
        <PieChart width={600} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  </div>
  );
}
export default PieChartComponent
