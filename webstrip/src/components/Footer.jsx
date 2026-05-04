import React from 'react';

const Footer = ({ t }) => {
  return (
    <footer style={{ padding: 'var(--space-6) 0', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
      <div className="container">
        <p dangerouslySetInnerHTML={{ __html: t('footer.copy') }}></p>
      </div>
    </footer>
  );
};

export default Footer;
