import { FormikProps } from "formik";
import React, { useState } from "react";

interface FimageProps<T> {
    height: number;
    width: number;
    form: "circle" | "square";
    name: string;
    formik: FormikProps<T>;
}

const Fimage = <T,>({ height, width, form, name, formik }: FimageProps<T>) => {
    const [imageBase64, setImageBase64] = useState<string | null>(null);
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

    return (
        <div
            className={`relative flex items-center justify-center border-2 border-dashed border-black ${
                isCircle ? "rounded-full" : "rounded-md"
            } cursor-pointer`}
            style={{ height, width }}
            onClick={handleClick}
        >
            {imageBase64 ? (
                <img
                    src={imageBase64}
                    alt={name}
                    className={`${isCircle ? "rounded-full" : "rounded-md"}`}
                    style={{ height, width }}
                />
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
