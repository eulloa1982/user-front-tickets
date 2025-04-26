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
        return res.json();
      })
      .then(data => {
        console.log('Respuesta de /.auth/me:', data);
        if (data?.clientPrincipal) {
          setUser(data.clientPrincipal);
        } else {
          setUser(null);
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

  return { user, loading, error }; // 👈 Solo 3 parámetros
};

export default useAzureUser;


