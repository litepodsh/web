"use client";

import { cn } from '@/lib/cn';
import { flushSync } from 'react-dom';
import { useSyncExternalStore } from 'react';
import { Airplay, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeSwitchProps = {
  mode?: 'light-dark' | 'light-dark-system';
} & React.ComponentProps<'div'>;

const themes = [
  ['light', Sun],
  ['dark', Moon],
  ['system', Airplay],
] as const;

export function ThemeSwitch({ className, mode = 'light-dark', ...props }: ThemeSwitchProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleThemeChange = (newTheme: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const start = document.startViewTransition?.bind(document);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!start || reduceMotion) {
      setTheme(newTheme);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = start(() => flushSync(() => setTheme(newTheme)));

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  const container = cn(
    'inline-flex items-center rounded-full border p-1 overflow-hidden *:rounded-full',
    className,
  );

  if (mode === 'light-dark') {
    const value = mounted ? resolvedTheme : null;
    return (
      <button
        type="button"
        className={container}
        aria-label="Toggle Theme"
        onClick={(event) => handleThemeChange(value === 'light' ? 'dark' : 'light', event)}
        data-theme-toggle=""
      >
        {themes.map(([key, Icon]) => {
          if (key === 'system') return null;
          return (
            <Icon
              key={key}
              fill="currentColor"
              className={cn(
                'size-6.5 p-1.5',
                value === key
                  ? 'bg-fd-accent text-fd-accent-foreground'
                  : 'text-fd-muted-foreground',
              )}
            />
          );
        })}
      </button>
    );
  }

  const value = mounted ? theme : null;
  const active = 'bg-fd-accent text-fd-accent-foreground';
  const idle = 'text-fd-muted-foreground';

  return (
    <div className={container} data-theme-toggle="" {...props}>
      <button
        type="button"
        aria-label="Light"
        className={cn('size-6.5 p-1.5', value === 'light' ? active : idle)}
        onClick={(event) => handleThemeChange('light', event)}
      >
        <Sun className="size-full" fill="currentColor" />
      </button>
      <button
        type="button"
        aria-label="Dark"
        className={cn('size-6.5 p-1.5', value === 'dark' ? active : idle)}
        onClick={(event) => handleThemeChange('dark', event)}
      >
        <Moon className="size-full" fill="currentColor" />
      </button>
      <button
        type="button"
        aria-label="System"
        className={cn('size-6.5 p-1.5', value === 'system' ? active : idle)}
        onClick={(event) => handleThemeChange('system', event)}
      >
        <Airplay className="size-full" fill="currentColor" />
      </button>
    </div>
  );
}