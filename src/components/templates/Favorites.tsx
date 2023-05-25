import React, { useContext } from "react";
import { Modal, ShareSocial } from "../molecules";
import { PhotoContext } from "@/context/PhotoContext";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { Popover, Transition } from "@headlessui/react";
import { getLikedPhoto, handleFavorite } from "@/utils/functions";

interface ModalInterface {
  isOpen: boolean;
  data: any;
}

interface FavoritesInterface {
  modal: ModalInterface;
  setModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      data: {};
    }>
  >;
}

const Favorites = ({ modal, setModal }: FavoritesInterface) => {
  const { state, dispatch } = useContext(PhotoContext);
  const { favorites } = state;

  return (
    <Modal isOpen={modal.isOpen} setModal={setModal} title="FAVORITE PHOTOS">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 mt-4 min-h-screen">
        {favorites.length > 0 ? (
          <div>
            {favorites.map((item: any) => (
              <div
                key={item._id}
                className="rounded-md mb-4 overflow-hidden bg-cover bg-no-repeat group relative cursor-pointer"
              >
                <Image
                  width={800}
                  height={800}
                  src={item.urls.small}
                  placeholder="blur"
                  blurDataURL={item.urls.thumb}
                  loading="lazy"
                  alt={item.alt_description}
                  className="w-full rounded-md transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                />
                <div className="absolute text-white bottom-0 z-10 left-0 px-2 pb-2 lg:px-4 lg:pb-4 items-center justify-between w-full hidden group-hover:flex">
                  <div className="items-center flex">
                    <Image
                      src={item.user.profile_image.medium}
                      alt={item.user.first_name}
                      width={400}
                      height={400}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="pl-2">
                      <p className="text-sm">{item.user.name}</p>
                      {item.user.for_hire && (
                        <p className="text-xs">Available for hire</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="action z-10 absolute top-0 right-0 px-2 pt-2 lg:px-4 lg:pt-4 gap-2 hidden group-hover:flex">
                  <button
                    className={`px-2 py-1 rounded-md opacity-80 hover:opacity-100 ${
                      getLikedPhoto(item.id, favorites)
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    onClick={() => handleFavorite(item, favorites, dispatch)}
                  >
                    <AiOutlineHeart className="w-5 h-5" />
                  </button>

                  <Popover className="relative">
                    <Popover.Button>
                      <button className="px-2 py-1 rounded-md bg-white opacity-80 hover:opacity-100 text-gray-900">
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
                        <ShareSocial url={item.links.html} />
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-gray-900">Favorit Kosong</h2>
        )}
      </div>
    </Modal>
  );
};

export default Favorites;
