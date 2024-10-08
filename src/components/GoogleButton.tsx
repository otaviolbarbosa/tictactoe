import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import Image from "next/image";

type GoogleButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label?: string;
};
const GoogleButton: FC<GoogleButtonProps> = ({ label, ...buttonProps }) => {
  return (
    <button
      type="button"
      className="flex w-full border rounded-lg bg-white border-gray-300 p-3 shadow-md"
      {...buttonProps}
    >
      <span className="flex-1 font-semibold text-gray-500 text-justify">
        {label ?? "Sign in with Google"}
      </span>
      <Image
        alt="Google logo"
        width="24"
        height="24"
        src="https://authjs.dev/img/providers/google.svg"
      />
    </button>
  );
};

export default GoogleButton;
