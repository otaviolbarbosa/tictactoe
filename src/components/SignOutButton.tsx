import { signOut } from "@/lib/auth";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="whitespace-nowrap">Sign out</button>
    </form>
  );
};

export default SignOutButton;
