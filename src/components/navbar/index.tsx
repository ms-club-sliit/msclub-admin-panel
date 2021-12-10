import React, { useState, useEffect } from "react";

const NavBar: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>();

  useEffect(() => {
    let authToken = localStorage.getItem("token");

    if (authToken) {
      setAuthToken(authToken);
    } else {
      setAuthToken(null);
    }
  });

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbar-content"
            aria-controls="navbar-content"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbar-content">
            <a className="navbar-brand mt-4 mx-2 mt-lg-0" href="/">
              <img
                className="navbar-logo"
                src="images/ms_club_logo_light.png"
                alt="MS Club Logo"
                loading="lazy"
              />
            </a>
            {authToken ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Events
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Webinars
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Top Speakers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Applications
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Inquiry
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Sign In
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact Admin
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className="d-flex align-items-center">
            {authToken ? (
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow profile-icon"
                href="#"
                id="profile-dropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                  className="rounded-circle"
                  height="35"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
            ) : null}
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profile-dropdown"
            >
              <li>
                <a className="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
