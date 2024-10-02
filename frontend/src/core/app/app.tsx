import SignUpPage from "@core/routes/auth/signup";
import SignInPage from "@core/routes/auth/signin";
import IndexPage from "@core/routes/index.page";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthSigil from "./sigils/auth.sigil";
import NewPlanetPage from "@core/routes/planets/new";

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
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
