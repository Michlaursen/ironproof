import Script from "next/script";

/*
 * Microsoft Clarity — heatmaps + session recordings.
 * Renders nothing unless NEXT_PUBLIC_CLARITY_PROJECT_ID is set, so local dev
 * and preview branches stay silent. The inline body is Clarity's official
 * bootstrap; it queues calls until the tag script loads.
 */
export function Clarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!id || !/^[a-z0-9]+$/i.test(id)) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${id}");`}
    </Script>
  );
}
