import SignUpPage from "@core/routes/auth/signup";
import SignInPage from "@core/routes/auth/signin";
import IndexPage from "@core/routes/index.page";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    console.log(import.meta.env);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} index />
                <Route path="/auth/signup" element={<SignUpPage />} />
                <Route path="/auth/signin" element={<SignInPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
