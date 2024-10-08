import Layout from "@core/components/layout";
import { store, useAppSelector } from "@core/reducers";
import { useEffect } from "react";
import { loadCurrentPlanet } from "@core/reducers/slices/current_planet/thunks/load_current_planet";
import { useParams } from "react-router-dom";
import SinglePlanetSidebar from "./components/singlePlanetSidebar";
import ErrorPage from "@core/components/errorPage";

const SinglePlanetPage: React.FC = () => {
    const { planet_id } = useParams<{ planet_id: string }>();

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
        return <ErrorPage detail={error.detail} status_code={error.status_code} />
    
    return (
        <Layout>
            <div className="flex min-h-screen">
                <SinglePlanetSidebar /> 
                <main className="flex-grow p-6 mr-4">
                    <h1 className="text-3xl font-bold">Main Page Content</h1>
                    <p className="mt-4">
                        This is the main content area. You can add more
                        components or content here.
                    </p>
                </main>
            </div>
        </Layout>
    );
};

export default SinglePlanetPage;
