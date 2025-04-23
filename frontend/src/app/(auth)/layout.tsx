import ImageAtom from '@/components/atoms/image';
import authBackground from "../../../public/images/authBackground.svg";
import oceanWaves from "../../../public/images/oceanWave.svg";

export default function AuthLayout({ children, title, isLayoutApplied }: { children: React.ReactNode, title?: string, isLayoutApplied?: boolean }) {
    if (!isLayoutApplied) {
        return <>{children}</>;
    }

    return (
        <div className="relative h-screen bg-gray-100">
            <div className="absolute top-0 w-full">
                <ImageAtom
                    src={authBackground}
                    alt="Decorative SVG"
                    className="w-full h-auto"
                />
            </div>
            <div className="z-10 absolute top-[150px] left-1/2 transform -translate-x-1/2 flex flex-col gap-1 items-center justify-center">
                <ImageAtom src={oceanWaves} alt="Ocean waves" height={45} width={45} />
                <span className="text-2xl font-bold text-gray-100 w-full text-center">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}
