// LJNA 2714 website: named events for App Store, tester and map-pack taps.
// Each event carries its name and the app's name. Nothing else is added here.
import { analytics } from 'https://esm.sh/@heycatch/sdk@0.8.5';

const APP_STORE = {
  id6820149625: 'cctvcalc',
  id6829360235: 'cable-ledger',
  id6829903464: 'radius',
};
const PLAY_TESTING = {
  'com.ljna2714.cctvcalc': 'cctvcalc',
  'com.ljna2714.pullsheet': 'cable-ledger',
  'com.ljna2714.radius': 'radius',
};

function eventFor(link) {
  let url;
  try { url = new URL(link.href); } catch { return null; }
  const path = url.pathname;
  if (url.hostname === 'apps.apple.com') {
    if (url.searchParams.has('action')) return null; // "Rate it" links are not installs
    const id = path.split('/').pop();
    return APP_STORE[id] ? ['appstore_tap', APP_STORE[id]] : null;
  }
  if (url.hostname === 'play.google.com' && path.startsWith('/apps/testing/')) {
    const app = PLAY_TESTING[path.split('/')[3]];
    return app ? ['tester_tap', app] : null;
  }
  if (url.hostname === 'groups.google.com' && path === '/g/ljna2714-testers') {
    return ['tester_tap', 'tester-group'];
  }
  if (url.hostname === 'github.com' && path.startsWith('/ryanhudgeons/radius/releases/download/')) {
    return ['pack_download', 'radius'];
  }
  return null;
}

let last = '';
let lastAt = 0;

function onTap(e) {
  if (e.type === 'auxclick' && e.button !== 1) return; // middle click only
  const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
  if (!link) return;
  const ev = eventFor(link);
  if (!ev) return;
  const key = ev.join(':');
  const now = Date.now();
  if (key === last && now - lastAt < 2000) return; // one event per tap, not per double tap
  last = key;
  lastAt = now;
  try { analytics.trackEvent(ev[0], { app: ev[1] }); } catch { /* analytics blocked: do nothing */ }
}

document.addEventListener('click', onTap, true);
document.addEventListener('auxclick', onTap, true);
