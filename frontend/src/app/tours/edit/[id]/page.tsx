import React from "react";
import CreateTour from "@/components/organisms/tours/createTour";
import TourLayout from "../../layout";
import BackButton from "@/components/atoms/back-buton";

type Props = {};

const EditTourPage = (props: Props) => {
  return (
    <TourLayout title="Edit Tour" isLayoutApplied={true} backButton= {
      <BackButton classname="bg-white" />
    } titleColor="text-white" applyBackground={true}>
      <CreateTour />
    </TourLayout>
  );
};

export default EditTourPage;