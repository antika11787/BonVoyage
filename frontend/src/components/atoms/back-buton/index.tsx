'use client';
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
    classname?: string; 
    url?: string;
};

const BackButton = (props: Props) => {
  const router = useRouter();
  return (
    <div
      className={`p-2 rounded-full cursor-pointer ${props.classname}`}
      onClick={() => 
        props.url ? router.push(props.url) : router.back()
      }
    >
      <ChevronLeft className="h-6 w-6" />
    </div>
  );
};

export default BackButton;
