import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Section from './sections/section1/Section';
import AuthService from '../../services/auth.service'; 
import './Plans.css';

interface PlansState {
  isAuthenticated: boolean;
}

class Plans extends Component<{}, PlansState> {
  state: PlansState = {
    isAuthenticated: AuthService.getCurrentUser() !== null, 
  };

  render() {
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return (
      <>
        <div className="container">
          <div className="title py-5 text-center">
            <h4 className="sub-title py-5 text-capitalize">Escolha o seu <span>Sabor</span></h4>
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
