import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContextProvider from "./userContext";
import Header from "./components/Header";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home"
import Write from "./pages/Write";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import HomeRight from "./components/home/HomeRight";
import TagPageTemplate from "./components/TagPageTemplate";
import UpdatePost from "./pages/UpdatePost";
import SavedPosts from "./pages/SavedPosts";
import Footer from "./components/Footer";
import React from "react";


function App() {


  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex">
        <div className="w-[70%]">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/signup'} element={<Signup />} />
              <Route path={'/about'} element={<AboutUs />} />
              <Route path={'/Post'} element={<PostPage />} />
              <Route path={'/Profile/:id'} element={<ProfilePage />} />
              <Route path={'/Profile'} element={<ProfilePage />} />
              <Route path={'/Tags'} element={<Write />} />
              <Route path={'/editor'} element={<Write />} />
              <Route path={'/edit-post/:id'} element={<UpdatePost />} />
              <Route path={'/post/:id'} element={<PostPage />} />
              <Route path={'/tags/:id'} element={<TagPageTemplate />} />
              <Route path={'/saved'} element={<SavedPosts />} />

              {/* <Route path={'/contact'} element={<Contact />} /> */}
            </Route>
          </Routes>
        </div>
        {/* vertical Border  */}
        <div className='border-r-[1px] border-richblack-100 mt-8 mb-8 mr-8'> </div>
        <div className="w-[35%]">
          <HomeRight />
        </div>
      </div>
    </div>
  );
}

export default App;
