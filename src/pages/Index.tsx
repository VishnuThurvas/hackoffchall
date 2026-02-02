import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredToken, decodeJWT } from '@/lib/jwt';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.exp > Date.now() / 1000) {
        navigate('/dashboard');
        return;
      }
    }
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-terminal flex items-center justify-center">
      <div className="text-neon-green font-mono animate-pulse">
        Initializing...
      </div>
    </div>
  );
};

export default Index;
