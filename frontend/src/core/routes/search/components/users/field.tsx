import { Field, Input } from "@headlessui/react";

const UsersSearchField = () => {
    return (
        <Field>
            <Input
                placeholder="Search Users..."
                className="block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100"
            />
        </Field>
    );
};

export default UsersSearchField;