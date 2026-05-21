# knitstudio — Community Plan

## GitHub Setup

```
README.md:
  • Badges: build status, license, stars, contributors, Discord
  • Qué es knitstudio (1 párrafo + screenshot)
  • Features clave (checklist visual)
  • Quick start: 1 comando para empezar
  • Roadmap link
  • Contributing link
  • Sponsors

Issue Templates:
  • bug_report.md → versión, OS, browser, steps to reproduce, expected vs actual
  • feature_request.md → problema que resuelve, solución propuesta, alternativas
  • question.md → contexto, qué se intentó, documentación revisada

PR Template:
  • Qué cambia
  • Por qué
  • Screenshots (si aplica)
  • Tests realizados
  • Issues relacionados
```

## Communication

- **GitHub Discussions** — para preguntas, ideas, show & tell
- **Discord** — canales: #general, #builder, #runtime, #components, #docs, #contributors, #showcase
- **No Slack** — Discord es más abierto para OSS

## Governance

| Fase | Modelo | Duración |
|------|--------|:--------:|
| 0-12 meses | BDFL (carlosh7) + maintainers | Fundación |
| 12+ meses | TSC (Technical Steering Committee) | Meritocracia |

Roles: **Maintainer** (commit access) → **Contributor** (PRs regulares) → **Community Member** (issues, docs, tests)

## Release Strategy

- **Versionado:** Semver (X.Y.Z)
- **Cadencia:** Cada 4-6 semanas
- **Canales:** Nightly (main) → Beta (release candidate) → Stable (tagged) → LTS (cada 6 meses)
- **Changelog:** Keep a Changelog format con changesets

## License

**MIT** — Permisiva, permite uso comercial, modificación, redistribución.
Cualquiera puede:
- Usarlo en proyectos comerciales
- Modificarlo y venderlo
- Crear productos derivados
- Revenderlo como SaaS

## Modelo de Negocio

knitstudio opera en **dos modalidades** que comparten el mismo código:

| Modalidad | Licencia | Monetización |
|-----------|:--------:|--------------|
| **Self-hosted** | MIT (gratis) | El usuario paga su propio servidor y APIs. Nosotros ganamos: sponsorships, consulting, enterprise support |
| **Cloud** (knitstudio.io) | SaaS | Freemium: Free (3 proyectos, 100 AI req/mes) → Pro ($29/mes, 50 proyectos, 10k AI req) → Enterprise (custom) |

**El self-hosted no es una versión limitada.** Es el código completo. La diferencia es:
1. Self-hosted: el usuario trae sus API keys (OpenAI, Stripe, etc)
2. Cloud: nosotros proveemos las APIs (incluidas en la suscripción)
3. Cloud tiene multi-tenant, self-hosted no (es single-instance)

Esto asegura que:
- **Profesionales y empresas** pueden tener privacidad total de datos
- **Amateurs** pueden usar la versión cloud sin configurar nada
- **No hay vendor lock-in:** si dejas de pagar el cloud, migras a self-hosted
