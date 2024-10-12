import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonPagination from './pages/ButtonPagination';
import ScrollPagination from './pages/ScrollPagination';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Updated Route definitions */}
        <Route path="/button-pagination" element={<ButtonPagination />} />
        <Route path="/scroll-pagination" element={<ScrollPagination />} />
        <Route path="/" element={<ButtonPagination />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
