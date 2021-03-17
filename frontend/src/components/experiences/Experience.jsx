import React, { Component } from "react";
import style from './Experience.module.css';

const Experience = () => {
  return (
    <React.Fragment>
      <div className={style.experience}>
        <div className='container'>
          <div className={style[`exp-head`]}>
            <h3>
              Experience the world
            </h3>
            <p>Unique activities with local experts—in person or online.</p>
          </div>
          <div className='row justify-content-center'>
            <div className={`col-md-4 col-sm-6 col-8 mb-3 ${style.pd}`}>
              <div className={`card ${style.card}`}>
                <img src="imgs/6.jpg" className={`card-img-top ${style['card-img-top']} card-img-top`}></img>
                <div className={`card-body ${style[`card-body`]}`}>
                  <h5>Online Experiences</h5>
                  <p className="card-text">Travel the world with out leaving home.</p>
                </div>
              </div>
            </div>
            <div className={`col-md-4 col-sm-6 col-8 mb-3 ${style.pd}`}>
              <div className={`card ${style.card}`}>
                <img src="imgs/5.jpg" className={`card-img-top ${style['card-img-top']} card-img-top`}></img>
                <div className={`card-body ${style[`card-body`]}`}>
                  <h5>Experiences</h5>
                  <p className="card-text">Things to do where ever you are.</p>
                </div>
              </div>
            </div>
            <div className={`col-md-4 col-sm-6 col-8 mb-3 ${style.pd}`}>
              <div className={`card ${style.card}`}>
                <img src="imgs/7.jpg" className={`card-img-top ${style['card-img-top']} card-img-top`}></img>
                <div className={`card-body ${style[`card-body`]}`}>
                  <h5>Adventures</h5>
                  <p className="card-text">Multi-day trips with every thing included.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Experience;

