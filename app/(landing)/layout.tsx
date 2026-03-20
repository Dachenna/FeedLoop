import React from 'react';
import { Navbar } from '../../components/web/navbar';

function Landing({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Landing;
