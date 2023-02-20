import { load, trackPageview } from 'fathom-client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type UseFathomParams = Parameters<typeof load>;

export function useFathom(...[siteId, options]: UseFathomParams) {
  const { events } = useRouter();

  useEffect(() => {
    load(siteId, options);

    events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [events]);
}

function onRouteChangeComplete(pathname: string) {
  trackPageview({
    url: `${location.protocol}//${location.hostname}${pathname}`,
  });
}
