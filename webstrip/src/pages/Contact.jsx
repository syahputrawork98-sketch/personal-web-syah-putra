import React, { useState, useEffect } from 'react';
import { useI18n } from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { getPublicContact } from '../lib/api';
import { CONTACT_FALLBACK } from '../data/fallbacks';
import '../styles/contact.css';

const Contact = () => {
  const { t } = useI18n();
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getPublicContact();
        if (data.contact) {
          setContactData(data.contact);
        }
      } catch (err) {
        console.warn('Contact: Failed to fetch contact info:', err.message);
      }
    };
    fetchContact();
  }, []);

  const currentContact = contactData || CONTACT_FALLBACK;

  const contactItems = [
    {
      id: 'email',
      icon: <FiMail />,
      label: 'Email',
      value: currentContact.email,
      url: `mailto:${currentContact.email}`
    },
    {
      id: 'phone',
      icon: <FiPhone />,
      label: 'Phone / WhatsApp',
      value: currentContact.whatsapp || currentContact.phone || '+62...',
      url: currentContact.whatsapp ? `https://wa.me/${currentContact.whatsapp.replace(/\D/g, '')}` : null
    },
    {
      id: 'location',
      icon: <FiMapPin />,
      label: 'Location',
      value: currentContact.location,
      url: null
    },
    {
      id: 'linkedin',
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'Syah Putra Nugraha',
      url: currentContact.linkedin || 'https://linkedin.com/in/syahputranugraha'
    },
    {
      id: 'github',
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'syahputranugraha',
      url: currentContact.github
    },
    {
      id: 'instagram',
      icon: <FaInstagram />,
      label: 'Instagram',
      value: '@syah_putra_n',
      url: currentContact.instagram
    }
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="section-padding flex-center" style={{ minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <motion.div 
          style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center">{t('contact.title')}</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div 
          className="card" 
          style={{ padding: 'var(--space-6)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {contactItems.map((item) => (
              <motion.div 
                key={item.id} 
                className="contact-info-item"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="contact-icon-wrapper">
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6, marginBottom: '2px' }}>
                    {item.label}
                  </p>
                  {item.url ? (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-link"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
            {t('footer.copy')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
