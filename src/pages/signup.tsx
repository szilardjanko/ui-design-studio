import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/Button";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push("/account");
      }
    });
  }, [router]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setSuccess(true);
      setError("");
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
      {!success && (
        <>
          <div className="w-full max-w-md">
            <h1 className="mb-6 text-center text-3xl font-bold">Sign Up</h1>
            <form className="space-y-4" onSubmit={handleSignUp}>
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
                <input
                  className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Button
                  text="Sign Up"
                  width="full"
                  variant="selected"
                  disabled={loading}
                />
              </div>
            </form>
            <div className="mt-4 text-right">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-slate-300 underline underline-offset-2 hover:text-slate-100"
              >
                Login
              </Link>
            </div>
          </div>
          {error && (
            <div className="mt-4 text-center text-red-500">{error}</div>
          )}
        </>
      )}
      {success && (
        <>
          <div className="mt-4 text-center text-white">
            Sign up successful! <br /> Please check your email for confirmation.
          </div>
          <div className="text-center text-slate-100">
            <Link
              href="/login"
              className="text-slate-300 underline underline-offset-2 hover:text-slate-100"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
