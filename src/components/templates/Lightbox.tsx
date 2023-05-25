import React, { useContext } from "react";
import { Modal, ShareSocial } from "../molecules";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { Popover, Transition } from "@headlessui/react";
import { getLikedPhoto, handleFavorite } from "@/utils/functions";
import { PhotoContext } from "@/context/PhotoContext";

interface ModalInterface {
  isOpen: boolean;
  data: any;
}

interface LightboxInterface {
  modal: ModalInterface;
  setModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      data: {};
    }>
  >;
}

const Lightbox = ({ modal, setModal }: LightboxInterface) => {
  const { data } = modal;
  const { state, dispatch } = useContext(PhotoContext);
  const { favorites } = state;
  return (
    <Modal isOpen={modal.isOpen} setModal={setModal}>
      <div className="text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="items-center flex">
            <Image
              src={data.user.profile_image.medium}
              alt={data.user.first_name}
              width={400}
              height={400}
              className="w-10 h-10 rounded-full"
            />
            <div className="pl-2">
              <p className="text-sm">{data.user.name}</p>
              {data.user.for_hire && (
                <p className="text-xs text-blue-600">Available for hire</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 rounded-md border border-1 border-gray-600 border-opacity-50 opacity-80 hover:opacity-100 ${
                getLikedPhoto(data.id, favorites)
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-900"
              }`}
              onClick={() => handleFavorite(data, favorites, dispatch)}
            >
              <AiOutlineHeart className="w-5 h-5" />
            </button>

            <Popover className="relative">
              <Popover.Button>
                <button className="px-2 py-1 rounded-md bg-white border border-1 border-gray-600 border-opacity-50 opacity-80 hover:opacity-100 text-gray-900">
                  <AiOutlineShareAlt className="w-5 h-5" />
                </button>
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0 bg-black opacity-20" />
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute right-0 top-2 z-10 bg-white rounded-md">
                  <ShareSocial url={data.links.html} />
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
        <Image
          width={1000}
          height={1000}
          src={data.urls.regular}
          loading="lazy"
          alt={data.alt_description}
          className="w-full rounded-md"
        />
      </div>
    </Modal>
  );
};

export default Lightbox;
