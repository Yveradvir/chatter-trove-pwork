import SignUpPage from "@core/routes/auth/signup";
import SignInPage from "@core/routes/auth/signin";
import IndexPage from "@core/routes/index.page";
import NewPlanetPage from "@core/routes/planets/new";
import SinglePlanetPage from "@core/routes/planets/single";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthSigil from "./sigils/auth.sigil";

const App = () => {

    return (
        <>
            <AuthSigil />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage />} index />
                    <Route path="/auth/signup" element={<SignUpPage />} />
                    <Route path="/auth/signin" element={<SignInPage />} />
                    <Route path="/planets/" element={<NewPlanetPage />} />
                    <Route path="/planets/:planet_id" element={<SinglePlanetPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
