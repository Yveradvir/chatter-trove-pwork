import SignUpPage from "@core/routes/auth/signup";
import IndexPage from "@core/routes/index.page";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} index />
                <Route path="/auth/signup" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
