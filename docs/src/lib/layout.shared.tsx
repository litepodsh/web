import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ThemeSwitch } from '@/components/theme-switch';
import { appName, gitConfig } from './shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: (
        <span className="flex items-center gap-2">
          <Image src="/icon.svg" alt="" width={24} height={24} className="rounded-md" />
          <span>{appName}</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    slots: {
      themeSwitch: ThemeSwitch,
    },
  };
}
