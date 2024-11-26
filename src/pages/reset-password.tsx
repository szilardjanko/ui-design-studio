import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/Button";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://uistudio.app/update-password",
      });
      if (error) throw error;
      setSuccess("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center text-white">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Reset Password</h1>
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <div>
            <input
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Button
              text="Reset Password"
              width="full"
              variant="selected"
              disabled={loading}
            />
          </div>
        </form>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
        {success && (
          <div className="mt-4 text-center text-red-500">{success}</div>
        )}
      </div>
    </div>
  );
}
