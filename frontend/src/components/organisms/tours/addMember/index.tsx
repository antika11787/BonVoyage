"use client";

import { AddMemberToTourApi, GetTourMembersApi, RemoveMemberApi } from '@/apiEndpoints/tours';
import { GetAllUsersApi } from '@/apiEndpoints/users';
import UserList from '@/components/molecules/userList';
import { User } from '@/interfaces/auth';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import SearchAtom from '@/components/atoms/search';
import _ from "lodash";
import ImageAtom from '@/components/atoms/image';
import notFound from "../../../../../public/images/web-error.png";
import { MemberList } from '@/interfaces/tour';
import LoaderSkeleton from '@/components/atoms/loaderSkeleton';

const IconSet = ({ addMember, removeMember, userId, isMember }: { addMember: (id: string) => void, removeMember: (id: string) => void, userId: string, isMember: boolean }) => {
  return (
    <div className="bg-gray-200 bg-opacity-[0.7] w-10 h-10 rounded-full flex items-center justify-center"
      onClick={() => {
        if (!isMember) {
          addMember(userId);
        } else {
          removeMember(userId);
        }
      }}>
      {isMember ? (<Trash2 className=" text-red-400 w-5 h-5" />) : (<Plus className=" text-blue-500 w-5 h-5" />)}
    </div>
  )
}

const AddMember = () => {
  const params = useParams()
  const tourId = params.id as string;
  const [shuffledUsers, setShuffledUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [text, setText] = useState<string>("Suggested Users");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [members, setMembers] = useState<MemberList[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMemberAdded, setIsMemberAdded] = useState<boolean>(false);
  const currentUserId = useSelector((state: any) => state.user).user._id;

  const addMemberToTour = async (userId: string) => {
    try {
      const response = await AddMemberToTourApi({ tourId, userId, role: "MEMBER" });
      if (response) {
        setIsMemberAdded((prev) => {
          return !prev
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeMemberFromTour = async (userId: string) => {
    try {
      const response = await RemoveMemberApi({ tourId, userId });
      if (response) {
        setIsMemberAdded((prev) => {
          return !prev
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsSearching(true);
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch) {
          params.append('search', debouncedSearch);
        }
        const response = await GetAllUsersApi({
          param: params,
        });
        const randomUsers = _.shuffle(response);
        setShuffledUsers(randomUsers
          .filter(user => user._id !== currentUserId)
          .slice(0, 10));
        setIsSearching(false);
        setText(debouncedSearch ? "Searched Users" : "Suggested Users");
        setLoading(false);
      } catch (error) {
        setIsSearching(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [debouncedSearch, currentUserId])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await GetTourMembersApi(tourId);
        setMembers(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemberData();
  }, [isMemberAdded]);

  return (
    <div className='w-full h-full relative'>
      <div className='mx-4 mt-7 mb-2'>
        <SearchAtom value={searchQuery}
          onChange={handleSearch} />
      </div>
      <div className='overflow-x-hidden'>
        {loading ? (
          <LoaderSkeleton quantity={10} isDetailPage={false} />
        ) : (
          <div className='mx-4 mt-7'>
            {isSearching || shuffledUsers.length > 0 ? (
              <>
                <p className='mb-5 mx-2 text-md text-gray-500'>{text}</p>
                <div className='overflow-style overflow-y-auto h-[70vh]'>
                  {shuffledUsers.map((user) => (
                    <UserList key={user._id} _id={user._id} name={user.name} email={user.email} role="" tourId={tourId}
                      icons={IconSet({
                        addMember: addMemberToTour,
                        removeMember: removeMemberFromTour,
                        userId: user._id,
                        isMember: members.some((member) => { return member.userId._id === user._id })
                      })} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-40">
                <ImageAtom
                  src={notFound}
                  alt="Not Found"
                  height={100}
                  width={100}
                />
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {debouncedSearch ? "No matching results!" : "No Tours Found!"}
                </p>
              </div>
            )}
          </div>

        )}
      </div>
    </div>
  )
}

export default AddMember
