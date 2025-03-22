import { useState } from 'react';
import { ParticleBackground } from '../../../components/auth/particle-background';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Eye, EyeOff, Lock, Mail, Shield, User, Zap } from 'lucide-react';
import { HunterRankBadge } from '../../../components/auth/hunter-rank-badge';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@libs/components';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../../../app/route';

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    fitnessGoal: '',
    fitnessLevel: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/';
    }, 1500);
  };

  const nextStep = () => {
    setStep(2);
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
            className="flex items-center justify-center gap-3 text-xl font-medium"
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
            <HunterRankBadge rank="?" className="mx-auto mb-2" />
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              {step === 1 ? 'Enter your details to begin your fitness journey' : 'Tell us about your fitness goals'}
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            key={`step-${step}`}
          >
            {step === 1 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-muted-foreground">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

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
                        value={formData.email}
                        onChange={handleChange}
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
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                      </button>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      type="submit"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fitnessGoal" className="text-muted-foreground">
                      Fitness Goal
                    </Label>
                    <Select
                      value={formData.fitnessGoal}
                      onValueChange={(value) => handleSelectChange('fitnessGoal', value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose-weight">Lose Weight</SelectItem>
                        <SelectItem value="build-muscle">Build Muscle</SelectItem>
                        <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                        <SelectItem value="increase-flexibility">Increase Flexibility</SelectItem>
                        <SelectItem value="general-fitness">General Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="fitnessLevel" className="text-muted-foreground">
                      Fitness Level
                    </Label>
                    <Select
                      value={formData.fitnessLevel}
                      onValueChange={(value) => handleSelectChange('fitnessLevel', value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
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
                          Creating account...
                        </>
                      ) : (
                        <>Create Account</>
                      )}
                    </Button>
                  </motion.div>

                  <Button variant="ghost" type="button" onClick={() => setStep(1)} className="mt-2">
                    Back to personal details
                  </Button>
                </div>
              </form>
            )}

            {step === 1 && (
              <>
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
              </>
            )}
          </motion.div>

          <motion.p
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Already have an account?{' '}
            <Link to={_FULL_ROUTES.LOGIN} className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </motion.p>

          <motion.div
            className="absolute bottom-2 left-0 right-0 text-center text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p>"I arise, not as who I was, but as who I will become."</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
