import React, { useState } from 'react';
import axios from 'axios';

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [latestUser, setLatestUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://randomuser.me/api');
      const newUser = response.data.results[0];
      setLatestUser(newUser);
      setUserData(prevData => [...prevData, newUser]);
      localStorage.setItem('userData', JSON.stringify([...userData, newUser]));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
    setIsFirstFetch(false);
  };

  const refreshData = () => {
    fetchData();
  };

  const fetchFirstData = () => {
    fetchData();
    setIsFirstFetch(false);
  };

  return (
    <div>
      {isFirstFetch ? (
        <button onClick={fetchFirstData} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch First Data'}
        </button>
      ) : (
        <div>
          <div className="latest-user">
            {latestUser && (
              <div>
                <h2>Newest User</h2>
                <p><strong>Name:</strong> {latestUser.name.first} {latestUser.name.last}</p>
                <p><strong>Email:</strong> {latestUser.email}</p>
              </div>
            )}
          </div>
          <button onClick={refreshData} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.name.first} {user.name.last}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
