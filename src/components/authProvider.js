import { useEffect } from "react";

function useAutoLogin() {
  useEffect(() => {
    fetch("/.auth/me")
      .then(res => res.json())
      .then(data => {
        if (!data || data.length === 0) {
          // No logueado → redirigir automáticamente
          window.location.href = "/.auth/login/aad";
        }
      });
  }, []);
}

export default useAutoLogin;