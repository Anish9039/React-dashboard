// import React, { useEffect, useState } from 'react';
// import { BsFillArchiveFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// function Home() {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [sortedSubscriptions, setSortedSubscriptions] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedSubscription, setSelectedSubscription] = useState(null);
//   const [sortKey, setSortKey] = useState('name');  // State to store sort key

//   // Fetching data asynchronously
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const subscriptionResponse = await fetch('/API/subscriptions.json');
//         const userResponse = await fetch('/API/users.json');

//         if (!subscriptionResponse.ok || !userResponse.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const subscriptionData = await subscriptionResponse.json();
//         const userData = await userResponse.json();

//         setSubscriptions(subscriptionData);
//         setUsers(userData);
//         setSortedSubscriptions(subscriptionData);  // Set initial data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs once

//   // Handle filtering based on category
//   useEffect(() => {
//     const filtered = subscriptions.filter(sub => sub.package && sub.package.includes(filter));
//     setSortedSubscriptions(filtered);
//   }, [filter, subscriptions]); // Depend on filter and subscriptions

//   // Handle sorting logic
//   useEffect(() => {
//     const sortedData = [...sortedSubscriptions].sort((a, b) => {
//       if (a[sortKey] > b[sortKey]) return 1;
//       if (a[sortKey] < b[sortKey]) return -1;
//       return 0;
//     });
//     setSortedSubscriptions(sortedData);
//   }, [sortKey, subscriptions]); // Depend on sortKey and subscriptions

//   // Handle sorting on table header click
//   const handleSort = (key) => {
//     setSortKey(key);  // Update the sort key
//   };

//   // Open the modal to view subscription details
//   const openModal = (sub) => {
//     setSelectedSubscription(sub);
//     setModalOpen(true);
//   };

//   // Close the modal
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedSubscription(null);
//   };

//   // Chart data transformation
//   const chartData = sortedSubscriptions.map((sub, index) => ({
//     name: `Sub ${index + 1}`,
//     pv: sub.package,
//     uv: sub.activeUsers,  // Assuming activeUsers is a numeric value
//   }));

//   return (
//     <main className="main-container">
   

//       {/* Filter for Subscriptions */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Filter by Category"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//       </div>

//       {/* Table for Subscribers */}
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th onClick={() => handleSort('User id')}>Name</th>
//               <th onClick={() => handleSort('Plan')}>Plan</th>
//               <th onClick={() => handleSort('Expires on')}>Active Users</th>
//               {/* <th onClick={() => handleSort('totalRevenue')}>Total Revenue</th> */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedSubscriptions.map(sub => (
//               <tr key={sub.id}>
//                 <td>{sub.user_id}</td>
//                 <td>{sub.package}</td>
//                 <td>{sub.expires_on}</td>
//                 {/* <td>{sub.totalRevenue}</td> */}
//                 <td>
//                   <button onClick={() => openModal(sub)}>View Details</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal to Show Subscription Details */}
//       {modalOpen && selectedSubscription && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Subscription Details</h2>
//             <p>Name: {selectedSubscription.name}</p>
//             <p>Plan: {selectedSubscription.packages}</p>
//             <p>expire: {selectedSubscription.expires_on}</p>
//             {/* <p>Total Revenue: {selectedSubscription.totalRevenue}</p> */}
//             {/* <p>Alerts: {selectedSubscription.alerts}</p> */}
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Charts Section */}
//       <div className="charts">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={chartData}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="pv" fill="#8884d8" />
//             <Bar dataKey="uv" fill="#82ca9d" />
//           </BarChart>
//         </ResponsiveContainer>

//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={chartData}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//             <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </main>
//   );
// }

// export default Home;



import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './subscription.css'; // Custom CSS for styling

function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [sortKey, setSortKey] = useState('user_id');

  // Fetching data asynchronously
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/API/subscriptions.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filtered and sorted subscriptions
  const filteredSubscriptions = subscriptions
    .filter(sub => sub.package?.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));

  // Open modal with subscription details
  const openModal = (subscription) => {
    setSelectedSubscription(subscription);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedSubscription(null);
  };

  // Chart data
  const chartData = filteredSubscriptions.map((sub, index) => ({
    name: `Sub ${index + 1}`,
    plan: sub.package.length,
    activeUsers: sub.activeUsers || 0,
  }));

  return (
    <main className="subscription-container">
      {/* Filter Input */}
      <div className="filter-section">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by Category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Subscription Table */}
      <div className="table-section">
        <table className="responsive-table">
          <thead>
            <tr>
              <th onClick={() => setSortKey('user_id')}>User ID</th>
              <th onClick={() => setSortKey('package')}>Plan</th>
              <th onClick={() => setSortKey('expires_on')}>Expires On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.user_id}</td>
                <td>{sub.package}</td>
                <td>{sub.expires_on}</td>
                <td>
                  <button className="view-details-button" onClick={() => openModal(sub)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Subscription Details */}
      {modalOpen && selectedSubscription && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Subscription Details</h2>
            <p><strong>User ID:</strong> {selectedSubscription.user_id}</p>
            <p><strong>Plan:</strong> {selectedSubscription.package}</p>
            <p><strong>Expires On:</strong> {selectedSubscription.expires_on}</p>
            <button className="close-modal-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="charts-section">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="plan" fill="#8884d8" />
            <Bar dataKey="activeUsers" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="plan" stroke="#8884d8" />
            <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Subscription;
