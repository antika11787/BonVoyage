import Badge from "@/components/atoms/badge";
import ImageAtom from "@/components/atoms/image";
import { ListCardProps } from "@/interfaces/tour";
import { MapPin, Calendar, ShieldCheck } from "lucide-react";
import React from "react";
import { getStatus } from "@/utils/helper";

const ListCard = ({
  image,
  title,
  description,
  startDate,
  endDate,
  place,
  isLeader,
  type,
}: ListCardProps) => {
  return (
    <div className="flex justify-center items-center rounded-md bg-white shadow-lg w-full relative">
      <div className="w-[30%] h-[130px] flex justify-center items-center overflow-hidden relative">
        <ImageAtom
          fullHeight={true}
          fullWidth={true}
          className="rounded-l-md"
          src={image}
          alt="Card Image"
        />
        <div className="absolute top-[0px] left-[0px]">
          <Badge
            status={getStatus(startDate, endDate)}
            className="text-xs px-1 rounded-tl-[4px] rounded-br-[4px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 pr-4 pl-4 w-[70%]">
        <p className="text-gray-800 text-lg font-bold whitespace-nowrap text-ellipsis overflow-hidden w-[calc(100%-10px)]">
          {title}
        </p>
        <p className="text-gray-600 text-sm whitespace-nowrap text-ellipsis overflow-hidden w-[calc(100%-10px)]">
          {description}
        </p>
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-400" />
            <p className="text-gray-600 text-sm truncate w-[calc(100%-40px)]">{place}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <p className="text-gray-600 text-sm">
              {startDate} - {endDate}
            </p>
          </div>
        </div>
      </div>
      {isLeader && (
        <div title="You are Leader of this tour" className="absolute top-[-5px] right-[-5px] bg-white rounded-full p-1">
          <ShieldCheck className="h-6 w-6 text-green-500" />
        </div>
      )}
    </div>
  );
};

export default ListCard;
