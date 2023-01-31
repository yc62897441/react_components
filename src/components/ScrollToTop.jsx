// react-router scroll to top on every transition
// 使用 react-router-dom Link 切換頁面時，scroll to top automatically
// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition


// 1.先宣告好 ScrollToTop
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 2.把 ScrollToTop 放到 app.js，render it at the top of your app, but below <Router>
// 或是放到 index.js，below <BrowserRouter>