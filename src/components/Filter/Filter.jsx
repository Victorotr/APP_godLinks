import "./Filter.css";

// React

import { Link, useLocation, useNavigate } from "react-router-dom";
import {FormattedMessage} from 'react-intl';

// Contexts

import { useAuth } from "../../contexts/AuthContext";
import { useShowLogin } from "../../contexts/ShowLoginContext";
import { useNavigateTo } from "../../contexts/NavigateToContext";

export const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const { user } = useAuth();
  const [showLogin, setShowLogin] = useShowLogin();
  const [, setNavigateTo] = useNavigateTo();

  const handleClickFavorites = () => {
    setNavigateTo("/favorites");
    user ? navigate("/favorites") : setShowLogin(!showLogin);
  };

  return (
    <nav className="filter">
      {currentPath !== "/allOffers" ? (
        <Link className="link" to="/allOffers">
          <FormattedMessage id="all-offers"/>
        </Link>
      ) : null}
      {currentPath !== "/" ? (
        <Link className="link" to="/">
          <FormattedMessage id="todays-offers"/>
        </Link>
      ) : null}
      {currentPath !== "/offersByVotes" ? (
        <Link className="link" to="/offersByVotes">
          <FormattedMessage id="most-rated-offers"/>
        </Link>
      ) : null}
      {currentPath !== "/favorites" ? (
        <p onClick={handleClickFavorites} className="link">
          <FormattedMessage id="favorite-offers"/>
        </p>
      ) : null}
    </nav>
  );
};
