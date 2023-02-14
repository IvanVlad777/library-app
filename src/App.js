import LogInForm from "./components/LogIn/LogInForm";
import RegisterForm from "./components/LogIn/RegisterForm";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BookReservation from "./components/BooksReservation/BookReservation";
import UserContextProvider from "./context/Context";
import News from "./components/News/News";
import Recommendations from "./components/Recommendations/Recommendations";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LogInForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route
              path="/bookreservation"
              element={<BookReservation />}
            ></Route>
            <Route path="/news" element={<News />}></Route>
            <Route
              path="/recommendations"
              element={<Recommendations />}
            ></Route>
          </Routes>
        </Layout>
      </Router>
    </UserContextProvider>
  );
}

export default App;
