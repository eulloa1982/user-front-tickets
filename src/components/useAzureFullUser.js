import { useState, useEffect } from 'react';

export default function useAzureFullUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authResponse = await fetch('/.auth/me');
        const authPayload = await authResponse.json();
        const accessToken = authPayload[0]?.access_token;

        if (!accessToken) throw new Error('No se encontró access token');

        const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!graphResponse.ok) throw new Error('Error consultando Microsoft Graph');

        const userDetails = await graphResponse.json();
        setUser({
          id: userDetails.id,
          displayName: userDetails.displayName,
          email: userDetails.mail || userDetails.userPrincipalName,
          jobTitle: userDetails.jobTitle,
          department: userDetails.department,
          officeLocation: userDetails.officeLocation,
          officePhone: userDetails.businessPhones?.[0] || '',
          mobilePhone: userDetails.mobilePhone || '',
        });
      } catch (err) {
        console.error('Error al recuperar detalles de usuario:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return { user, loading, error };
}
