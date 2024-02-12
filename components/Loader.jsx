import React from 'react'

const Loader = ({ size = 20, color = "white" }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTopColor: color,
    borderLeftColor: color,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent'
  };

  return (
    <div
      className="flex justify-center items-center"
    >
      <div className="border-2 rounded-full animate-spin" style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;