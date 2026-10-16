# DNS fix for zpdlearning.com email (16 Oct 2026)

DNS host: Cloudflare (MX = route1/2/3.mx.cloudflare.net, i.e. Cloudflare Email Routing for inbound).
Outbound mail goes via Zoho (smtp.zoho.com.au), but SPF doesn't authorise Zoho, and there's no DKIM or DMARC. Receivers can treat our mail as spoofed, which means spam folders and Zoho blocks.

Current (checked 16 Oct via Google DNS):

- TXT @ : `v=spf1 include:_spf.mx.cloudflare.net include:sendgrid.net ~all`
- TXT \_dmarc : (none)
- DKIM zmail.\_domainkey : (none)

## 1. SPF (edit the existing record, don't add a second one)

Cloudflare → zpdlearning.com → DNS → Records → edit the TXT on `@` that starts `v=spf1`:

```
v=spf1 include:_spf.mx.cloudflare.net include:zoho.com.au include:sendgrid.net ~all
```

(Only one SPF record is allowed. That's 3 includes, well under the 10-lookup limit.)

## 2. DKIM (Zoho)

1. Zoho Mail Admin Console (https://mailadmin.zoho.com.au) → Domains → zpdlearning.com → Email Configuration → DKIM → Add.
2. Selector: `zmail` (any name is fine). Zoho shows a TXT value starting `v=DKIM1; k=rsa; p=…`.
3. Cloudflare → add TXT, Name `zmail._domainkey`, Content = the full value from Zoho, Proxy n/a.
4. Back in Zoho click Verify, then make sure DKIM is set to Enabled.

## 3. DMARC (monitor first)

Cloudflare → add TXT:

- Name: `_dmarc`
- Content: `v=DMARC1; p=none; rua=mailto:grow@zpdlearning.com; adkim=r; aspf=r; pct=100`

After 2–4 weeks of clean reports, move to `p=quarantine`.

## 4. Verify

```
dig +short TXT zpdlearning.com
dig +short TXT zmail._domainkey.zpdlearning.com
dig +short TXT _dmarc.zpdlearning.com
```

Then send one email to a Gmail address → Show original → SPF, DKIM and DMARC should all say PASS.

Until this is done, keep cold sends low (≤150/week).
