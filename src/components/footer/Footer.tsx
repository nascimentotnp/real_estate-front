import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { footer_items, FooterItem } from './Data';

class Footer extends Component {
  display_social_items = (): JSX.Element[] => {
    return footer_items
      .filter((item: FooterItem) => item.category === 'social')
      .map((item: FooterItem, index: number) => (
        <div className={`a footer-item-${index} mx-2 px-2 py-1 rounded-circle shadow-lg`} key={index}>
          <a className='text-center' href={item.link} target='_blank' rel="noreferrer">
            <i className={item.icon}></i>
          </a>
        </div>
      ));
  };

  display_internal_links = (): JSX.Element[] => {
    return footer_items
      .filter((item: FooterItem) => item.category === 'internal')
      .map((item: FooterItem, index: number) => (
        <div className={`footer-link-${index} mb-2`} key={index}>
          <Link className='text-center' to={item.link}>
            <i className={item.icon}></i>
            {item.name && <span className="ms-2">{item.name}</span>}
          </Link>
        </div>
      ));
  };

  render() {
    return (
      <div className='footer py-4'>
        <div className='container'>
          <div className='footer-top py-0 mb-0 d-flex justify-content-center'>
            {this.display_social_items()}
          </div>
          <div className='row text-start mb-2'>
            <div className='col'>
              {this.display_internal_links()}
            </div>
          </div>
          <div className='copyrights text-center'>
            <p className="small text-muted mb-0">
              &copy; Todos os direitos reservados. <Link to="/">DiTrento</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
