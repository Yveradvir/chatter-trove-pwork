import SignUpPage from "@core/routes/auth/signup";
import SignInPage from "@core/routes/auth/signin";
import IndexPage from "@core/routes/index.page";
import NewPlanetPage from "@core/routes/planets/new";
import SinglePlanetPage from "@core/routes/planets/single";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AuthSigil from "./sigils/auth.sigil";
import PlanetMembershipsSigil from "./sigils/planet_memberships.sigil";
import NewCometPage from "@core/routes/comets/new";
import ErrorPageDecorator from "@core/decorators/errorPageDecorator";

const Predecorated = (Component: React.FC) => {
    return () => (
        <ErrorPageDecorator>
            <Component />
        </ErrorPageDecorator>
    );
};

const App = () => {
    useEffect(() => {
        const auth = AuthSigil();

        if (auth.isAuthenticated) {
            PlanetMembershipsSigil();
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={Predecorated(IndexPage)()} index />
                <Route path="/auth/signup" element={Predecorated(SignUpPage)()} />
                <Route path="/auth/signin" element={Predecorated(SignInPage)()} />
                <Route path="/planets/" element={Predecorated(NewPlanetPage)()} />
                <Route path="/planets/:planet_id" element={Predecorated(SinglePlanetPage)()} />
                <Route path="/planets/:planet_id/comets/" element={Predecorated(NewCometPage)()} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
