import Layout from "@core/components/layout";
import { store, useAppDispatch, useAppSelector } from "@core/reducers";
import { useEffect, useState } from "react";
import { loadCurrentPlanet } from "@core/reducers/slices/current_planet/thunks/load_current_planet";
import { useParams } from "react-router-dom";
import SinglePlanetSidebar from "./components/singlePlanetSidebar";
import Scroller from "./components/scroller";
import CometButton from "./components/cometButton";
import { errorActions } from "@core/reducers/slices/error";
import JoinToPrivateModal from "@core/components/joinToPrivate";

const SinglePlanetPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { planet_id } = useParams<{ planet_id: string }>();
    const dispatch = useAppDispatch();

    const { error, entity } = useAppSelector((state) => state.currentPlanet);
    const { isAuthenticated } = useAppSelector((state) => state.profile);
    const planetmemberships = useAppSelector(
        (state) => state.planet_memberships
    );

    useEffect(() => {
        const fetchData = async () => {
            const planetIdNumber = parseInt(planet_id as string, 10);

            if (!isNaN(planetIdNumber)) {
                await store.dispatch(loadCurrentPlanet(planetIdNumber));
            }
        };

        fetchData();

        if (entity?.is_private) {
            const isMember = Object.values(planetmemberships.entities).some(
                (membership: {planet: number}) => membership.planet === parseInt(planet_id!, 10)
            );
            console.log("Planet is private", planetmemberships.entities, isMember);

            console.log(isMember);
            

            if (
                !isAuthenticated ||
                !isMember
            ) {
                setIsOpen(true);
            }
        }
    }, [
        planet_id,
        dispatch,
        planetmemberships.loadingStatus,
        entity?.is_private,
        planetmemberships.entities,
        isAuthenticated,
        planetmemberships.ids,
    ]);

    if (error)
        dispatch(
            errorActions.setError({
                error: error,
                to: "/",
            })
        );

    return (
        <>
            {!isOpen && (
                <Layout>
                    <div className="flex min-h-screen">
                        <SinglePlanetSidebar />
                        <main className="flex-grow p-6 mr-4">
                            <h1 className="text-3xl font-bold">
                                Search for Content here
                            </h1>
                            <div>
                                <Scroller />
                            </div>
                        </main>
                        <CometButton />
                    </div>
                </Layout>
            )}
            {entity?.is_private && (
                <JoinToPrivateModal
                    onClose={() => {
                        setIsOpen(false);
                    }}
                    open={isOpen}
                    planet_id={parseInt(planet_id!, 10)}
                />
            )}
        </>
    );
};

export default SinglePlanetPage;
