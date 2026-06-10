import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../thunks/loginThunk";
import { SocialAuthButtons } from "../components/SocialAuthButtons";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error || "Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email address
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="h-12 rounded-md border-slate-200 bg-white pl-10 text-slate-950 shadow-sm transition focus-visible:border-slate-400 focus-visible:ring-slate-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </Label>
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-cyan-700 hover:text-cyan-800 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="h-12 rounded-md border-slate-200 bg-white pl-10 text-slate-950 shadow-sm transition focus-visible:border-slate-400 focus-visible:ring-slate-200"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-md bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800 active:scale-[0.99]"
        disabled={!email || !password || isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <SocialAuthButtons />

      <p className="text-center text-sm text-slate-500">
        New to CloudMemories?{" "}
        <Link
          to="/register"
          className="font-semibold text-cyan-700 hover:text-cyan-800 hover:underline"
        >
          Create account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
