import { useState, useEffect } from 'react';

const url = 'https://api.github.com/users/john-smilga/followers?per_page=92';

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getProducts = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      setLoading(false)
    } catch(e) {
      console.error(e);
      setError(true);
    }
  }

  useEffect(() => {
    getProducts()
  }, []);

  return { loading, data, error }
}
