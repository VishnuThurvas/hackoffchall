// Simple JWT implementation for CTF challenge
// This is intentionally simple - players need to decode it!

const SECRET = 'ctf-secret-key-2024';

export interface JWTPayload {
  user: string;
  role: string;
  iat: number;
  exp: number;
  f14g: string;
}

function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

export function createJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + 3600 // 1 hour
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  
  // Simple signature (for CTF purposes)
  const signature = base64UrlEncode(SECRET + encodedHeader + encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'session_token') {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export function setStoredToken(token: string): void {
  // Set cookie with 1 hour expiry
  const expires = new Date(Date.now() + 3600 * 1000).toUTCString();
  document.cookie = `session_token=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function clearStoredToken(): void {
  document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}
