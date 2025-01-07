import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { PieChart, Pie, Cell } from 'recharts';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Home() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetching data asynchronously
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionResponse = await fetch('/API/subscriptions.json');
        const userResponse = await fetch('/API/users.json');

        if (!subscriptionResponse.ok || !userResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const subscriptionData = await subscriptionResponse.json();
        const userData = await userResponse.json();

        setSubscriptions(subscriptionData);
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once
// Aggregate data for package counts and user counts
// Aggregate data for package counts and user counts
const packageCounts = subscriptions.reduce((acc, sub) => {
  acc[sub.package] = (acc[sub.package] || 0) + 1;
  return acc;
}, {});

const userCounts = subscriptions.reduce((acc, sub) => {
  acc[sub.user_id] = (acc[sub.user_id] || 0) + 1;
  return acc;
}, {});

// Transform the packageCounts object into chartData
const chartData1 = Object.entries(packageCounts).map(([packageName, packageCount]) => ({
  name: packageName,
  packageCount: packageCount,
}));

// Add user counts as a second dataset for chart comparison
const userData = Object.entries(userCounts).map(([userId, userCount]) => ({
  name: `User ${userId}`,
  userCount: userCount,
}));

// Combine both datasets if needed (optional)
const combinedChartData = chartData1.map((data, index) => ({
  ...data,
  userCount: userData[index]?.userCount || 0, // Align users and packages by index
}));



const packageCounts1 = subscriptions.reduce((acc, sub) => {
  acc[sub.package] = (acc[sub.package] || 0) + 1;
  return acc;
}, {});

const chartData2 = Object.entries(packageCounts).map(([key, value]) => ({
  name: key,
  count: value,
}));
  // Transform data for the chart
  const chartData = [
    { name: 'Subscriptions', count: subscriptions.length },
    { name: 'Users', count: users.length },
  ];

  // const chartData2 = [
  //   { name: 'Subscriptions', count: subscriptions.length },
  //   { name: 'Users', count: users.length },
  // ];

  // const chartData1 = [
  //   { name: 'Subscriptions', count: subscriptions.package },
  //   { name: 'Users', count: users.id},
  // ];


  //pie chart
   

  // Aggregate users by country
  const usersByCountry = users.reduce((acc, user) => {
    const country = user.country || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  // Transform data for users by country
  const countryChartData = Object.entries(usersByCountry).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Aggregate subscriptions by plan
  const subscriptionsByPlan = subscriptions.reduce((acc, sub) => {
    const plan = sub.package || "Unknown";
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {});

  // Transform data for subscriptions by plan
  const planChartData = Object.entries(subscriptionsByPlan).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Colors for the pie slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];
  return (
    <div className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3> Subscription </h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <a href='/subscriptions' ></a>
          <h1>{subscriptions.length}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3> User </h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{users.length}</h1>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <h3>Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="chart-container">
        <h3>Subscription over plan</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData2}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
  <h3>Subscriptions and User Counts</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={combinedChartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="packageCount" fill="#8884d8" name="Packages" />
      <Bar dataKey="userCount" fill="#82ca9d" name="Users" />
    </BarChart>
  </ResponsiveContainer>
</div>

<div className="chart-container">
          <h4>Users by Country</h4>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={countryChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                fill="#8884d8"
                label
              >
                {countryChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subscriptions by Plan Pie Chart */}
        <div className="chart-container">
          <h4>Subscriptions by Plan</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {planChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
    

    </div>
  );
}

export default Home;
