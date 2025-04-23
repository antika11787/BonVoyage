import React from "react";
import BackButton from "@/components/atoms/back-buton";
import TourLayout from "@/app/tours/layout";
import CreateCategory from "@/components/organisms/categories/createCategory";

type Props = {};

const CreateCategoriesPage = (props: Props) => {
  return (
    <TourLayout
      title="Create Category"
      isLayoutApplied={true}
      backButton={<BackButton classname="bg-white" url="/categories" />}
      titleColor="text-white"
      applyBackground={true
      }
    >
      <div className="flex-1">
      <CreateCategory />
      </div>
    </TourLayout>
  );
};

export default CreateCategoriesPage;
