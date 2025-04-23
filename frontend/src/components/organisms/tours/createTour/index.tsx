"use client";

import { CreateTourApi , UpdateTourApi } from "@/apiEndpoints/tours";
import Button from "@/components/atoms/button";
import FormInput from "@/components/atoms/formInput";
import { FormDataTour } from "@/interfaces/tour";
import Select from "@/components/atoms/select"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { TourByIdApi } from "@/apiEndpoints/tours";
import { useParams } from "next/navigation";
import { Tour } from "@/interfaces/tour";

const CreateTour = () => {
  const router = useRouter();
  const { id } = useParams();

  const [tour, setTour] = useState<Tour | null>(null);

  const options = [
    { value: "", label: "Select Tour Type" },
    { value: "UNDECIDED", label: "Undecided" },
    { value: "RELAX", label: "Relax" },
    { value: "TREKKING", label: "Trekking" },
    { value: "HIKING", label: "Hiking" },
    { value: "PICNIC", label: "Picnic" },
    { value: "CAMPING", label: "Camping" },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      place: "",
      type: "",
      startDate: "",
      endDate: "",
      estimatedBudget: "",
    },
  });

  useEffect(() => {
    if (tour) {
      reset({
        title: tour.title,
        description: tour.description,
        place: tour.place,
        type: tour.type,
        startDate: new Date(tour.startDate).toISOString().split("T")[0],
        endDate: new Date(tour.endDate).toISOString().split("T")[0],
        estimatedBudget: tour.estimatedBudget.toString(),
      });
    }
  }, [tour, reset]);

  useEffect(() => {
    if (id) {
      const fetchTourData = async () => {
        try {
          const response: Tour = await TourByIdApi(id as string);
          setTour(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTourData();
    }
  }, [id]);


  const onSubmit = async (data: FormDataTour) => {
    if (id) {
      try {
        const response = await UpdateTourApi(id as string, data);
        if (response) {
            router.push(`/tours/${id}`);
        }
      } catch (error) {
        console.log("error during update:", error);
      }
    } else {
      try {
        const response = await CreateTourApi(data);
        if (response) {
          router.push("/tours");
        }
      } catch (error) {
        console.log("error during signup:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col items-center justify-center bg-white p-4 rounded-md mx-[21px] shadow-lg mb-10`}
    >
      <FormInput
        nameProp="title"
        placeholder="Title"
        requiredProp={true}
        control={control}
        errors={errors}
      />
      <FormInput
        nameProp="description"
        placeholder="Description"
        requiredProp={true}
        control={control}
        errors={errors}
        tag="textarea"
      />
      <FormInput
        nameProp="place"
        placeholder="Place"
        requiredProp={true}
        control={control}
        errors={errors}
      />

      <Select control={control} name="type" options={options} errors={errors} />

      <FormInput
        nameProp="startDate"
        placeholder="Start Date"
        requiredProp={true}
        control={control}
        errors={errors}
        type="date"
      />
      <FormInput
        nameProp="endDate"
        placeholder="End Date"
        requiredProp={true}
        control={control}
        errors={errors}
        type="date"
      />
      <FormInput
        nameProp="estimatedBudget"
        placeholder="Estimated Budget"
        requiredProp={true}
        control={control}
        errors={errors}
        type="number"
      />
      <Button
        className="w-full bg-blue-500 p-2 mt-4 mb-2 text-white rounded-3xl hover:bg-blue-600"
        type="submit"
        children={id ? "Update Tour" : "Create Tour"}
      />
    </form>
  );
};

export default CreateTour;
