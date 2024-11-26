import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/Button";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push("/account");
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log("Login successful!");
      router.push("/account");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center text-white">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-slate-500"
              type="email"
              placeholder="Your email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-slate-500"
              type="password"
              placeholder="Your password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Button
              text="Login"
              width="full"
              variant="selected"
              disabled={loading}
            />
          </div>
        </form>
        <div className="mt-4 flex justify-between">
          <div>
            <Link href="/reset-password">
              <span className="text-slate-300 underline underline-offset-2 hover:text-slate-100">
                Forgot password?
              </span>
            </Link>
          </div>
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <span className="text-slate-300 underline underline-offset-2 hover:text-slate-100">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
