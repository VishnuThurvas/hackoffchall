import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getStoredToken, decodeJWT, clearStoredToken, JWTPayload } from '@/lib/jwt';
import { 
  Shield, 
  LogOut, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  User, 
  Key,
  Fingerprint,
  Server
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = getStoredToken();
    if (!storedToken) {
      navigate('/');
      return;
    }

    const decoded = decodeJWT(storedToken);
    if (!decoded) {
      navigate('/');
      return;
    }

    setUser(decoded);
    setToken(storedToken);
  }, [navigate]);

  const handleLogout = () => {
    clearStoredToken();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-terminal p-4 relative overflow-hidden">
      {/* Scan lines overlay */}
      <div className="scan-lines" />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-neon-green/30">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-neon-green animate-pulse-glow" />
            <div>
              <h1 className="text-xl font-bold text-neon-green font-mono">CTF CHALLENGE</h1>
              <p className="text-neon-green/50 text-sm font-mono">Secure Terminal v2.0</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 font-mono"
          >
            <LogOut className="w-4 h-4 mr-2" />
            LOGOUT
          </Button>
        </header>

        {/* Access Granted Banner */}
        <div className="mb-8 p-6 bg-neon-green/5 border border-neon-green/30 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neon-green/10 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-neon-green" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neon-green font-mono glitch-text" data-text="ACCESS GRANTED">
                ACCESS GRANTED
              </h2>
              <p className="text-neon-green/60 font-mono">
                Welcome back, <span className="text-neon-cyan">{user.user}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* User Info Card */}
          <div className="bg-terminal-dark/80 border border-neon-green/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-neon-cyan" />
              <h3 className="text-neon-green font-mono font-bold">USER INFO</h3>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-neon-green/50">Username:</span>
                <span className="text-neon-green">{user.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-green/50">Role:</span>
                <span className="text-neon-cyan">{user.role}</span>
              </div>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="bg-terminal-dark/80 border border-neon-green/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-neon-cyan" />
              <h3 className="text-neon-green font-mono font-bold">SESSION</h3>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-neon-green/50">Issued:</span>
                <span className="text-neon-green">{new Date(user.iat * 1000).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-green/50">Expires:</span>
                <span className="text-neon-green">{new Date(user.exp * 1000).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Server Status Card */}
          <div className="bg-terminal-dark/80 border border-neon-green/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-5 h-5 text-neon-cyan" />
              <h3 className="text-neon-green font-mono font-bold">SERVER</h3>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center">
                <span className="text-neon-green/50">Status:</span>
                <span className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  ONLINE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-green/50">Protocol:</span>
                <span className="text-neon-green">JWT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Display */}
        <div className="bg-terminal-dark/80 border border-neon-green/20 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-5 h-5 text-neon-cyan" />
            <h3 className="text-neon-green font-mono font-bold">YOUR SESSION TOKEN</h3>
          </div>
          <div className="bg-terminal p-4 rounded border border-neon-green/10 overflow-x-auto">
            <code className="text-neon-green/80 font-mono text-sm break-all">
              {token}
            </code>
          </div>
          <p className="mt-4 text-neon-green/40 font-mono text-xs">
            💡 This token contains your session data. Can you find what's hidden inside?
          </p>
        </div>

        {/* Challenge Hint */}
        <div className="bg-terminal-dark/80 border border-neon-cyan/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Fingerprint className="w-5 h-5 text-neon-cyan" />
            <h3 className="text-neon-cyan font-mono font-bold">CHALLENGE OBJECTIVE</h3>
          </div>
          <div className="space-y-4 font-mono text-sm">
            <p className="text-neon-green/70">
              Your mission: <span className="text-neon-green">Find the hidden flag</span>
            </p>
            <div className="bg-terminal p-4 rounded border border-neon-cyan/10">
              <p className="text-neon-green/50 mb-2">// HINTS:</p>
              <ul className="space-y-1 text-neon-green/60">
                <li>• JWT tokens have three parts separated by dots</li>
                <li>• The middle part contains the payload</li>
                <li>• Base64 decoding might reveal secrets...</li>
                <li>• Flag format: hackoff&#123;...&#125;</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-8 pt-4 border-t border-neon-green/20">
          <div className="flex items-center gap-2 text-neon-green/40 font-mono text-xs">
            <Terminal className="w-4 h-4" />
            <span>root@ctf-server:~$ </span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
