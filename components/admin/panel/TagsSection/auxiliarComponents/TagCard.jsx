import React, { useState } from "react";
import { toast } from "sonner";
import UpdateSection from "./UpdateSection";

const TagCard = ({ value, removeValue, fullName = false }) => {
  const [showUpdateTags, setShowUpdateTags] = useState(false);
  const handleRemoveTag = () => {
    removeValue(value);
  };

  if (showUpdateTags) {
    return <UpdateSection setShowUpdateTags={setShowUpdateTags} tag={value} />;
  }

  return (
    <div className="flex flex-row gap-2 justify-center items-center border border-blue-800 py-0.5 px-2  rounded-3xl text-blue-800 text-xs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#0040AF"
        className="w-5 h-5 cursor-pointer"
        onClick={() =>
          toast.info(`Seguro que quieres borrar la etiqueta '${value.name}'?`, {
            action: {
              label: "Confirmar",
              onClick: handleRemoveTag,
            },
          })
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#0040AF"
        className="w-5 h-5 cursor-pointer"
        onClick={() => setShowUpdateTags(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </svg>

      {fullName
        ? value.name
        : value.name.length > 10
        ? value.name.slice(0, 10) + "..."
        : value.name}
    </div>
  );
};

export default TagCard;
