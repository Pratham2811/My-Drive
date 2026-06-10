import React from "react";
import { useSelector } from "react-redux";
import { Check } from "lucide-react";

import { EmailInput } from "./components/EmailInput";
import { VerifyEmailOtpStep } from "./components/OtpInput";
import { AccountInfoStep } from "./components/AccountInfoStep";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const { step } = useSelector((state) => state.auth.registeration);

  const steps = [
    { id: "EMAIL", label: "Email" },
    { id: "OTP", label: "Verify" },
    { id: "INFO", label: "Profile" },
  ];

  const currentStepIndex = Math.max(
    steps.findIndex((s) => s.id === step),
    0,
  );

  const stepComponents = {
    EMAIL: <EmailInput />,
    OTP: <VerifyEmailOtpStep />,
    INFO: <AccountInfoStep />,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start">
        {steps.map((s, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <React.Fragment key={s.id}>
              <div className="flex min-w-0 flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-md border text-sm font-semibold transition-colors",
                    isCompleted && "border-slate-950 bg-slate-950 text-white",
                    isCurrent && "border-cyan-600 bg-cyan-50 text-cyan-700",
                    !isCompleted && !isCurrent && "border-slate-200 bg-white text-slate-400",
                  )}
                >
                  {isCompleted ? <Check className="size-4" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "max-w-20 truncate text-xs font-medium",
                    isCurrent ? "text-cyan-700" : "text-slate-500",
                  )}
                >
                  {s.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-3 mt-4 h-px flex-1 rounded-full",
                    index < currentStepIndex ? "bg-slate-950" : "bg-slate-200",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {stepComponents[step] || stepComponents.EMAIL}
    </div>
  );
}
