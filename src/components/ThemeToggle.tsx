import { Moon, Sun } from '@phosphor-icons/react';
import { appearance } from '../content';
import { useTheme } from '../theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? appearance.switchToDay : appearance.switchToDark;
  const Icon = theme === 'dark' ? Sun : Moon;

  return <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label}>
    <Icon size={20} aria-hidden="true" />
  </button>;
}
