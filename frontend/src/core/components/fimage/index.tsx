import { FormikProps } from "formik";
import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface FimageProps<T> {
    height: number;
    width: number;
    form: "circle" | "square";
    name: string;
    formik: FormikProps<T>;
}

const Fimage = <T,>({ height, width, form, name, formik }: FimageProps<T>) => {
    const [imageBase64, setImageBase64] = useState<string>("");
    const isCircle = form === "circle";

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result as string);
                formik.setFieldValue(name, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        document.getElementById(name)?.click();
    };

    const clearImage = () => {
        setImageBase64("");
        formik.setFieldValue(name, "");
    };

    return (
        <div
            className={`relative flex items-center justify-center border-2 border-dashed border-${imageBase64 ? "transparent" : "neutral-300"} ${
                isCircle ? "rounded-full" : "rounded-md"
            } cursor-pointer`}
            style={{ height, width }}
            onClick={handleClick}
        >
            {imageBase64 ? (
                <>
                    <img
                        src={imageBase64}
                        alt={name}
                        className={`${
                            isCircle ? "rounded-full" : "rounded-md"
                        }`}
                        style={{ height, width }}
                    />
                    <div
                        className="absolute bottom-1 left-1 border-2 border-dashed border-red-600 rounded-full p-1 cursor-pointer"
                        onClick={() => clearImage()}
                    >
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                </>
            ) : (
                <span className="absolute text-2xl font-bold">+</span>
            )}

            <input
                type="file"
                id={name}
                name={name}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default Fimage;
