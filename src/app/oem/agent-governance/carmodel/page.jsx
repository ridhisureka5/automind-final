"use client"

import { useState } from "react"
import {
 LineChart,
 Line,
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts"

/* 20 Car Models */

const cars = [
"Hyundai Creta","Hyundai Venue","Hyundai i20","Tata Nexon","Tata Punch",
"Tata Harrier","Mahindra XUV700","Mahindra Scorpio","Mahindra Thar",
"Maruti Brezza","Maruti Baleno","Maruti Swift","Kia Seltos","Kia Sonet",
"Toyota Fortuner","Toyota Hyryder","Honda City","Honda Elevate",
"MG Hector","MG ZS EV"
]

/* Generate Trend Data */

function generateTrend(){

return [
{month:"Jan", defects:Math.floor(Math.random()*200)},
{month:"Feb", defects:Math.floor(Math.random()*200)},
{month:"Mar", defects:Math.floor(Math.random()*200)},
{month:"Apr", defects:Math.floor(Math.random()*200)},
{month:"May", defects:Math.floor(Math.random()*200)}
]

}

/* Generate City Data */

function generateCities(){

return [
{city:"Delhi", defects:Math.floor(Math.random()*100)},
{city:"Mumbai", defects:Math.floor(Math.random()*100)},
{city:"Bangalore", defects:Math.floor(Math.random()*100)},
{city:"Pune", defects:Math.floor(Math.random()*100)},
{city:"Hyderabad", defects:Math.floor(Math.random()*100)}
]

}

/* Generate Alerts */

function generateAlerts(car){

const issues = [
"Engine overheating",
"Brake vibration",
"Electrical sensor fault",
"Transmission delay",
"ABS warning",
"Battery failure",
"ECU malfunction"
]

const cities = [
"Delhi","Mumbai","Pune","Bangalore","Hyderabad"
]

const months = ["Jan","Feb","Mar","Apr","May"]

return Array.from({length:5}).map(()=>({

car:car,
issue:issues[Math.floor(Math.random()*issues.length)],
city:cities[Math.floor(Math.random()*cities.length)],
month:months[Math.floor(Math.random()*months.length)]

}))

}

export default function Dashboard(){

const [selectedCar,setSelectedCar] = useState(cars[0])

const [trend,setTrend] = useState(generateTrend())

const [cityData,setCityData] = useState(generateCities())

const [alerts,setAlerts] = useState(generateAlerts(cars[0]))

function handleCarChange(car){

setSelectedCar(car)

setTrend(generateTrend())

setCityData(generateCities())

setAlerts(generateAlerts(car))

}

const totalDefects = trend.reduce((sum,item)=>sum+item.defects,0)

return(

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-3xl font-bold mb-8">
OEM Manufacturing Intelligence Dashboard
</h1>

{/* KPI Cards */}

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Selected Car</p>
<h2 className="text-xl font-bold">{selectedCar}</h2>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Total Defects (5 months)</p>
<h2 className="text-2xl font-bold text-red-500">{totalDefects}</h2>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Cities Reporting</p>
<h2 className="text-2xl font-bold">{cityData.length}</h2>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Critical Alerts</p>
<h2 className="text-2xl font-bold text-red-600">{alerts.length}</h2>
</div>

</div>

{/* Select Car */}

<div className="bg-white p-6 rounded shadow mb-10">

<h2 className="text-xl font-semibold mb-4">
Select Car Model
</h2>

<select
className="border p-2 rounded"
value={selectedCar}
onChange={(e)=>handleCarChange(e.target.value)}
>

{cars.map((car)=>(
<option key={car}>{car}</option>
))}

</select>

</div>

{/* Trend Chart */}

<div className="bg-white p-6 rounded shadow mb-10">

<h2 className="text-xl font-semibold mb-4">
{selectedCar} Defect Trend (Last 5 Months)
</h2>

<div style={{width:"100%",height:300}}>

<ResponsiveContainer>

<LineChart data={trend}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="defects"
stroke="#6366f1"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

{/* City Chart */}

<div className="bg-white p-6 rounded shadow mb-10">

<h2 className="text-xl font-semibold mb-4">
City Wise Defects for {selectedCar}
</h2>

<div style={{width:"100%",height:300}}>

<ResponsiveContainer>

<BarChart data={cityData}>

<XAxis dataKey="city"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="defects" fill="#3b82f6"/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

{/* 20 Car Monitoring Cards */}

<h2 className="text-xl font-semibold mb-6">
Car Defect Alerts Overview
</h2>

<div className="grid grid-cols-4 gap-6 mb-12">

{cars.map((car,index)=>{

const defects = Math.floor(Math.random()*20)+1

return(

<div
key={index}
className="bg-white p-5 rounded shadow"
>

<h3 className="font-semibold mb-2">
{car}
</h3>

<p className="text-gray-500">
Monthly Defects
</p>

<p className="text-2xl font-bold text-red-500">
{defects}
</p>

</div>

)

})}

</div>

{/* Alerts Table */}

<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-semibold mb-4">
Recent Alerts for {selectedCar}
</h2>

<table className="w-full">

<thead>

<tr className="border-b text-left">

<th className="py-2">Car</th>
<th>Issue</th>
<th>City</th>
<th>Month</th>

</tr>

</thead>

<tbody>

{alerts.map((alert,i)=>(

<tr key={i} className="border-b">

<td className="py-2">{alert.car}</td>
<td>{alert.issue}</td>
<td>{alert.city}</td>
<td>{alert.month}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}