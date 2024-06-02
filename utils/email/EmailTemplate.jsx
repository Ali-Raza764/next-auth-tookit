import * as React from 'react';

const EmailTemplate = ({ link }) => {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const buttonStyle = {
    display: 'inline-block',
    margin: '20px 0',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    textDecoration: 'none',
    borderRadius: '5px',
    textAlign: 'center',
  };

  const linkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
    wordBreak: 'break-all',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Verify Your Email</h1>
      <p style={{ textAlign: 'center' }}>
        Please click the button below to verify your email address.
      </p>
      <div style={{ textAlign: 'center' }}>
        <a href={link} style={buttonStyle}>
          Verify Email
        </a>
      </div>
      <p style={{ textAlign: 'center' }}>
        Or copy and paste this URL into your browser:
      </p>
      <p style={{ textAlign: 'center' }}>
        <a href={link} style={linkStyle}>{link}</a>
      </p>
    </div>
  );
};

export default EmailTemplate;
