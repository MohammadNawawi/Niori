import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullName: form.fullName.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.regiterAccount(data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already registered");
    }
  };
  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Already have an account, Sign In"
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" placeholder="Email" />
        <Input
          label="FullName"
          name="fullName"
          type="text"
          placeholder="FullName"
        />
        <Input label="Phone" name="phone" type="tel" placeholder="Phone" />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit" className={styles.register__button}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};
export default RegisterView;
