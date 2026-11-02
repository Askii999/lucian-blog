'use client';
import {createContext,useContext,useEffect,useState} from 'react';
const MotionContext = createContext({ enabled: true, toggle: () => {} });
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('still-motion');
      } catch {}
      setEnabled(!media.matches && saved !== 'off');
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off';
  }, [enabled]);
  function toggle() {
    setEnabled((v) => {
      try {
        localStorage.setItem('still-motion', !v ? 'on' : 'off');
      } catch {}
      return !v;
    });
  }
  return (
    <MotionContext.Provider value={{ enabled, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
export function useMotion() {
  return useContext(MotionContext);
}
