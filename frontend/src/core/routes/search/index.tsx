import { useState, useEffect } from "react";
import Layout from "@core/components/layout";
import { useLocation } from "react-router-dom";
import PlanetsSearchField from "./components/planets/field";
import UsersSearchField from "./components/users/field";
import PlanetsSearchScroller from "./components/planets/scroller";

const SearchPage = () => {
    const location = useLocation();
    const find = new URLSearchParams(location.search).get("find");

    const [searchType, setSearchType] = useState<string | null>(null);

    useEffect(() => {
        if (find === "planets" || find === "users") {
            setSearchType(find);
        } else {
            setSearchType(null);
        }
    }, [find]);

    const handleSearchTypeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSearchType(e.target.value);
    };

    const renderInputField = () => {
        return ["planets", "users"].includes(searchType!) ? 
        {
            planets: (
                <>
                    <PlanetsSearchField />
                    <PlanetsSearchScroller/>
                </>
            ),
            users: <UsersSearchField />
        }[searchType!] : <></>
    };

    return (
        <Layout>
            <div className="mx-auto max-w-2xl py-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-cyan-300">
                        Let's Find!
                    </h1>
                    <div className="my-6">
                        <div>
                            <select
                                value={searchType || ""}
                                onChange={handleSearchTypeChange}
                                className="block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100 focus:ring-cyan-500 focus:border-cyan-500"
                            >
                                <option value="planets">Planets</option>
                                <option value="users">Users</option>
                            </select>
                        </div>
                        <div className="mt-6">
                            {renderInputField()}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SearchPage;
