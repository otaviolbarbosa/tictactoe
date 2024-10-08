import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FC } from "react";

const Home: FC = async () => {
  const session = await auth();

  if (session) {
    redirect("/game");
  } else {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 justify-center items-center h-screen">
      Loading...
    </div>
  );
};

export default Home;
