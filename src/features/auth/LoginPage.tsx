import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import type { RootState, AppDispatch } from "../../app/store";

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      if (email === "jawad.com" && password === "123") {
        dispatch(
          loginSuccess({
            user: { name: "Admin", email },
            token: "fake-token",
          })
        );
      } else {
        throw new Error("Invalid credentials");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded mt-50">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 w-full"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default LoginPage;
