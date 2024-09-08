import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

  // Function to call API based on device type
  const fetchData = async (isMobileDevice) => {
    const apiUrl = isMobileDevice
      ? 'http://localhost:5000/api/mobile-greet'
      : 'http://localhost:5000/api/greet';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call API only once based on initial device type
    fetchData(isMobile);

    // Event listener to handle resize (update isMobile state but not call API)
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]); // API call only happens once because `isMobile` won't change after the first call

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
