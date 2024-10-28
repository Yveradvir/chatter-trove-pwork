import React, { FC, useState } from "react";
import { useField } from "formik";
import Tooltip, { TooltipProps } from "./tooltip";

interface SwitchbuProps {
    field_name: string;
    states: {
        tooltip: TooltipProps;
        content: React.ReactNode | string;
        field_value: unknown;
    }[];
}

const Switchbu: FC<SwitchbuProps> = ({ field_name, states }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_field, _meta, helpers] = useField(field_name);
    const [currentStateIndex, setCurrentStateIndex] = useState(0);

    const handleSwitch = () => {
        const nextIndex = (currentStateIndex + 1) % states.length;
        setCurrentStateIndex(nextIndex);
        helpers.setValue(states[nextIndex].field_value);
        console.log(states[nextIndex].field_value);
    };

    const currentState = states[currentStateIndex];

    return (
        <div className="flex items-center">
            <Tooltip
                content={currentState.tooltip.content}
                placement={currentState.tooltip.placement}
            >
                <div
                    className="cursor-pointer px-4 py-2 bg-neutral-800 text-neutral-100 rounded-md hover:bg-neutral-700"
                    onClick={handleSwitch}
                >
                    {currentState.content}
                </div>
            </Tooltip>
        </div>
    );
};

export default Switchbu;
