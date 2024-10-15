import Layout from "@core/components/layout";
import IsAuthenticated from "@core/decorators/isAuthenticated";
import { useAppSelector } from "@core/reducers";
import { ProfileEntity } from "@core/reducers/slices/profile/state";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CometValues } from "./vd";
import ErrorPage from "@core/components/errorPage";

const NewCometPage = () => {
    const { planet_id } = useParams<{ planet_id: string }>();
    const user = useAppSelector(
        (state) => state.profile.entity
    ) as ProfileEntity;

    const formik = useFormik({
        initialValues: {
            title: "",
            user: user.id,
            planet: planet_id
                ? Number.parseInt(planet_id)
                : () => (
                      <ErrorPage
                          detail="Planet hasn't loaded"
                          status_code={500}
                      />
                  ),
        } as CometValues,
        onSubmit: async (values) => console.log(values),
    });

    return (
        <>
            <IsAuthenticated />
            <Layout>
                <form onSubmit={formik.handleSubmit}>
                </form>
            </Layout>
        </>
    );
};

export default NewCometPage;
