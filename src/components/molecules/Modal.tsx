import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalInterface {
  isOpen: boolean;
  setModal: React.Dispatch<React.SetStateAction<{ isOpen: boolean; data: {} }>>;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, setModal, children, title }: ModalInterface) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() =>
          setModal({
            isOpen: false,
            data: {},
          })
        }
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    className="p-2 bg-gray-50 text-gray-900 rounded-full"
                    onClick={() =>
                      setModal({
                        isOpen: false,
                        data: {},
                      })
                    }
                  >
                    <AiOutlineClose className="text-xl" />
                  </button>
                </div>
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
