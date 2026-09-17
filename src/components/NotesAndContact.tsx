import React from 'react';
import Ornament from './Ornament';
import Star from './Star';
import { useI18n } from '../i18n';

const NotesAndContact: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="section scroll-reveal" style={{ paddingTop: '1.5rem' }}>
      <h3 className="section-title">{t.notesTitle}</h3>
      <Ornament />

      {/* Adults-only notice */}
      <div className="panel">
        <span className="panel-badge">
          <Star size={20} outlined />
        </span>
        <h4 className="note-title">{t.adultsTitle}</h4>
        <p className="note-text">{t.adultsLine1}</p>
        <p className="note-text">{t.adultsLine2}</p>
      </div>
    </section>
  );
};

export default NotesAndContact;
