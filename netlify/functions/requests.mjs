/* ===========================================================================
   Netlify Function: requests
   Staff view of every estimate request sent from the website (/requests).
   Same approach as Unified Wire's /forms page.

   Reads Netlify Forms through the Netlify API, so there is nothing to keep in
   sync by hand. The password is checked HERE, on the server: customer names,
   phone numbers and emails never reach the browser until it passes. (The
   "edrulz" gate on /internal pages is checked in the browser and sits in
   public JS, which is fine for drafts but not for customer details.)

   Required env vars (Netlify -> Site configuration -> Environment variables):
     REQUESTS_PASSWORD - password staff type to view requests
     NETLIFY_API_TOKEN - personal access token that can read this site's forms
                         (Netlify -> User settings -> Applications -> New access
                         token; mark both vars "secret")

   POST JSON body: { password }
     -> { ok, forms: [{ id, name, label, count,
                        fields: [{ name, title }],
                        submissions: [{ id, number, createdAt, values }] }] }
   =========================================================================== */

const SITE_ID = '5b74cc0d-e796-49a5-9b86-f2dc68d9c6e5';
const API = 'https://api.netlify.com/api/v1';

// Customer-facing forms shown on the page, in order. Anything internal
// (like Gary's prepay-choice form) is left out on purpose.
const SHOWN = { estimate: 'Estimate requests' };

// Netlify adds these to every submission; they're noise for staff
const HIDDEN = new Set(['ip', 'user_agent', 'referrer', 'bot-field', 'form-name']);

function json(status, obj) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

// Length-independent comparison so a wrong password can't be narrowed by timing
function pwMatches(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string') return false;
  given = given.trim();
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

async function api(path, token) {
  const res = await fetch(API + path, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Netlify API ${res.status} on ${path}`);
  return res.json();
}

// All verified (non-spam) submissions for one form, following pagination
async function allSubmissions(formId, token) {
  const out = [];
  for (let page = 1; page <= 50; page++) {
    const batch = await api(`/forms/${formId}/submissions?per_page=100&page=${page}`, token);
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

function shape(form, subs) {
  // Column order: the form's own field order. Union across submissions so a
  // field added later still appears.
  const fields = [];
  const seen = new Set();
  for (const s of subs) {
    for (const f of s.ordered_human_fields || []) {
      if (HIDDEN.has(f.name) || seen.has(f.name)) continue;
      seen.add(f.name);
      fields.push({ name: f.name, title: String(f.title || f.name).replace(/\s+/g, ' ').trim() });
    }
  }

  const submissions = subs.map((s) => {
    const d = s.data || {};
    const values = {};
    for (const { name } of fields) {
      const v = d[name];
      values[name] = v == null ? '' : Array.isArray(v) ? v.join(', ') : String(v);
    }
    return { id: s.id, number: s.number, createdAt: s.created_at, values };
  });
  submissions.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

  return {
    id: form.id,
    name: form.name,
    label: SHOWN[form.name],
    count: submissions.length,
    fields,
    submissions,
  };
}

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const expected = process.env.REQUESTS_PASSWORD;
  const token = process.env.NETLIFY_API_TOKEN;
  if (!expected || !token) {
    return json(500, { error: 'Not set up yet: REQUESTS_PASSWORD or NETLIFY_API_TOKEN is missing in Netlify.' });
  }

  let body;
  try { body = await req.json(); }
  catch { return json(400, { error: 'Invalid request.' }); }

  if (!pwMatches(body.password, expected)) {
    return json(401, { error: 'Incorrect password.' });
  }

  try {
    const all = await api(`/sites/${SITE_ID}/forms`, token);
    const order = Object.keys(SHOWN);
    const forms = all
      .filter((f) => SHOWN[f.name])
      .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    const out = await Promise.all(forms.map(async (f) => shape(f, await allSubmissions(f.id, token))));
    return json(200, { ok: true, forms: out, checkedAt: new Date().toISOString() });
  } catch (err) {
    console.error(err.message);
    return json(502, { error: "Couldn't read requests from Netlify. Try again in a minute." });
  }
};
