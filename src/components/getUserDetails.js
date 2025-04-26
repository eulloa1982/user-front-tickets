import { useState } from 'react';

const useAzureUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = () => {
    setLoading(true);
    fetch('/.auth/me')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Respuesta de /.auth/me:', data);
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
  };

  return { user, loading, error, getUser };
};

export default useAzureUser;

