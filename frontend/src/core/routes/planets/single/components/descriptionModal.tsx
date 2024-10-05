import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface DescriptionModalProps {
    open: boolean;
    onClose: () => void;
    description: string;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
    open,
    onClose,
    description,
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return ReactDOM.createPortal(
        <Transition
            show={open}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                <div className="relative bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md h-96 overflow-hidden">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 text-neutral-300 hover:text-neutral-100"
                    >
                        &#10005;
                    </button>

                    <h2 className="text-2xl font-bold text-teal-300 mb-4">
                        Description
                    </h2>

                    <div className="overflow-y-auto max-h-72 pr-2">
                        <p className="text-cyan-300">{description}</p>
                    </div>
                </div>
            </div>
        </Transition>,
        document.body
    );
};

export default DescriptionModal;
