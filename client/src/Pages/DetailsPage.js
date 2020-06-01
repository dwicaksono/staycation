import React, { Component } from "react";
// import Fade from "react-reveal/Fade";

import Header from "Parts/Header";
import PageDetailTitle from "Parts/PageDetailTitle";
import FeaturedImage from "Parts/FeaturedImage";
import PageDetailDescription from "Parts/PageDetailDescription";
import BookingForm from "Parts/BookingForm";
import Categories from "Parts/Categories";

import ItemDetails from "json/itemDetails.json";
import Testimony from "Parts/Testimony";
import Footer from "Parts/Footer";

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
        <section className="container">
          <div className="row">
            <div className="col-7 pr-5">
              <PageDetailDescription data={ItemDetails} />
            </div>
            <div className="col-5">
              <BookingForm itemDetails={ItemDetails} />
            </div>
          </div>
        </section>
        <Categories data={ItemDetails.categories} />
        <Testimony data={ItemDetails.testimonial} />
        <Footer />
      </>
    );
  }
}
