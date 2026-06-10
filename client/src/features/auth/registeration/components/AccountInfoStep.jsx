import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Check, LockKeyhole, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccount } from "../../thunks/registrationThunks";
import { updateFormData } from "../../slices/authSlice";
import { cn } from "@/lib/utils";

export function AccountInfoStep() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.auth.registeration);
  const { isLoading } = useSelector((state) => state.auth);

  const passwordChecks = useMemo(
    () => [
      { label: "At least 6 characters", met: password.length >= 6 },
      {
        label: "Passwords match",
        met: Boolean(confirmPassword) && password === confirmPassword,
      },
    ],
    [confirmPassword, password],
  );

  const canSubmit =
    username.trim() &&
    passwordChecks.every((item) => item.met) &&
    !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(updateFormData({ username, password }));
    try {
      await dispatch(createAccount({ ...formData, username, password })).unwrap();
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-slate-700">
            Username
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="username"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="h-12 rounded-md border-slate-200 bg-white pl-10 text-slate-950 shadow-sm transition focus-visible:border-slate-400 focus-visible:ring-slate-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </Label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="h-12 rounded-md border-slate-200 bg-white pl-10 text-slate-950 shadow-sm transition focus-visible:border-slate-400 focus-visible:ring-slate-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-slate-700">
            Confirm password
          </Label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="h-12 rounded-md border-slate-200 bg-white pl-10 text-slate-950 shadow-sm transition focus-visible:border-slate-400 focus-visible:ring-slate-200"
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
        <div className="space-y-2">
          {passwordChecks.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-slate-600">
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-sm border",
                  item.met
                    ? "border-cyan-600 bg-cyan-600 text-white"
                    : "border-slate-300 bg-white text-transparent",
                )}
              >
                <Check className="size-3" />
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-md bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800 active:scale-[0.99]"
        disabled={!canSubmit}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
