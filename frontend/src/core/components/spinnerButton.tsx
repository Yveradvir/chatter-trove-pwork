import { FC } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface ButtonProps {
    isSubmitting: boolean;
    isValid: boolean;
    text: string;
}

const SpinnerButton: FC<ButtonProps> = ({ isSubmitting, isValid, text }) => {
    return (
        <button
            type="submit"
            className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-300 text-white hover:bg-teal-400 focus:outline-none focus:bg-teal-400 ${
                !isValid || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
            }`}
            disabled={!isValid || isSubmitting}
        >
            {isSubmitting ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
                text
            )}
        </button>
    );
};

export default SpinnerButton;
