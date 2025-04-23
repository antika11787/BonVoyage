import React from "react";
import CreateTour from "@/components/organisms/tours/createTour";
import TourLayout from "../layout";
import BackButton from "@/components/atoms/back-buton";

type Props = {};

const CreateTourPage = (props: Props) => {
  return (
    <TourLayout title="Create Tour" isLayoutApplied={true} backButton= {
      <BackButton classname="bg-white" url="/tours"/>
    } titleColor="text-white" applyBackground={true}>
      <CreateTour />
    </TourLayout>
  );
};

export default CreateTourPage;
