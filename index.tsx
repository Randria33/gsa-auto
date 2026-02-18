
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ReservationSelfGarage from './pages/ReservationSelfGarage';
import TarifsLocationUtilitaire from './pages/TarifsLocationUtilitaire';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reservation-self-garage" element={<ReservationSelfGarage />} />
        <Route path="/tarifs-location-utilitaire" element={<TarifsLocationUtilitaire />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
