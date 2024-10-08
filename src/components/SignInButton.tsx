import { signIn } from "@/lib/auth";

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
};

export default SignInButton;
