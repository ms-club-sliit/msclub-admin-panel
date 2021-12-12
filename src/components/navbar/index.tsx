import React, { useState, useEffect } from "react";
import ApplicationConstants from "../../constants";

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
                {ApplicationConstants.AUTH_NABAR_ITEMS.map((item) => (
                  <li className="navbar-item nav-item" key={item.id}>
                    <a href={item.link} className="nav-link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="navbar-nav">
                {ApplicationConstants.DEFAULT_NAVBAR_ITEMS.map((item) => (
                  <li className="navbar-item nav-item" key={item.id}>
                    <a href={item.link} className="nav-link">
                      {item.name}
                    </a>
                  </li>
                ))}
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
              {ApplicationConstants.AUTH_NAVBAR_OPTIONS.map((item) => (
                <li key={item.id}>
                  {item.link ? (
                    <a href={item.link} className="dropdown-item">
                      {item.name}
                    </a>
                  ) : null}
                </li>
              ))}
              <li>
                <span className="dropdown-item">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
