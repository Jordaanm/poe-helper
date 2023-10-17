import { Link } from "react-router-dom";
import { pageData } from "../App";

import './Home.scss';

export const Home = () => {
  return (
    <div className="page-content home-page">
      <h1>Home</h1>
      <div className="home-grid">
        {pageData.map((page) => (
          <Link to={page.path} key={page.title} className="page-link">
            <div className="icon">
              <img src={page.icon} alt={`${page.title} icon`} aria-hidden />
            </div>
            <div className="side-menu__title">{page.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
};