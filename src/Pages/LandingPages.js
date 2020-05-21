import React, { Component } from "react";
import Header from "Parts/Header";
import Hero from "Parts/Hero";
import MostPicked from "Parts/MostPicked";
import landingPageJson from "json/landingPage.json";
import Categories from "Parts/Categories";
import Testimony from "Parts/Testimony";
import Footer from "Parts/Footer";

export default class LandingPages extends Component {
  constructor(props) {
    super(props);
    this.refMostPicked = React.createRef();
  }
  render() {
    return (
      <>
        <Header {...this.props} />
        <Hero data={landingPageJson.hero} refMostPicked={this.refMostPicked} />
        <MostPicked
          data={landingPageJson.mostPicked}
          refMostPicked={this.refMostPicked}
        />
        <Categories data={landingPageJson.categories} />
        <Testimony data={landingPageJson.testimonial} />
        <Footer />
      </>
    );
  }
}
