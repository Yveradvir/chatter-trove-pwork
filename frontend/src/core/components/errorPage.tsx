import { ApiError } from "@core/utils/const";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import ReactDOM from "react-dom";

interface ErrorPageModalProps extends ApiError {
    open: boolean;
    onClose: () => void;
}

const ErrorPage: React.FC<ErrorPageModalProps> = ({
    detail,
    status_code,
    open,
    onClose,
}) => {
    const navigate = useNavigate();

    const goBack = () => {
        const currentPath = window.location.pathname;
        const trimmedPath = currentPath.replace(/\/[^/]+\/?$/, '/');
        navigate(trimmedPath);
        onClose();
    };

    const goToMain = () => {
        navigate("/");
        onClose();
    };

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
                <div className="bg-neutral-900 p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
                    <h2 className="text-4xl font-bold text-neutral-50 mb-6">
                        Error {status_code}
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {detail || "Oops, something went wrong."}
                    </p>
                    <div className="mt-8 flex flex-col gap-6">
                        <button
                            onClick={goBack}
                            children="Go Back"
                            className="w-full py-4 px-5 inline-flex justify-center items-center gap-x-2 text-lg font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        />
                        <button
                            onClick={goToMain}
                            children="Go to Main Page"
                            className="w-full py-4 px-5 inline-flex justify-center items-center gap-x-2 text-lg font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        />
                    </div>
                </div>
            </div>
        </Transition>,
        document.body
    );
};

export default ErrorPage;
