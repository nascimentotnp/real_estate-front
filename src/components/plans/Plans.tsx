import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import Section from './sections/section1/Section';
import './Plans.css';

// Define the type for the state array items
interface PathItem {
  path: string;
//   number: number;
}

// Define the type for the component state
interface PlansState {
  array: PathItem[];
}

class Plans extends Component<{}, PlansState> {
  state: PlansState = {
    array: [
      {
        path: '/courses/',
        // number: 1
      }
    ]
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="title py-3 text-center">
            <h4 className="sub-title text-capitalize">Escolha o seu <span>Sabor</span></h4>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Section />} />
        </Routes>
      </>
    );
  }
}

export default Plans;
