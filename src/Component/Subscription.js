import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './subscription.css'; // Custom CSS for styling
import { FaArrowDown } from "react-icons/fa";


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
    .filter(sub => sub.user_id?.toLowerCase().includes(filter.toLowerCase()))
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
    user_id: sub.user_id || 0,
  }));

  return (
    <main className="subscription-container">
      {/* Filter Input */}

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

 
      <div className="filter-section">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by user_id"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Subscription Table */}
      <div className="table-section">
        <table className="responsive-table">
          <thead>
            <tr>
          
            <th  onClick={() => setSortKey('user_id')}>User ID  <FaArrowDown className='arrow' /></th>
              <th onClick={() => setSortKey('package')}>Plan <FaArrowDown className='arrow' /></th>
              <th onClick={() => setSortKey('expires_on')}>Expires On <FaArrowDown className='arrow' /></th>
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
            <Bar dataKey="user_id" fill="#82ca9d" />
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
            <Line type="monotone" dataKey="user_id" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Subscription;
