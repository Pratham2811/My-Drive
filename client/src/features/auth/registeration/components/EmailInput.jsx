import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateFormData } from "../../slices/authSlice";
import { sendOtp } from "../../thunks/registrationThunks";
import { SocialAuthButtons } from "../../components/SocialAuthButtons";

export function EmailInput() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateFormData({ email }));
      await dispatch(sendOtp(email)).unwrap();
      toast.success("Verification code sent");
    } catch (error) {
      toast.error(error || "Failed to send OTP");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
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

      <Button
        type="submit"
        className="h-12 w-full rounded-md bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800 active:scale-[0.99]"
        disabled={!email || isLoading}
      >
        {isLoading ? "Sending code..." : "Continue with email"}
      </Button>

      <SocialAuthButtons />

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-cyan-700 hover:text-cyan-800 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
