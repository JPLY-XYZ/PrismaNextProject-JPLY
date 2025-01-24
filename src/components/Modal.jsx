"use client";

import { CopyX } from "lucide-react";
import { useRef } from "react";

function Modal({openButton, children}) {
  const refModal = useRef();

  const openModal = () => {
    refModal.current?.showModal();
  };
  const closeModal = () => {
    refModal.current?.close();
  };

return (
    <>
        <div onClick={openModal}>
            {openButton}
        </div>

        <dialog ref={refModal} className="relative">
            <div
                onClick={closeModal}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 flex gap-1 cursor-pointer"
            >
                CERRAR <CopyX />
            </div>

            {children}
        </dialog>
    </>
);
}

export default Modal;
