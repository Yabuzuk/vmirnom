import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Classifieds } from "./pages/Classifieds";
import { PostAd } from "./pages/PostAd";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "classifieds", Component: Classifieds },
      { path: "post-ad", Component: PostAd },
      { path: "*", Component: NotFound },
    ],
  },
], { basename: '/vmirnom' });
