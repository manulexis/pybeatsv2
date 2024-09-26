// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
      <div className="container text-center mt-5">
          <div className="row justify-content-center">
              <div className="col-md-8">
                  <h1 className="display-4">Bienvenido a Home</h1>
                  <p className="lead">
                      This is the main landing page of your application.
                  </p>
                  <div className="alert alert-info" role="alert">
                      We're excited to have you here! Explore our site and discover all the features we have to offer.
                  </div>
                  <button className="btn btn-primary btn-lg">Get Started</button>
              </div>
          </div>
      </div>
  );
};
export default Home;
