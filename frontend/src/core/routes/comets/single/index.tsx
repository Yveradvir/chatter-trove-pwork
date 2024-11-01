import Layout from "@core/components/layout";
import { useAppDispatch, useAppSelector } from "@core/reducers";
import { CometEntity } from "@core/reducers/slices/comets/state";
import { errorActions } from "@core/reducers/slices/error";
import ApiService from "@core/utils/api";
import { Rejector } from "@core/utils/rejector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserBlock from "./components/userBlock";

const SingleCometPage: React.FC = () => {
    const { comet_id } = useParams<{ comet_id: string }>();
    const cometId = parseInt(comet_id as string, 10);

    const [comet, setComet] = useState<CometEntity | null>(null);
    const cometEntities = useAppSelector((state) => state.comets.entities);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCometData = async () => {
            const response = await ApiService.get(`/comets/${cometId}`);
            if (response.status === 200) {
                setComet(response.data);
            } else {
                dispatch(
                    errorActions.setError({
                        error: Rejector.standartAxiosReject(response),
                        to: "/",
                    })
                );
            }
        };

        if (isNaN(cometId))
            dispatch(
                errorActions.setError({
                    error: {
                        status_code: 400,
                        detail: "Incorrect comet's id"
                    },
                    to: "/",
                })
            );

        if (cometEntities[cometId]) {
            setComet(cometEntities[cometId]);
        } else {
            fetchCometData();
        }
    }, [cometId, cometEntities, dispatch]);

    if (!comet) return null;

    return (
        <Layout>
            <div className="mx-auto max-w-4xl py-20 px-4">
                <h1 className="text-5xl font-extrabold text-cyan-400 tracking-tight">
                    {comet.title}
                </h1>
                <UserBlock comet={comet}/>
                <p className="mt-4 break-words">
                    {comet.description}
                </p>
            </div>
        </Layout>
    );
};

export default SingleCometPage;
