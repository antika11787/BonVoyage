import { StaticImageData } from "next/image";

export interface Tour {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  place: string;
  type: string;
  estimatedBudget: number;
  coLeaderIds: string[];
  transactionCategoryIds: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  leaderId: string;
  status: string;
}

export interface TourInfo {
  _id: string;
  tour: Tour;
  tourId: string;
  userId: string;
  role: string;
  walletId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface TourMember {
  data: TourInfo[];
  limit: number;
  page: number;
  total: number;
}

export interface ListCardProps {
  image: StaticImageData;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  place: string;
  type: string;
  isLeader: boolean;
}

export interface FormDataTour {
  title: string;
  description: string;
  place: string;
  type: string;
  startDate: string;
  endDate: string;
  estimatedBudget: string;
}

export interface MemberList {
  _id: string;
  tourId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  role: string;
  walletId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface PromoteMemberProps {
  userId: string;
  tourId: string;
  role: string;
}

export interface RemoveMemberProps {
  userId: string;
  tourId: string;
}
