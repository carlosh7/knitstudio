# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.x     | ✅ Security updates |

## Reporting a Vulnerability

Email: **security@knitstudio.io**  
Response Time: **<48h**  
Resolution Target: **<7 days for CRITICAL**

PGP Key: Available at https://knitstudio.io/.well-known/pgp-key.txt

## Responsible Disclosure

Please **do not file public issues** for security vulnerabilities.  
Use the email above. We'll acknowledge within 48 hours.

## Security Measures Implemented

| # | Measure | Status |
|---|---------|--------|
| 1 | DOMPurify HTML sanitization in canvas | ✅ v0.4.0 |
| 2 | origin validation in postMessage bridge | ✅ v0.4.0 |
| 3 | JWT authentication + RBAC | ✅ v0.4.0 |
| 4 | Keystore (AES-256-GCM) for secrets | ✅ v0.4.0 |
| 5 | Rate limiting (global + auth) | ✅ v0.4.0 |
| 6 | Helmet security headers + CSP | ✅ v0.4.0 |
| 7 | bcrypt password hashing (12 rounds) | ✅ v0.4.0 |
| 8 | CSRF origin validation | ✅ v0.4.0 |
| 9 | Audit logs | 🔲 Planned (Fase 2) |
| 10 | Strict CSP | 🔲 Planned (Fase 2) |

## Bug Bounty

We operate a private bug bounty program.  
Researchers can request access by emailing security@knitstudio.io.

## Disclosure Timeline

- Report received → acknowledgment within 48h
- Valid issue → fix within 7 days (CRITICAL) or 30 days (standard)
- Public disclosure → 30 days after fix release
