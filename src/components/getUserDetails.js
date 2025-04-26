import { useEffect, useState } from 'react';

const useAzureUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/.auth/me')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data?.length > 0) setUser(data[0]);
      })
      .catch(err => console.error('Error al obtener usuario:', err));
  }, []);

  console.log(user);
  return user;
};

export default useAzureUser;
