import { AuthShell } from "@/features/auth/components/AuthShell";
import LoginForm from "@/features/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}
