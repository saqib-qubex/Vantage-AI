/* ------------------------------------------------------------------
   VantageAI · Meta pixel and conversion events
   Dataset: VantageAI Website · Pixel ID 1109217551779890
   Add to every page: <script src="/js/meta-pixel.js" defer></script>

   PRIVACY RULE, do not break this:
   Never pass anything about a patient, a condition, a chart, a call
   transcript or a practice's clinical data into an fbq() call. This file
   may only ever describe marketing site behaviour. Meta disables
   datasets that receive health information, and the HIPAA exposure is
   considerably worse than losing an ad account.
------------------------------------------------------------------ */

(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  t = b.createElement(e); t.async = true; t.src = v;
  s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '1109217551779890');
fbq('track', 'PageView');

document.addEventListener('DOMContentLoaded', function () {
  var path = (location.pathname || '').toLowerCase();

  /* Pricing page view counts as product consideration. This is the event
     that feeds the warm retargeting audience, so it matters more than it
     looks. */
  if (path.indexOf('pricing') !== -1) {
    fbq('track', 'ViewContent', {
      content_name: 'pricing',
      content_category: 'plans'
    });
  }

  /* Checkout page reached */
  if (path.indexOf('checkout') !== -1) {
    fbq('track', 'InitiateCheckout');
  }

  /* Trial or thank you confirmation */
  if (/thank|welcome|trial|confirmed|success/.test(path)) {
    fbq('track', 'StartTrial', { currency: 'USD', value: 0 });
  }

  /* Primary calls to action. Matched on visible text because the buttons
     do not currently carry stable ids or hrefs. If you later add
     id="cta-get-started" and friends, switch this to querySelector on the
     ids, it will be more reliable. */
  var CTA = /^(get started|get started free|start free trial|talk to sales|book a demo|request a demo|contact us|see how it works)$/;

  document.querySelectorAll('a, button').forEach(function (el) {
    var label = (el.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
    if (!CTA.test(label)) return;

    el.addEventListener('click', function () {
      fbq('track', 'Lead', { content_name: label.slice(0, 40) });
    }, { passive: true });
  });
});
