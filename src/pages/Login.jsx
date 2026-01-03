import { useState } from "react";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await login(email, password);
    if (!error) alert("Logged in successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded"/>
      <button type="submit" className="p-2 bg-green-500 text-white rounded">Login</button>
    </form>
  );
};

export default Login;
