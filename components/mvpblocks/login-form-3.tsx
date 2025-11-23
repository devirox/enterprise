"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Palette,
  Users,
  Cloud,
  ShieldCheck,
  Github,
} from 'lucide-react';

type LoginFormProps = {
  mode?: 'login' | 'register';
};

export default function SignInPage({ mode = 'login' }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        // Use NextAuth credentials provider to sign in but handle errors
        // client-side so we can redirect users who need a forced reset.
        const callback = (typeof window !== 'undefined' && window.location?.origin)
          ? `${window.location.origin}/dashboard`
          : '/dashboard'

        // Use redirect:true to allow NextAuth server to perform redirects
        // (this avoids client-side new URL(...) parsing of possibly-relative urls).
        try {
          await signIn('credentials', {
            redirect: true,
            email,
            password,
            callbackUrl: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '/dashboard'
          } as any)
          // signIn with redirect:true will navigate the page on success/failure
          return
        } catch (err: any) {
          console.error('signIn threw an exception', err)
          setDebugInfo(`signIn_exception: ${JSON.stringify({ err: String(err), stack: err?.stack }, null, 2)}`)
          alert('Authentication error (see console for details)')
          return
        }
        // NextAuth handled navigation for redirect:true
      } else {
        // Register via API route and redirect to check-email on success
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          // Auto sign-in newly registered user and redirect to dashboard
          await signIn('credentials', {
            redirect: true,
            email,
            password,
            callbackUrl: '/dashboard',
          } as any);
        } else {
          alert(data.error || 'Registration failed');
        }
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
      <style jsx>{`
        .login-btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          position: relative;
          overflow: hidden;
        }
        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }
        .login-btn:hover::before {
          left: 100%;
        }
      `}</style>
      <div className="z-10 w-full max-w-6xl">
        <div className="bg-secondary/50 overflow-hidden rounded-[40px] shadow-2xl">
          <div className="grid min-h-[700px] lg:grid-cols-2">
            {/* Left Side */}
            <div className="brand-side relative m-4 rounded-3xl bg-[url('https://cdn.midjourney.com/299f94f9-ecb9-4b26-bead-010b8d8b01d9/0_0.webp?w=800&q=80')] bg-cover p-12 text-white">
              <div>
                <div className="mb-12 text-lg font-semibold uppercase">
                  PixelForge Studio
                </div>
                <h1 className="mb-4 text-6xl font-medium">
                  Create, Design, and Innovate
                </h1>
                <p className="mb-12 text-xl opacity-80">
                  Join thousands of creators who trust PixelForge Studio to
                  bring their vision to life
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Palette size={16} />,
                      title: 'Advanced Design Tools',
                      desc: 'Professional-grade tools for every project',
                    },
                    {
                      icon: <Users size={16} />,
                      title: 'Team Collaboration',
                      desc: 'Work together seamlessly in real-time',
                    },
                    {
                      icon: <Cloud size={16} />,
                      title: 'Cloud Storage',
                      desc: 'Access your projects from anywhere',
                    },
                    {
                      icon: <ShieldCheck size={16} />,
                      title: 'Enterprise Security',
                      desc: 'Bank-level security for your data',
                    },
                  ].map(({ icon, title, desc }, i) => (
                    <div
                      key={i}
                      className="feature-item animate-fadeInUp flex items-center"
                      style={{ animationDelay: `${0.2 * (i + 1)}s` }}
                    >
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
                        {icon}
                      </div>
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="text-sm opacity-70">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-center p-12">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-light uppercase">
                    Welcome back
                  </h2>
                  <p className="mt-2 text-sm text-stone-600">
                    Sign in to continue your creative journey
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium uppercase"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                        className="border-border bg-input block w-full rounded-lg border py-3 pr-3 pl-10 text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium uppercase"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="border-border bg-input block w-full rounded-lg border py-3 pr-12 pl-10 text-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-muted-foreground flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="border-border text-primary h-4 w-4 rounded"
                      />
                      <span className="ml-2">Remember me</span>
                    </label>
                    <a
                      href="/reset"
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="login-btn relative flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="ml-2">{mode === 'login' ? 'Logging in...' : 'Signing up...'}</span>
                      </>
                    ) : (
                      mode === 'login' ? 'Login Button' : 'Signup Button'
                    )}
                  </button>

                  <div className="relative text-center text-sm text-stone-500">
                    <div className="absolute inset-0 flex items-center">
                      <div className="border-border w-full border-t"></div>
                    </div>
                    <span className="relative px-2">Or continue with</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="border-border bg-secondary text-foreground hover:bg-secondary/80 flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm shadow-sm"
                      onClick={() => {
                        const cb = (typeof window !== 'undefined' && '/dashboard'.startsWith('/'))
                          ? `${window.location.origin}/dashboard`
                          : '/dashboard'
                        signIn('google', { callbackUrl: cb })
                      }}
                    >
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="h-5 w-5"
                        alt="Google"
                      />
                      <span className="ml-2">Google</span>
                    </button>
                    <button
                      type="button"
                      className="border-border bg-secondary text-foreground hover:bg-secondary/80 flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm shadow-sm"
                      onClick={() => {
                        const cb = (typeof window !== 'undefined' && '/dashboard'.startsWith('/'))
                          ? `${window.location.origin}/dashboard`
                          : '/dashboard'
                        signIn('github', { callbackUrl: cb })
                      }}
                    >
                      <Github className="h-5 w-5" />
                      <span className="ml-2">GitHub</span>
                    </button>
                  </div>
                </form>

                {debugInfo ? (
                  <div className="mt-4 rounded bg-red-50 p-3 text-sm text-red-800">
                    <strong>Debug:</strong>
                    <pre className="mt-2 whitespace-pre-wrap">{debugInfo}</pre>
                  </div>
                ) : null}

                <div className="text-muted-foreground mt-8 text-center text-sm">
                  Don&apos;t have an account?{' '}
                    <a href="/register" className="text-primary hover:text-primary/80">
                      Sign up for free
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

