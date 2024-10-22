import React, { useState } from "react";

export interface TooltipProps {
    content: string;
    placement: "top" | "left" | "right" | "bottom";
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, placement, children }) => {
    const [visible, setVisible] = useState(false);

    const getTooltipClasses = () => {
        switch (placement) {
            case "top":
                return "left-1/2 -translate-x-1/2 bottom-full mb-2";
            case "left":
                return "right-full top-1/2 -translate-y-1/2 mr-2";
            case "right":
                return "left-full top-1/2 -translate-y-1/2 ml-2";
            case "bottom":
                return "left-1/2 -translate-x-1/2 top-full mt-2";
            default:
                return "";
        }
    };

    return (
        <div className="relative inline-block">
            <div
                className="inline-flex"
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </div>
            <div
                className={`absolute z-10 px-3 py-2 text-xs font-medium border border-neutral-700 bg-neutral-800 rounded shadow-lg transition-all duration-300 ease-in-out transform ${visible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-90'} ${getTooltipClasses()}`}
                style={{ userSelect: "none", maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'normal' }}
                role="tooltip"
            >
                {content}
            </div>
        </div>
    );
};

export default Tooltip;
