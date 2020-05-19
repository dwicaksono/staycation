import React, { Component } from "react";
import Header from "Parts/Header";
import Hero from "Parts/Hero";
import MostPicked from "Parts/MostPicked";
import landingPageJson from "json/landingPage.json";

export default class LandingPages extends Component {
  constructor(props) {
    super(props);
    this.refMostPicked = React.createRef();
  }
  render() {
    return (
      <>
        <Header {...this.props} />
        <Hero data={landingPageJson.hero} />
        <MostPicked
          data={landingPageJson.mostPicked}
          refMostPicked={this.refMostPicked}
        />
      </>
    );
  }
}
