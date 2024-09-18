import React from "react";

interface FimageProps {
    height: number;
    width: number;
    form: "circle" | "square";
    formName: string;
}

const Fimage: React.FC<FimageProps> = ({ height, width, form, formName }) => {
    const isCircle = form === "circle";

    return (
        <div
            className={`flex items-center justify-center border-2 border-dashed border-black ${
                isCircle ? "rounded-full" : "rounded-md"
            }`}
            style={{ height, width }}
        >
            <span className="absolute text-2xl font-bold">+</span>
            <span className="text-sm text-gray-600">{formName}</span>
        </div>
    );
};

export default Fimage;
