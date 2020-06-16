import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
} from '../styled/Navbar';
import { Accent } from '../styled/Random';
import { useAuth0 } from '../react-auth0-spa';

export default function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <StyledNavbar>
      <StyledNavBrand className="nav__brand">
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <li>
            <button onClick={() => loginWithRedirect({})}>Login</button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        )}
        <button onClick={toggleTheme}>Toggle Theme</button>
      </StyledNavItems>
    </StyledNavbar>
  );
}
