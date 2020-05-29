import React, { Component } from "react";
import Fade from "react-reveal/Fade";

import Header from "Parts/Header";
import PageDetailTitle from "Parts/PageDetailTitle";
import FeaturedImage from "Parts/FeaturedImage";

import ItemDetails from "json/itemDetails.json";

export default class DetailsPage extends Component {
  componentDidMount() {
    window.title = "Details Page";
    window.scrollTo(0, 0);
  }

  render() {
    const breadcrumb = [
      { pageTitle: "Home", pageHref: "" },
      { pageTitle: "House Details", pageHref: "" },
    ];

    return (
      <>
        <Header {...this.props} />
        <PageDetailTitle breadcrumb={breadcrumb} data={ItemDetails} />
        <FeaturedImage data={ItemDetails.imageUrls} />
      </>
    );
  }
}
