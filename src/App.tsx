import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "./pages/Home";
import { Catalysts } from "./pages/Catalysts";
import { Link } from "react-router-dom";
import { ChallengesPage } from "./pages/Challenges";
import { ScarabsPage } from "./pages/Scarabs";
import { ApplicationSettingsProvider } from "./contexts/settings-context";
import { SettingsPage } from "./pages/SettingsPage";
import { EssencesPage } from "./pages/EssencesPage";

interface PageDatum {
  title: string;
  path: string;
  icon: string;
  element: ReactNode;
}

const pageData: PageDatum[] = [
  {
    title: 'Home',
    path: '/',
    icon: '/hideout.png',
    element: <Home />
  },
  {
    title: 'Catalysts',
    path: '/catalysts',
    icon: 'https://www.pathofexile.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2F0YWx5c3RzL0ZlcnRpbGVDYXRhbHlzdCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/4b4ca5d929/FertileCatalyst.png',
    element: <Catalysts />
  },
  {
    title: 'Challenges',
    path: '/challenges',
    icon: '/challenge.png',
    element: <ChallengesPage />
  },
  {
    title: 'Delirium',
    path: '/delirium',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Delirium/DeliriumOrbScarabs.png?w=1&h=1&scale=1',
    element: <Home />
  },
  {
    title: 'Essences',
    path: '/essences',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Essence/Woe7.png?scale=1&w=1&h=1',
    element: <EssencesPage />
  },
  {
    title: 'Oils',
    path: '/oils',
    icon: 'https://web.poecdn.com/image/blight/items/OpalescentOil.png?scale=1&w=1&h=1',
    element: <Home />
  },
  {
    title: 'Scarabs',
    path: '/scarabs',
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Scarabs/GreaterScarabBreach.png?scale=1&scaleIndex=0&w=1&h=1',
    element: <ScarabsPage />
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: '/settings.png',
    element: <SettingsPage />
  }
]

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationSettingsProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {pageData.map((page) => <Route key={page.title} path={page.path} element={page.element} />)}
            </Routes>
          </Layout>
        </BrowserRouter>
      </ApplicationSettingsProvider>
    </QueryClientProvider>
  );
}

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div className="page">
      <menu className="side-menu">
        <ul>
          {pageData.map((page) => (
            <li key={page.title} className="side-menu-item">
              <Link to={page.path}>
                <div className="icon">
                  <img src={page.icon} alt={`${page.title} icon`} aria-hidden />
                </div>
                <div className="side-menu__title">{page.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </menu>
      <main>{children}</main>
    </div>
  );
};

export default App;
