'use client';
import { useEffect, useState } from 'react';
import { useThemeStore, type Theme } from '@/lib/stores/themeStore';
import { useLocaleStore } from '@/lib/stores/localeStore';
export function ThemeToggle() {
  const {theme, setTheme} = useThemeStore();
  const zh = useLocaleStore(s => s.locale) === 'zh';
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? theme : 'system';
  const order: Theme[] = ['system', 'light', 'dark'];
  const next = order[(order.indexOf(current) + 1) % order.length];
  const labels = zh ? {system:'跟随系统',light:'浅色',dark:'深色'} : {system:'System',light:'Light',dark:'Dark'};
  return <button type="button" className="display-button theme-button" onClick={() => setTheme(next)} aria-label={zh ? `当前：${labels[current]}；切换到${labels[next]}` : `Theme: ${labels[current]}; switch to ${labels[next]}`} title={labels[current]}>
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="7"/><path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" stroke="none"/></svg>
  </button>;
}
