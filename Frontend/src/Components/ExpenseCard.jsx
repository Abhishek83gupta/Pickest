import React from 'react'
import { useLocation } from 'react-router-dom';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";

// const data = [
//     {
//       name: "Page A",
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: "Page B",
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: "Page C",
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: "Page D",
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: "Page E",
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: "Page F",
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: "Page G",
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];

const ExpenseCard = ({data, title, value, dataKey}) => {

  const { pathname } = useLocation();

  return (
    <div>
       <h1 className='text-2xl font-semibold my-5 ml-8'>{title}</h1>
       <div className=" w-[83vw] sm:w-[25vw] ml-8 p-2 bg-white rounded-2xl shadow-lg flex flex-col justify-between items-center gap-5">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
           margin={{
            top: 10,
            bottom: 0,  // Adjust bottom margin if necessary
            left: -61,     // Experiment with this
            right: 10,    // Experiment with this
           }}
           data={data}>
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#8884d8"
              strokeWidth={2}
            />
            <XAxis dataKey="title" hide />
            <YAxis />
            <Tooltip />    
          </LineChart>
        </ResponsiveContainer>
        <p> Total {pathname == "/seller/profile" ? "Earned" : "Spent "} : ${value}</p>
      </div>

    </div>
  )
}

export default ExpenseCard
