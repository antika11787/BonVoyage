import React from "react";

interface LoaderSkeletonProps {
  quantity: number;
}

const LoaderSkeleton = ({ quantity, isDetailPage = false }: { quantity: number, isDetailPage?: boolean }) => {
  if (!isDetailPage) {
    return (
      <div className="px-2 mt-6">
        {[...Array(quantity)].map((_, index) => (
          <div key={index} className="flex gap-2 w-full px-4 mt-6 animate-pulse">
            <div className="w-[13%] h-10 bg-slate-300 rounded-md"></div>
            <div className="w-[87%] flex flex-col gap-2">
              <div className="w-[40%] h-2 bg-slate-300 rounded-full"></div>
              <div className="w-[90%] h-2 bg-slate-300 rounded-full"></div>
              <div className="w-[60%] h-2 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse flex flex-col items-center justify-center gap-4 min-h-screen">
      <div className="w-40 h-40 bg-slate-300 rounded-md"></div>
      <div className="w-40 h-2 bg-slate-300 rounded-full"></div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
        <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
        <div className="w-10 h-10 bg-slate-300 rounded-md"></div>
      </div>
      <div className="w-72 h-2 bg-slate-300 rounded-full"></div>
      <div className="w-60 h-2 bg-slate-300 rounded-full"></div>
    </div>
  );
};

export default LoaderSkeleton;
