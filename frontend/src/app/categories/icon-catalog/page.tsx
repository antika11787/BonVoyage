import TourLayout from "@/app/tours/layout";
import BackButton from "@/components/atoms/back-buton";
import IconCatalog from "@/components/organisms/categories/IconCatalog";
import React from "react";

const IconCatalogPage: React.FC = () => {
  return (
    <TourLayout
      title="All Icons"
      isLayoutApplied={true}
      backButton={<BackButton classname="bg-white" />}
    >
      <div className="flex-1">
        <IconCatalog />
      </div>
    </TourLayout>
  );
};

export default IconCatalogPage;
