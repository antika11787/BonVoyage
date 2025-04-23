import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BonVoyage",
};

export default function Home() {
  return (
    <div className="text-green-500 text-2xl text-center mt-10">
      Welcome To Vercel
      <div className="bg-black w-24 h-24 flex justify-center items-center m-auto mt-10 rounded-full pb-4"></div>
    </div>
  );
}
