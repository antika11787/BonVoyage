import TourList from "@/components/organisms/tours/tourList";
import React from "react";
import TourLayout from "./layout";

const TourPage = () => {
  return (
    <TourLayout title="Your Tours" isLayoutApplied={true}>
      <div className="flex-1">
        <TourList />
      </div>
    </TourLayout>
  );
};

export default TourPage;
