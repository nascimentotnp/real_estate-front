import React, { Component } from 'react';
import { flavors } from './Data';
import './Section.css';
import { NavLink } from 'react-router-dom';

// Define the type for the items in the section1 array
interface SectionItem {
  image: {
    default: string;
  };
  text: string;
}

class Section extends Component {
  display_section = () => {
    let items = flavors.map((item: SectionItem, index: number) => {
      return (
        <div className="b mb-5 text-center p-3 shadow rounded mx-2" key={index}>
          <img className="img-fluid mb-3" src={item.image.default} alt="course" />
          <p className="title">{item.text}</p>
          {/* <p className="title">{item.price}</p> */}
          <button className="btn btn-sm btn-outline-custom text-capitalize">
            Comprar <i className="ms-2 fas fa-chevron-right"></i>
            <NavLink
              className="nav-link text-capitalize position-relative hover"
              to={`/comprar`}
            ></NavLink>
            </button>
        </div>
      );
    });
    return items;
  };

  render() {
    return (
      <div className="s1 py-5">
        <div className="container">
          <div className="d d-flex flex-wrap justify-content-center">
            {this.display_section()}
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
