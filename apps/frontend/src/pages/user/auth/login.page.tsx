import { Button, Input, Label, Separator } from '@libs/components';
import { HunterRankBadge } from '../../../components/auth/hunter-rank-badge';
import { motion } from 'framer-motion';
import { Dumbbell, Eye, EyeOff, Lock, Mail, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ParticleBackground } from '../../../components/auth/particle-background';
import { _FULL_ROUTES } from '../../../app/route';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <ParticleBackground />

      <div className="container relative flex flex-col items-center justify-center px-4">
        <motion.div
          className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.7, duration: 1 }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <div className="relative z-10 w-full max-w-md space-y-6 rounded-lg border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-sm">
          <motion.div
            className="flex items-center justify-center gap-3 text-xl font-medium text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Zap className="h-6 w-6 text-primary" />
            Fitness Leveling
          </motion.div>

          <motion.div
            className="flex flex-col space-y-2 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HunterRankBadge rank="E" className="mx-auto mb-2" />
            <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome back, Hunter</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to continue your fitness journey</p>
          </motion.div>

          <motion.div
            className="grid gap-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-muted-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-muted-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} className="pl-10 pr-10" required />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                    </button>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                        />
                        Logging in...
                      </>
                    ) : (
                      <>Sign In</>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Apple
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Don't have an account?{' '}
            <Link to={_FULL_ROUTES.REGISTER} className="underline underline-offset-4 hover:text-primary">
              Register
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
};
