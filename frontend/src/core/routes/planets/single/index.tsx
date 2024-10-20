import Layout from "@core/components/layout";
import { store, useAppDispatch, useAppSelector } from "@core/reducers";
import { useEffect } from "react";
import { loadCurrentPlanet } from "@core/reducers/slices/current_planet/thunks/load_current_planet";
import { useParams } from "react-router-dom";
import SinglePlanetSidebar from "./components/singlePlanetSidebar";
import Scroller from "./components/scroller";
import CometButton from "./components/cometButton";
import { errorActions } from "@core/reducers/slices/error";

const SinglePlanetPage: React.FC = () => {
    const { planet_id } = useParams<{ planet_id: string }>();
    const dispatch = useAppDispatch();

    const { error } = useAppSelector(
        (state) => state.currentPlanet
    );
    
    useEffect(() => {
        const fetchData = async () => {
            const planetIdNumber = parseInt(planet_id as string, 10);
            if (!isNaN(planetIdNumber)) {
                await store.dispatch(loadCurrentPlanet(planetIdNumber));
            }
        };

        fetchData();
    }, [planet_id]);

    if (error) 
        dispatch(
            errorActions.setError({
                error: error,
                to: "/"
            })
        )
    
    return (
        <Layout>
            <div className="flex min-h-screen">
                <SinglePlanetSidebar /> 
                <main className="flex-grow p-6 mr-4">
                    <h1 className="text-3xl font-bold">Search for Content here</h1>
                    <div>
                        <Scroller/>
                    </div>
                </main>
                <CometButton/>
            </div>
        </Layout>
    );
};

export default SinglePlanetPage;
