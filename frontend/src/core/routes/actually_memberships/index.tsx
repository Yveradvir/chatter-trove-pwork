import Layout from "@core/components/layout";
import ActuallyMembershipsField from "./components/filterField";

const ActuallyMembershipsPage = () => {
    return (
        <Layout>
            <div className="mx-auto max-w-2xl py-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-cyan-300">
                        Members of this planet
                    </h1>
                    <div className="my-6">
                        <div className="mt-6">
                            <ActuallyMembershipsField />
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ActuallyMembershipsPage;
