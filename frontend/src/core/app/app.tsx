import SignUpPage from "@core/routes/auth/signup";
import SignInPage from "@core/routes/auth/signin";
import IndexPage from "@core/routes/index.page";
import NewPlanetPage from "@core/routes/planets/new";
import SinglePlanetPage from "@core/routes/planets/single";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AuthSigil from "./sigils/auth.sigil";
import PlanetMembershipsSigil from "./sigils/planet_memberships.sigil";
import { useAppSelector } from "@core/reducers";
import NewCometPage from "@core/routes/comets/new";

const App = () => {
    const { profile } = useAppSelector((state) => state);

    useEffect(() => {
        const auth = AuthSigil()

        if (auth.isAuthenticated) {
            PlanetMembershipsSigil()
        }
    }, [profile.isAuthenticated])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage />} index />
                    <Route path="/auth/signup" element={<SignUpPage />} />
                    <Route path="/auth/signin" element={<SignInPage />} />
                    <Route path="/planets/" element={<NewPlanetPage />} />
                    <Route path="/planets/:planet_id" element={<SinglePlanetPage />} />
                    <Route path="/planets/:planet_id/comets/" element={<NewCometPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
