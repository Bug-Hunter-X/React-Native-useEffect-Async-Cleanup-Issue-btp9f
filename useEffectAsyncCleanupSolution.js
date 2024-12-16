```javascript
import React, { useEffect, useState, useRef } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', {
          signal: controller.signal,
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  );
};

export default MyComponent;
```