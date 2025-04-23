import React from "react";
import TourLayout from "../tours/layout";
import CategoryList from "@/components/organisms/categories/categoryList";
import BackButton from "@/components/atoms/back-buton";

type Props = {};

const CategoriesPage = (props: Props) => {
  return (
    <TourLayout
      title="Categories"
      isLayoutApplied={true}
      backButton={<BackButton classname="bg-white" />}
    >
      <div className="flex-1">
        <CategoryList />
      </div>
    </TourLayout>
  );
};

export default CategoriesPage;
