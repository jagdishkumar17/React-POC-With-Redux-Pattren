import React, { Component } from "react";
import "../../styles/spinner.css";

export class Spinner extends Component {

  render() {
    return (
      <div>
    
      <div className= { (this.props.isLoading === true ? "cover-spin displayBlock" : "displayNone")} />
        <div className= { (this.props.isLoading === true ? "spinner m-t-20 displayBlock" : "displayNone")}> 

        {/* <div className= "cover-spin displayBlock" />
        <div className= "spinner m-t-20 displayBlock" > */}
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </div>
        </div>
    );
  }
}

export default Spinner;
