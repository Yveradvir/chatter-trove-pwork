import { Transition } from "@headlessui/react";
import SpinnerButton from "./spinnerButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { check_error } from "@core/utils/check_fn";
import ReactDOM from "react-dom";

interface WarningModalI {
    open: boolean;
    onClose: () => void;
    handler: () => Promise<boolean>;
    after_success_url?: string;
    step_back?: boolean;
}

const WarningModal: React.FC<WarningModalI> = ({
    open,
    onClose,
    handler,
    after_success_url,
    step_back = false,
}) => {
    const [globalError, setGlobalError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleOkClick = async () => {
        setIsSubmitting(true)
        try {
            const res = await handler();
            if (res) {
                setIsSubmitting(false)
                onClose();
                if (after_success_url) navigate(after_success_url);
                if (step_back) navigate(-1);   
            }
        } catch (error) {
            setGlobalError(check_error(error));
        }
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
                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-neutral-50 mb-4">
                        Warning
                    </h2>
                    <p className="text-sm text-neutral-300 mb-6">
                        This is an important action. Please confirm to proceed.
                    </p>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md text-sm bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                        >
                            Cancel
                        </button>
                        <div onClick={handleOkClick}>
                            <SpinnerButton
                                isSubmitting={isSubmitting}
                                isValid={!globalError}
                                text="OK"
                            />
                        </div>
                    </div>
                    {globalError && (
                        <p className="text-red-500 text-xs mt-4">
                            {globalError}
                        </p>
                    )}
                </div>
            </div>
        </Transition>,
        document.body
    );
};

export default WarningModal;
