import ImageAtom from "@/components/atoms/image";
import authBackground from "../../../public/images/authBackground.svg";
import boomBackground from "../../../public/images/backgroundBotom.svg";
import Navbar from "@/components/molecules/navbar";

export default function TourLayout({
  children,
  backButton,
  title,
  isLayoutApplied,
  titleColor,
  applyBackground,
}: {
  children: React.ReactNode;
  backButton?: React.ReactNode;
  title?: string;
  isLayoutApplied?: boolean;
  titleColor?: string;
  applyBackground?: boolean;
}) {
  if (!isLayoutApplied) {
    return (
      <>
        {children}
        {/* <Navbar /> */}
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {applyBackground && (
        <div className="absolute top-0 w-full">
          <ImageAtom
            src={authBackground}
            alt="Decorative SVG"
            className="w-full h-[200px] rounded-b-[50px]"
          />
        </div>
      )}

      <div className="z-10">
        <div className="flex items-center justify-start p-5 gap-3">
          {backButton && backButton}
          {title && (
            <p
              className={`text-2xl font-bold ${titleColor ? titleColor : "text-gray-800"
                }`}
            >
              {title}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-auto">{children}</div>
      </div>
      {applyBackground && (
        <div className="fixed bottom-0 w-full">
          <ImageAtom
            src={boomBackground}
            alt="Decorative SVG"
            className="w-full h-[120px]"
          />
        </div>
      )}
      <Navbar />
    </div>
  );
}
