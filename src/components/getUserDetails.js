import { useEffect, useState } from 'react';

const useAzureUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/.auth/me')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        console.log(res.json)
        return res.json();
      })
      .then(data => {
        if (data?.length > 0) {
          setUser(data[0]);
        }
      })
      .catch(err => {
        console.error('Error al obtener usuario:', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading, error };
};

export default useAzureUser;
