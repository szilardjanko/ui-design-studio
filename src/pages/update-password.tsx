import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/Button";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage("Password updated successfully!");
      router.push("/account");
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
        <h1 className="mb-6 text-center text-3xl font-bold">Update Password</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              className="mb-4 w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-slate-500"
              type="password"
              placeholder="New password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-slate-500"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Button
              text="Update Password"
              width="full"
              variant="selected"
              disabled={loading}
            />
          </div>
        </form>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
        {message && (
          <div className="mt-4 text-center text-green-500">{message}</div>
        )}
      </div>
    </div>
  );
}
