import React from 'react';
import { MapPin } from 'lucide-react';
import Ornament from './Ornament';
import Star from './Star';
import { useI18n } from '../i18n';

const MAP_URL = 'https://maps.app.goo.gl/EgFCS3LL5qtsw3z6A';

const Location: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="section scroll-reveal">
      <h3 className="section-title">{t.locationTitle}</h3>
      <Ornament />

      <div className="panel">
        <span className="panel-badge">
          <Star size={20} outlined />
        </span>

        <p className="venue-name">{t.venue}</p>
        <p className="venue-city">{t.city}</p>

        <div className="panel-rule" />

        <p className="panel-when">
          {t.dateLine}
          <span>{t.timeLine}</span>
        </p>

        <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-wine btn-block">
          <MapPin size={18} />
          {t.mapButton}
        </a>
      </div>
    </section>
  );
};

export default Location;
