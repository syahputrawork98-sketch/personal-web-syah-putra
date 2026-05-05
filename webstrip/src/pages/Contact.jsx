import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { getPublicContact } from '../lib/api';
import EmptyState from '../components/EmptyState';
import '../styles/contact.css';


const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getPublicContact();
        if (data.contact) {
          setContactData(data.contact);
        }
      } catch (err) {
        console.warn('Contact: Failed to fetch contact info:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  if (loading) {
    return (
      <section id="contact" className="section-padding flex-center" style={{ minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <p style={{ opacity: 0.6, fontSize: '1rem', textAlign: 'center' }}>Memuat data kontak...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className="section-padding flex-center" style={{ minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <EmptyState message="Gagal memuat data kontak." />
        </div>
      </section>
    );
  }

  if (!contactData) {
    return (
      <section id="contact" className="section-padding flex-center" style={{ minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 className="text-center">Hubungi Saya</h2>
          <EmptyState message="Data kontak belum tersedia." />
        </div>
      </section>
    );
  }

  const currentContact = contactData || {};

  const contactItems = [
    {
      id: 'email',
      icon: <FiMail />,
      label: 'Email',
      value: currentContact.email,
      url: currentContact.email ? `mailto:${currentContact.email}` : null
    },
    {
      id: 'phone',
      icon: <FiPhone />,
      label: 'Telepon / WhatsApp',
      value: currentContact.whatsapp || currentContact.phone || (loading ? '...' : null),
      url: currentContact.whatsapp && typeof currentContact.whatsapp === 'string' 
        ? `https://wa.me/${currentContact.whatsapp.replace(/\D/g, '')}` 
        : null
    },
    {
      id: 'location',
      icon: <FiMapPin />,
      label: 'Lokasi',
      value: currentContact.location,
      url: null
    },
    {
      id: 'linkedin',
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: currentContact.linkedin ? 'Profil LinkedIn' : null,
      url: currentContact.linkedin
    },
    {
      id: 'github',
      icon: <FaGithub />,
      label: 'GitHub',
      value: currentContact.github ? 'Profil GitHub' : null,
      url: currentContact.github
    },
    {
      id: 'instagram',
      icon: <FaInstagram />,
      label: 'Instagram',
      value: currentContact.instagram ? 'Profil Instagram' : null,
      url: currentContact.instagram
    }
  ].filter(item => item.value);


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
          <h2 className="text-center">{currentContact.title || 'Hubungi Saya'}</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>{currentContact.description || 'Punya ide atau peluang kerja? Saya siap mendiskusikannya dengan Anda.'}</p>
          {loading && <p style={{ opacity: 0.6, marginTop: 'var(--space-2)' }}>Memuat data...</p>}
        </motion.div>

        {contactItems.length > 0 && (
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
        )}
        
        <motion.div 
          style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
            &copy; 2026 Syah Putra Nugraha. Dibangun dengan Presisi.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
