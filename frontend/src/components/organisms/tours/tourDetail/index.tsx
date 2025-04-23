"use client";

import { GetTourMembersApi, PromoteMemberApi, RemoveMemberApi, TourByIdApi } from "@/apiEndpoints/tours";
import { MemberList, PromoteMemberProps, RemoveMemberProps, Tour } from "@/interfaces/tour";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoaderSkeleton from "@/components/atoms/loaderSkeleton";
import ImageAtom from "@/components/atoms/image";
import Island from "../../../../../public/images/island.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  CalendarClock,
  CalendarCheck2,
  Shapes,
  SquarePen,
  UserPlus,
  Users,
  Trash2,
  DoorOpen,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react";
import { formatDate, formatUppercaseWords } from "@/utils/helper";
import { useSelector } from "react-redux";
import BackButton from "@/components/atoms/back-buton";
import { DeleteTourApi, LeaveTourApi } from "@/apiEndpoints/tours";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/button";
import UserList from "@/components/molecules/userList";
import Modal from "@/components/molecules/modal";
import Loader from "@/components/atoms/loader";

const IconSet = ({ _id, role, tourId, handlePromote, removingUserId, handleRemoveUser }: { _id: string; role: string; tourId: string; handlePromote?: (props: PromoteMemberProps) => void; removingUserId: string; handleRemoveUser: (tourId: string, userId: string) => void; }) => {

  return (
    <>
      {role !== "LEADER" && (
        <div className="flex gap-4">
          <div className="bg-gray-100 bg-opacity-[0.7] w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => handlePromote && handlePromote({ tourId: tourId || '', userId: _id || '', role: role === "MEMBER" ? "CO-LEADER" : "MEMBER" })}>
            {role === "MEMBER" ? (<ChevronsUp className=" text-green-400 w-6 h-6" />) : (<ChevronsDown className=" text-red-400 w-6 h-6" />)}
          </div>
          <div className="bg-gray-100 bg-opacity-[0.7] w-10 h-10 rounded-full flex items-center justify-center">
            {removingUserId === _id ? (
              <Loader color="border-t-gray-600" />
            ) : (
              <Trash2 onClick={() => handleRemoveUser(tourId || '', _id || '')} className=" text-gray-600 w-5 h-5" />
            )}
          </div>
        </div>
      )}
    </>
  )
}

const TourDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [members, setMembers] = useState<MemberList[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRoleChanged, setIsRoleChanged] = useState<boolean>(false);
  const [isMemberRemoved, setIsMemberRemoved] = useState<boolean>(false);
  const [removingUserId, setRemovingUserId] = useState<string>("");

  const currentUser = useSelector((state: any) => state.user).user;
  const isLeader: boolean = tour?.leaderId === currentUser._id;

  useEffect(() => {
    const fetchTourData = async () => {
      setIsLoading(true);
      try {
        if (typeof params.id === "string") {
          const [tourResponse, membersResponse] = await Promise.all([
            TourByIdApi(params.id),
            GetTourMembersApi(params.id),
          ]);
          setTour(tourResponse);
          setMembers(membersResponse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTourData();
  }, [params.id]);

  useEffect(() => {
    if (isModalVisible) {
      const modalElement = document.getElementById('modal') as HTMLElement;
      if (modalElement) {
        modalElement.style.opacity = '0';
        modalElement.style.transition = 'opacity 0.3s ease-in-out';
        setTimeout(() => {
          modalElement.style.opacity = '1';
        }, 100);
      }
    }
  }, [isModalVisible]);

  const handleDelete = (id: string) => {
    const deleteTour = async () => {
      try {
        const response = await DeleteTourApi(id);
        if (response) {
          router.push("/tours");
        }
      } catch (error) {
        console.log("error during delete:", error);
      }
    };
    deleteTour();
  };

  const handleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  }

  const handleLeave = (id: string) => {
    const leaveTour = async () => {
      try {
        const response = await LeaveTourApi(id);
        if (response) {
          router.push("/tours");
        }
      } catch (error) {
        console.log("error during leave:", error);
      }
    }
    leaveTour();
  }

  const handleEdit = (id: string) => {
    router.push(`/tours/edit/${id}`);
  }

  const handlePromote = (data: PromoteMemberProps) => {
    const Promote = async () => {
      try {
        const response = await PromoteMemberApi(data);
        if (response) {
          setIsRoleChanged(true);
        }
      } catch (error) {
        console.log("error during promote:", error);
      }
    }
    Promote();
  }

  const handleRemove = (data: RemoveMemberProps) => {
    const Remove = async () => {
      try {
        const response = await RemoveMemberApi(data);
        if (response) {
          setIsMemberRemoved(true);
        }
      } catch (error) {
        console.log("error during promote:", error);
      } finally {
      }
    }
    Remove();
  }

  useEffect(() => {
    if (isRoleChanged && typeof params.id === "string") {
      GetTourMembersApi(params.id).then((response) => {
        setMembers(response);
      });
      setIsRoleChanged(false);
    }
  }, [isRoleChanged]);

  useEffect(() => {
    if (isMemberRemoved && typeof params.id === "string") {
      GetTourMembersApi(params.id).then((response) => {
        setMembers(response);
      });
      setIsMemberRemoved(false);
    }
  }, [isMemberRemoved]);

  const handleRemoveUser = (tourId: string, userId: string) => {
    setRemovingUserId(userId);
    if (handleRemove) {
      handleRemove({ tourId: tourId, userId: userId });
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderSkeleton isDetailPage={true} quantity={1} />
      ) : (
        tour && (
          <div className="relative">
            <ImageAtom
              src={Island}
              alt="Tour Image"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-0 w-full h-[400px] bg-black bg-opacity-[0.3] z-10"></div>
            <BackButton classname="absolute top-5 left-5 bg-white bg-opacity-50 z-20 text-white" url="/tours" />
            <div className="absolute top-5 right-5 flex flex-col gap-4 z-20">
              <div className="bg-white bg-opacity-50 p-2 rounded-full cursor-pointer">
                {isLeader ? (
                  <UserPlus onClick={() => router.push(`/tours/add-member/${tour._id}`)} className="h-6 w-6 text-white" />
                ) : (
                  <Users className="h-6 w-6 text-white" />
                )}
              </div>
              {isLeader && (
                <div className="bg-white bg-opacity-50 p-2 rounded-full cursor-pointer">
                  <SquarePen className="h-6 w-6 text-white" onClick={() => {
                    handleEdit(tour._id);
                  }} />
                </div>
              )}
              <div
                className="bg-white bg-opacity-50 p-2 rounded-full cursor-pointer"
              >
                {isLeader ? (
                  <div className="relative w-full">
                    <Trash2 className="h-6 w-6 text-white" onClick={() => {
                      handleModalVisibility();
                    }} />
                  </div>
                ) : (
                  <DoorOpen className="h-6 w-6 text-white" onClick={
                    () => { handleLeave(tour._id) }
                  } />
                )}
              </div>
            </div>
            <div className="absolute top-[300px] w-full bg-white flex flex-col gap-10 rounded-tl-3xl rounded-tr-3xl p-2 z-30 overflow-y-auto max-h-[calc(100vh-300px)]">
              {/* Tour title and place */}
              <div className="flex flex-col gap-[15px] mt-4 px-4 w-full">
                <p className="text-3xl font-bold text-gray-800">{tour.title}</p>
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className=" text-blue-500" />
                  <p className="text-gray-500">{tour.place}</p>
                </div>
              </div>
              {/* Tour date and type */}
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-gray-200 bg-opacity-[0.7] w-12 h-12 rounded-full flex items-center justify-center">
                    <CalendarClock className=" text-blue-500" />
                  </div>
                  <p className="text-gray-500 font-semibold">
                    {formatDate(tour.startDate?.toString())}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-gray-200 bg-opacity-[0.7] w-12 h-12 rounded-full flex items-center justify-center">
                    <CalendarCheck2 className=" text-blue-500" />
                  </div>
                  <p className="text-gray-500 font-semibold">
                    {formatDate(tour.endDate?.toString())}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-gray-200 bg-opacity-[0.7] w-12 h-12 rounded-full flex items-center justify-center">
                    <Shapes className=" text-blue-500" />
                  </div>
                  <p className="text-gray-500 font-semibold">
                    {formatUppercaseWords(tour.type)}&nbsp;Tour
                  </p>
                </div>
              </div>
              {/* Description */}
              <div className="px-4">
                <p className="text-xl font-bold text-gray-800 text-wrap mb-2">
                  Description
                </p>
                <p className="text-gray-500">{tour.description}</p>
              </div>
              {/* Members */}
              <div className="px-4 mb-20">
                <p className="text-xl font-bold text-gray-800 text-wrap mb-4">
                  Members
                </p>
                {members && members.length > 0 ? (
                  members.map((member) => (
                    <UserList
                      key={member.userId._id}
                      _id={member.userId._id}
                      name={member.userId.name}
                      email={member.userId.email}
                      role={member.role}
                      tourId={tour._id}
                      icons={IconSet({
                        _id: member.userId._id,
                        role: member.role,
                        tourId: tour._id,
                        handlePromote: handlePromote,
                        removingUserId: removingUserId,
                        handleRemoveUser: handleRemoveUser
                      })}
                    />
                  ))
                ) : (<div></div>)}
              </div>
            </div>
            <Modal
              isOpen={isModalVisible}
              onClose={handleModalVisibility}
              zIndex="z-40"
              width="w-[calc(100%-90px)]"
              height="h-[160px]"
              content="Are you sure you want to delete this tour?"
            >
              <Button
                type="button"
                isSmall
                background="bg-red-400"
                onClick={() => handleDelete(tour._id)}
              >
                Yes
              </Button>
              <Button
                type="button"
                isSmall
                onClick={handleModalVisibility}
              >
                No
              </Button>
            </Modal>
          </div>
        )
      )}
    </>
  );
};

export default TourDetails;
