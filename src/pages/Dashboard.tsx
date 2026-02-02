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
  Server,
  FileText,
  Database,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<JWTPayload | null>(null);
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
              <h1 className="text-xl font-bold text-neon-green font-mono">SECURE PORTAL</h1>
              <p className="text-neon-green/50 text-sm font-mono">Admin Dashboard v2.0</p>
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
              <div className="flex justify-between">
                <span className="text-neon-green/50">Access Level:</span>
                <span className="text-neon-green">FULL</span>
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
                <span className="text-neon-green/50">Started:</span>
                <span className="text-neon-green">{new Date(user.iat * 1000).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-green/50">Expires:</span>
                <span className="text-neon-green">{new Date(user.exp * 1000).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-green/50">Auth Type:</span>
                <span className="text-neon-green">Token</span>
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
                <span className="text-neon-green/50">Region:</span>
                <span className="text-neon-green">US-EAST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-green/50">Latency:</span>
                <span className="text-neon-green">12ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Dashboard Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* System Logs */}
          <div className="bg-terminal-dark/80 border border-neon-green/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-neon-cyan" />
              <h3 className="text-neon-green font-mono font-bold">RECENT ACTIVITY</h3>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-neon-green/70">
                <span className="text-neon-green/40">[{new Date().toLocaleTimeString()}]</span>
                <span>Login successful</span>
              </div>
              <div className="flex items-center gap-2 text-neon-green/70">
                <span className="text-neon-green/40">[{new Date(Date.now() - 60000).toLocaleTimeString()}]</span>
                <span>Session initialized</span>
              </div>
              <div className="flex items-center gap-2 text-neon-green/70">
                <span className="text-neon-green/40">[{new Date(Date.now() - 120000).toLocaleTimeString()}]</span>
                <span>Authentication verified</span>
              </div>
              <div className="flex items-center gap-2 text-neon-green/70">
                <span className="text-neon-green/40">[{new Date(Date.now() - 180000).toLocaleTimeString()}]</span>
                <span>Token generated</span>
              </div>
            </div>
          </div>

          {/* System Stats */}
          <div className="bg-terminal-dark/80 border border-neon-green/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-neon-cyan" />
              <h3 className="text-neon-green font-mono font-bold">SYSTEM STATS</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-neon-green/50">CPU Usage</span>
                  <span className="text-neon-green">23%</span>
                </div>
                <div className="h-2 bg-terminal rounded-full overflow-hidden">
                  <div className="h-full bg-neon-green/50 rounded-full" style={{ width: '23%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-neon-green/50">Memory</span>
                  <span className="text-neon-green">41%</span>
                </div>
                <div className="h-2 bg-terminal rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan/50 rounded-full" style={{ width: '41%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-neon-green/50">Storage</span>
                  <span className="text-neon-green">67%</span>
                </div>
                <div className="h-2 bg-terminal rounded-full overflow-hidden">
                  <div className="h-full bg-neon-green/50 rounded-full" style={{ width: '67%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Database Info */}
        <div className="bg-terminal-dark/80 border border-neon-green/20 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-neon-cyan" />
            <h3 className="text-neon-green font-mono font-bold">DATABASE STATUS</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
            <div className="text-center p-4 bg-terminal rounded-lg">
              <div className="text-2xl font-bold text-neon-green">1,247</div>
              <div className="text-neon-green/50 text-xs">Total Records</div>
            </div>
            <div className="text-center p-4 bg-terminal rounded-lg">
              <div className="text-2xl font-bold text-neon-cyan">89</div>
              <div className="text-neon-green/50 text-xs">Active Users</div>
            </div>
            <div className="text-center p-4 bg-terminal rounded-lg">
              <div className="text-2xl font-bold text-neon-green">99.9%</div>
              <div className="text-neon-green/50 text-xs">Uptime</div>
            </div>
            <div className="text-center p-4 bg-terminal rounded-lg">
              <div className="text-2xl font-bold text-neon-cyan">5</div>
              <div className="text-neon-green/50 text-xs">Connections</div>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-8 pt-4 border-t border-neon-green/20">
          <div className="flex items-center gap-2 text-neon-green/40 font-mono text-xs">
            <Terminal className="w-4 h-4" />
            <span>admin@secure-portal:~$ </span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
