import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { BsEnvelope, BsEye, BsEyeSlash } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

import { useLogin } from "../../utils/fetch/useAuth";
export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(true);
  const { loading, handleLogin } = useLogin();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin(form);
  };
  return (
    <main className="w-full min-h-screen bg-cover bg-no-repeat bg-center  bg-[url(https://plus.unsplash.com/premium_photo-1681487909667-f7cd75b59d5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNhbGV8ZW58MHwwfDB8fHww)] flex items-center justify-center p-10">
      <form
        action=""
        className="w-[567px] mx-auto bg-slate-50 rounded-md p-10"
        onSubmit={handleSubmit}
      >
        <div className="w-full ">
          <p className="text-center font-bold text-2xl flex justify-center items-center space-x-4">
            <CiLock />
            <span>Login</span>
          </p>
        </div>
        <div className="my-6">
          <TextInput
            label="Email"
            placeholder="email@gmail.com"
            rightSection={<BsEnvelope />}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            autoFocus
            size={"md"}
          />
        </div>

        <div className="my-6">
          <TextInput
            type={visiblePassword ? "password" : "text"}
            label="Password"
            placeholder="*******"
            rightSection={
              visiblePassword ? (
                <BsEyeSlash
                  onClick={() => setVisiblePassword(!visiblePassword)}
                />
              ) : (
                <BsEye onClick={() => setVisiblePassword(!visiblePassword)} />
              )
            }
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            size={"md"}
          />
        </div>
        <div className="my-6">
          <Button
            type="submit"
            color={"orange"}
            fullWidth
            size={"md"}
            disabled={loading}
            className="font-bold"
          >
            LOGIN
          </Button>
        </div>
      </form>
    </main>
  );
}
