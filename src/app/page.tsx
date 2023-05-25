"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useContext } from "react";
import { useInView } from "react-intersection-observer";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Favorites, Lightbox, ShareSocial } from "@/components";
import { Popover, Transition } from "@headlessui/react";
import { PhotoContext } from "@/context/PhotoContext";
import { getLikedPhoto, handleFavorite } from "@/utils/functions";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const { state: photoState, dispatch } = useContext(PhotoContext);
  const { favorites } = photoState;
  const [pagination, setPagination] = React.useState({
    page: 1,
    per_page: 12,
    query: "cats",
  });
  const query = React.useRef<HTMLInputElement | any>(null);
  const { ref, inView } = useInView();
  let [modalDetail, setModalDetail] = React.useState({
    isOpen: false,
    data: {},
  });
  let [modalFavorite, setModalFavorite] = React.useState({
    isOpen: false,
    data: {},
  });

  const getPhotos = async (page: number, per_page: number, query: string) => {
    const res = await axios.get(
      `/api/photos?page=${page}&per_page=${per_page}&query=${query}`
    );

    return {
      data: res.data.results,
      pagination: {
        previousPage: page - 1,
        currentPage: page,
        nextPage: page + 1,
        totalPage: res.data.total_pages,
      },
    };
  };

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["photos", pagination],
    queryFn: ({ pageParam = 1 }) =>
      getPhotos(pageParam, pagination.per_page, pagination.query),
    getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination.previousPage ?? undefined,
    refetchOnMount(query) {
      return false;
    },
  });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleSearch = () => {
    setPagination({
      ...pagination,
      query: query.current.value,
    });
  };

  return (
    <main className="min-h-screen max-w-6xl p-6 mx-auto">
      <ToastContainer autoClose={1000} />
      <h2 className="text-xl md:text-3xl font-bold mb-6">UNSPLASH CLONE</h2>
      <div className="block md:flex items-center justify-between mb-4">
        <div className="search bg-white mb-4 md:mb-0 max-w-xl flex-1 flex items-center rounded-md">
          <input
            type="text"
            className="w-full py-2 px-2 mr-2 rounded-md dark:text-gray-900"
            ref={query}
            defaultValue={pagination.query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="rounded-ee-md px-2" onClick={handleSearch}>
            <AiOutlineSearch className="text-2xl transition duration-300 ease-in-out hover:scale-110 dark:text-gray-900" />
          </button>
        </div>
        <button
          onClick={() =>
            setModalFavorite({
              ...modalFavorite,
              isOpen: true,
            })
          }
          className="px-2 py-2 flex items-center font-medium gap-1 rounded-md bg-white opacity-80 hover:opacity-100 text-gray-900"
        >
          <AiOutlineHeart className="w-6 h-6" /> <span>My Favorites</span>
        </button>
      </div>
      <div className="datas">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error</p>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {data.pages.map((page: any, idx: number) => (
              <div key={idx}>
                {page.data.map((item: any) => (
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
                      className={`px-2 py-1 rounded-md opacity-80 hover:opacity-100 ${getLikedPhoto(item.id, favorites) ? 'bg-red-500 text-white' : 'bg-white text-gray-900'}`}
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
                  <div
                    onClick={() =>
                      setModalDetail({
                        isOpen: true,
                        data: item,
                      })
                    }
                    className="absolute top-0 left-0 h-full w-full bg-black opacity-0 group-hover:opacity-20 transition duration-300 ease-in-out"
                  />
                </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load Newer"
              : "Nothing more to load"}
          </button>
        </div>
      </div>

      {modalDetail.isOpen && (
        <Lightbox modal={modalDetail} setModal={setModalDetail} />
      )}
      {modalFavorite.isOpen && (
        <Favorites modal={modalFavorite} setModal={setModalFavorite} />
      )}
    </main>
  );
}
