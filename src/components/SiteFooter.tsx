import React from 'react';

/** Faint technical-blueprint linework behind the credit, as in the brand mark. */
const Blueprint: React.FC = () => (
  <svg
    className="kf-blueprint"
    viewBox="0 0 720 90"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <g fill="none" stroke="var(--primary)" strokeOpacity="0.07" strokeWidth="1">
      {/* Vertical construction guides */}
      <path d="M96 0V90M232 0V90M360 0V90M488 0V90M624 0V90" />
      {/* Horizontal baselines */}
      <path d="M0 26H720M0 64H720" />
      {/* Large circular construction arcs */}
      <circle cx="140" cy="45" r="66" />
      <circle cx="580" cy="45" r="66" />
      {/* Centre letterform scaffold */}
      <path d="M360 10L326 80M360 10L394 80M338 58H382" />
      {/* Outer rounded frame */}
      <rect x="150" y="25" width="420" height="40" rx="20" />
    </g>
  </svg>
);

const SiteFooter: React.FC = () => (
  <a
    className="kf-footer"
    href="https://keyframeglobal.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Blueprint />
    <span className="kf-pill">
      <span className="kf-muted">Crafted with</span>
      <span className="kf-heart" aria-hidden="true">&#10084;</span>
      <span className="kf-muted">by</span>
      <span className="kf-brand">Keyframe Global</span>
    </span>
  </a>
);

export default SiteFooter;
