import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createJWT, setStoredToken } from '@/lib/jwt';
import { Terminal, Lock, User, AlertTriangle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === 'admin' && password === 'password') {
      // Create JWT with hidden flag
      const token = createJWT({
        user: 'admin',
        role: 'administrator',
        f14g: 'hackoff{f14g_g0ld3n_b00t_str1k3r}'
      });
      
      setStoredToken(token);
      navigate('/dashboard');
    } else {
      setError('ACCESS DENIED: Invalid credentials');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-terminal flex items-center justify-center p-4 overflow-hidden relative">
      {/* Scan lines overlay */}
      <div className="scan-lines" />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Terminal header */}
        <div className="bg-terminal-dark border border-neon-green/30 rounded-t-lg p-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-neon-green/70 font-mono text-sm">secure_login.sh</span>
          </div>
        </div>

        {/* Login form */}
        <div className="bg-terminal-dark/90 backdrop-blur-sm border-x border-b border-neon-green/30 rounded-b-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Terminal className="w-16 h-16 text-neon-green animate-pulse-glow" />
              <div className="absolute -top-1 -right-1">
                <Lock className="w-6 h-6 text-neon-cyan" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2 font-mono">
            <span className="text-neon-green glitch-text" data-text="SYSTEM ACCESS">SYSTEM ACCESS</span>
          </h1>
          <p className="text-neon-green/50 text-center mb-8 font-mono text-sm">
            Authorization Required
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-neon-green font-mono flex items-center gap-2">
                <User className="w-4 h-4" />
                USERNAME
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-terminal border-neon-green/30 text-neon-green font-mono focus:border-neon-green focus:ring-neon-green/20 placeholder:text-neon-green/30"
                placeholder="Enter username..."
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neon-green font-mono flex items-center gap-2">
                <Lock className="w-4 h-4" />
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-terminal border-neon-green/30 text-neon-green font-mono focus:border-neon-green focus:ring-neon-green/20 placeholder:text-neon-green/30"
                placeholder="Enter password..."
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-mono text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neon-green/10 border border-neon-green text-neon-green hover:bg-neon-green hover:text-terminal-dark font-mono transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : (
                '> INITIALIZE LOGIN'
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-neon-green/20">
            <p className="text-neon-green/40 font-mono text-xs text-center">
              [HINT] Default credentials may be in use...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
