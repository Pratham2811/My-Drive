import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { sendOtp, verifyOtp } from "../../thunks/registrationThunks";
import { goBack } from "../../slices/authSlice";

export function VerifyEmailOtpStep() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { formData } = useSelector((state) => state.auth.registeration);
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid code");
      return;
    }
    try {
      await dispatch(verifyOtp({ email: formData.email, otp })).unwrap();
      toast.success("Email verified");
    } catch (err) {
      toast.error(err || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      await dispatch(sendOtp(formData.email)).unwrap();
      toast.success("Verification code sent");
    } catch (err) {
      toast.error(err || "Failed to resend code");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <Button
        type="button"
        variant="ghost"
        className="mb-5 -ml-3 h-9 rounded-md px-3 text-slate-500 hover:text-slate-950"
        onClick={() => dispatch(goBack())}
      >
        <ArrowLeft className="size-4" />
        Change email
      </Button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
            <MailCheck className="size-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-950">Check your email</h2>
            <p className="text-sm leading-6 text-slate-600">
              We sent a 6-digit verification code to{" "}
              <span className="font-medium text-slate-950">{formData.email}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="size-10 rounded-md border border-slate-200 bg-white text-lg shadow-sm transition-all focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 sm:size-12"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-md bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800 active:scale-[0.99]"
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify code"}
        </Button>

        <p className="text-center text-sm text-slate-500">
          Didn't receive the code?{" "}
          <button
            type="button"
            className="font-semibold text-cyan-700 hover:text-cyan-800 hover:underline disabled:text-slate-400"
            onClick={handleResend}
            disabled={isLoading || !formData.email}
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
}
