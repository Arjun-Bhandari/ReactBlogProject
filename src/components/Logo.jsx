import React from 'react';

function Logo({ width = "100%" }) {
    return (
        <img src="/logo.png" style={{ width: width }} alt="Logo" />
    );
}

export default Logo;


