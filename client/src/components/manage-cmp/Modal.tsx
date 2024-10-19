/**
 * Modal Component
 *
 * This component renders a modal dialog with a title, content, and action buttons.
 * It is designed to be used for displaying important information or forms that require user interaction.
 *
 * @component
 * @example
 * ```tsx
 * import React, { useState } from 'react';
 * import Modal from './modal';
 *
 * const App = () => {
 *   const [isModalOpen, setIsModalOpen] = useState(false);
 *
 *   const handleOpenModal = () => {
 *     setIsModalOpen(true);
 *   };
 *
 *   const handleCloseModal = () => {
 *     setIsModalOpen(false);
 *   };
 *
 *   const handleSubmit = () => {
 *     // Handle form submission
 *     setIsModalOpen(false);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleOpenModal}>Open Modal</button>
 *       <Modal
 *         title="Modal Title"
 *         content={<div>Modal Content</div>}
 *         onClose={handleCloseModal}
 *         isModalOpen={isModalOpen}
 *         onSubmit={handleSubmit}
 *       />
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the modal.
 * @param {ReactNode} props.content - The content to be displayed inside the modal.
 * @param {MouseEventHandler<SVGSVGElement | HTMLButtonElement>} props.onClose - The function to call when the modal is closed.
 * @param {boolean} props.isModalOpen - A boolean indicating whether the modal is open or not.
 * @param {MouseEventHandler<HTMLButtonElement>} props.onSubmit - The function to call when the form inside the modal is submitted.
 */
import React, { ReactNode, MouseEventHandler } from "react";

interface ModalProps {
    title: string;
    content: ReactNode;
    onClose: MouseEventHandler<SVGSVGElement | HTMLButtonElement>;
    isModalOpen: boolean;
    onSubmit?: MouseEventHandler<HTMLButtonElement>;
}

function Modal({ title, content, onClose, isModalOpen, onSubmit }: ModalProps) {
    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                        <div className="flex items-center pb-3 border-b border-gray-300">
                            <h3 className="text-gray-800 text-xl font-bold flex-1">
                                {title}
                            </h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                                viewBox="0 0 320.591 320.591"
                                onClick={onClose}
                            >
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"
                                ></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>
                        <div className="my-6">{content}</div>
                        <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onSubmit={onSubmit}
                                className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;



