import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  href: string;
}

const Button = ({ text, href }: ButtonProps) => {
  return (
    <Link href={href} passHref>
      <span className="flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-primary dark:bg-gray-500 text-white dark:text-gray-200 text-sm lg:text-base rounded-full hover:bg-primary-dark transition duration-300">
        {text}
      </span>
    </Link>
  );
};

export default Button;

export function OutlineButton({ text, href }: ButtonProps) {
  return (
    <Link href={href} passHref>
      <span className="flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-primary dark:border-white text-sm lg:text-base rounded-full text-primary dark:text-white hover:bg-gray-100 transition duration-300">
        {text}
      </span>
    </Link>
  );
}

export function PrimaryButton({ title, classes }: any) {
  return <button className={`text-sm py-3 px-8 text-nowrap bg-[#E66E19] rounded-md text-white ${classes}`}>

    {title}

  </button>
}

export function PrimaryOutlineButton({ title }: any) {
  return <button className="text-sm py-3 px-8 text-nowrap border-2 bg-orange-500 text-white rounded-md ">

    {title}

  </button>
}

export function SecondaryOutlineButton({ title }: any) {
  return <button className="text-sm py-2.5 px-8 text-nowrap border-2 border-[#E66E19] rounded-md text-[#E66E19]">

    {title}

  </button>
}


export function GreenOutlineButton({ title }: any) {

  return <button className="text-sm py-2.5 px-6 text-nowrap border-2 border-[#4DE95C] bg-[#12B76A] rounded-full text-white">

    {title}

  </button>

}

export function BlueOutlineButton({ title }: any) {

  return <button className="text-sm py-2.5 px-6 text-nowrap border-2 border-[#667085] bg-[#667085] rounded-full text-white">

    {title}

  </button>

}

export function RedPrimaryButton({ title, classes }: any) {

  return <button className={`text-sm py-3 px-8 text-nowrap rounded-md bg-[#E05151] text-white ${classes}`}>

    {title}

  </button>

}

export function RedOutlineButton({ title }: any) {

  return <button className="text-sm py-2.5 px-6 text-nowrap border-2 rounded-full border-[#E05151] bg-[#E05151]  text-white">

    {title}

  </button>

}

export function ScheduleButton({ title }: any) {

  return <button className="text-sm py-3 px-6 text-nowrap bg-[#007296]  rounded-full text-white">

    {title}

  </button>

}