import { Refine, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
const CategoryList = React.lazy(() => import("./pages/categories").then(m => ({ default: m.CategoryList })));
const CategoryCreate = React.lazy(() => import("./pages/categories").then(m => ({ default: m.CategoryCreate })));
const CategoryEdit = React.lazy(() => import("./pages/categories").then(m => ({ default: m.CategoryEdit })));
const CategoryShow = React.lazy(() => import("./pages/categories").then(m => ({ default: m.CategoryShow })));

const ArticlesList = React.lazy(() => import("./pages/articles").then(m => ({ default: m.ArticlesList })));
const ArticlesCreate = React.lazy(() => import("./pages/articles").then(m => ({ default: m.ArticlesCreate })));
const ArticlesEdit = React.lazy(() => import("./pages/articles").then(m => ({ default: m.ArticlesEdit })));
const ArticlesShow = React.lazy(() => import("./pages/articles").then(m => ({ default: m.ArticlesShow })));

const TagsList = React.lazy(() => import("./pages/tags").then(m => ({ default: m.TagsList })));
const TagsCreate = React.lazy(() => import("./pages/tags").then(m => ({ default: m.TagsCreate })));
const TagsEdit = React.lazy(() => import("./pages/tags").then(m => ({ default: m.TagsEdit })));
const TagsShow = React.lazy(() => import("./pages/tags").then(m => ({ default: m.TagsShow })));

const FeedbacksList = React.lazy(() => import("./pages/feedbacks").then(m => ({ default: m.FeedbacksList })));
const FeedbacksCreate = React.lazy(() => import("./pages/feedbacks").then(m => ({ default: m.FeedbacksCreate })));
const FeedbacksEdit = React.lazy(() => import("./pages/feedbacks").then(m => ({ default: m.FeedbacksEdit })));
const FeedbacksShow = React.lazy(() => import("./pages/feedbacks").then(m => ({ default: m.FeedbacksShow })));
import { AppIcon } from "./components/app-icon";
import { supabaseClient } from "./utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import authProvider from "./authProvider";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                resources={[
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "articles",
                    list: "/articles",
                    create: "/articles/create",
                    edit: "/articles/edit/:id",
                    show: "/articles/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "tags",
                    list: "/tags",
                    create: "/tags/create",
                    edit: "/tags/edit/:id",
                    show: "/tags/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "feedbacks",
                    list: "/feedbacks",
                    create: "/feedbacks/create",
                    edit: "/feedbacks/edit/:id",
                    show: "/feedbacks/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "ZoA6Pb-ZrhYWK-foZQIF",
                  title: { text: "SKYM Admin", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={Header}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="categories" />}
                    />
                    <Route path="/articles">
                      <Route index element={<ArticlesList />} />
                      <Route path="create" element={<ArticlesCreate />} />
                      <Route path="edit/:id" element={<ArticlesEdit />} />
                      <Route path="show/:id" element={<ArticlesShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/tags">
                      <Route index element={<TagsList />} />
                      <Route path="create" element={<TagsCreate />} />
                      <Route path="edit/:id" element={<TagsEdit />} />
                      <Route path="show/:id" element={<TagsShow />} />
                    </Route>
                    <Route path="/feedbacks">
                      <Route index element={<FeedbacksList />} />
                      <Route path="create" element={<FeedbacksCreate />} />
                      <Route path="edit/:id" element={<FeedbacksEdit />} />
                      <Route path="show/:id" element={<FeedbacksShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            defaultValues: {
                              email: "info@refine.dev",
                              password: "refine-supabase",
                            },
                          }}
                        />
                      }
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
