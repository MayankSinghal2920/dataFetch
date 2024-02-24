import React from 'react';
import UserData from './UserData.jsx';
import './styles.css'; // Import the CSS file

const App = () => {
  return (
    <div className="App">
      <h1>User Data</h1>
      <div className="UserData">
        <UserData />
      </div>
    </div>
  );
};

export default App;