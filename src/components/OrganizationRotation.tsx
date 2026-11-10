import { useState } from 'react';
import { Pause, Play } from '@phosphor-icons/react';
import { organizationRotation } from '../content';

export default function OrganizationRotation() {
  const [paused, setPaused] = useState(false);
  const label = paused ? organizationRotation.resume : organizationRotation.pause;
  const Icon = paused ? Play : Pause;

  return <div className="organization-rotation" data-paused={paused}>
    <div className="organization-window">
      <div className="organization-track" id="organization-track">
        {[false, true].map(duplicate => <ul
          className="organization-group"
          key={String(duplicate)}
          aria-label={duplicate ? undefined : organizationRotation.label}
          aria-hidden={duplicate || undefined}
        >
          {organizationRotation.organizations.map(organization => <li
            key={organization.name}
            className={`organization-logo organization-logo--${organization.style}`}
          >
            <img src={organization.logo} alt={duplicate ? '' : organization.name} draggable={false} />
          </li>)}
        </ul>)}
      </div>
    </div>
    <button
      className="icon-button organization-toggle"
      type="button"
      onClick={() => setPaused(value => !value)}
      aria-label={label}
      title={label}
      aria-controls="organization-track"
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  </div>;
}
