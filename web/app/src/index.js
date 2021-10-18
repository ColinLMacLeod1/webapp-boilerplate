import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Styles
import "./styles/index.css";

// Context
import { AnnounceProvider } from "./providers/announce";
import { ConfigProvider, useConfig } from "./providers/config";
import { LanguageProvider, useLanguage } from "./providers/language";
import { AuthProvider, useAuth } from "./providers/auth";

// Pages
import Landing from "./pages/landing";
import Login from "./pages/login";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";

// Error handling
import { ErrorBoundary, ErrorFallback } from "./pages/error";

// Util
import lazyWithPreload from "./util/lazyWithPreload";
import { getRoute, getLangRoutes } from "./util/routes";
import Logger from "./util/logger";
const logger = Logger("index.js");

//Lazy loaded pages
const Palette = lazyWithPreload(() => import("./pages/palette"), true);

// import reportWebVitals from './reportWebVitals';

const Loading = () => (
  <div className="w-full h-full flex flex-col content-center">
    <h1 className="mx-auto mt-20 text-xl border-b-0 text-center">Loading...</h1>
  </div>
);

const App = () => {
  const { language, text } = useLanguage();
  const { config } = useConfig();
  const { isLoggedIn } = useAuth();

  logger.debug(config, language, text)

  return config && language && text ? (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={getLangRoutes("root")} component={Landing} />
        <Route exact={true} path={getLangRoutes("login")} component={Login} />
        <Route
          exact={true}
          path={getLangRoutes("profile")}
          render={() =>
            isLoggedIn ? <Profile /> : <Redirect to={getRoute("login", language)} />
          }
        />
        <Route
          exact={true}
          path={getLangRoutes("palette")}
          component={Palette}
        />
        <Route
          exact={true}
          path="/"
          render={() => <Redirect to={getRoute("root", language)} />}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  ) : (
    <Loading />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loading />}>
        <AnnounceProvider>
          <ConfigProvider>
            <LanguageProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </LanguageProvider>
          </ConfigProvider>
        </AnnounceProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
