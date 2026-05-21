# Third Party Licenses — knitstudio

knitstudio is licensed under MIT. This document lists the licenses of all third-party dependencies.

## Direct Dependencies (Builder)

| Dependency | License | Notes |
|------------|---------|-------|
| React 19 | MIT | Compatible |
| React DOM | MIT | Compatible |
| Vite | MIT | Compatible |
| TypeScript | Apache 2.0 | Compatible. Requires retaining copyright notice |
| GrapesJS | BSD-3-Clause | Compatible. Contains non-endorsement clause |
| React Flow | MIT | Compatible |
| @modelcontextprotocol/sdk | MIT | Compatible |
| Docusaurus 3 | MIT | Compatible |
| Shepherd.js | MIT | Compatible |
| react-intl | MIT | Compatible |
| i18next | MIT | Compatible |

## Direct Dependencies (API)

| Dependency | License | Notes |
|------------|---------|-------|
| Express | MIT | Compatible |
| better-sqlite3 | MIT | Compatible |
| pg (PostgreSQL) | MIT | Compatible |
| ioredis | MIT | Compatible |
| jsonwebtoken | MIT | Compatible |
| bcryptjs | MIT | Compatible |
| helmet | MIT | Compatible |
| cors | MIT | Compatible |
| express-rate-limit | MIT | Compatible |

## Critical Security Dependencies

| Dependency | License | Selected Variant | Notes |
|------------|---------|:----------------:|-------|
| DOMPurify | **Dual: Apache 2.0 / MPL 2.0** | **Apache 2.0** | Declared explicitly under Apache 2.0 to avoid MPL copyleft obligations |

## Runtime (Embeddable)

| Dependency | License | Notes |
|------------|---------|-------|
| None | — | Runtime is pure vanilla JS with zero dependencies |

## License Compatibility Summary

All dependencies are compatible with MIT license. No GPL dependencies are used.

## Required Attribution

### MIT License
The MIT License requires preserving the copyright notice and permission notice. This applies to all MIT-licensed dependencies listed above.

### Apache 2.0 (TypeScript, DOMPurify)
Apache 2.0 requires:
- Retaining the copyright notice
- Stating significant changes made to the software
- NOTICE file if applicable

### BSD-3-Clause (GrapesJS)
BSD-3-Clause requires:
- Retaining the copyright notice
- Including the non-endorsement clause

## License Text

Full license texts for each dependency are available in their respective repositories:

- React: https://github.com/facebook/react/blob/main/LICENSE
- GrapesJS: https://github.com/GrapesJS/grapesjs/blob/master/LICENSE
- React Flow: https://github.com/xyflow/xyflow/blob/main/LICENSE
- TypeScript: https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt
- DOMPurify: https://github.com/cure53/DOMPurify/blob/main/LICENSE
- Express: https://github.com/expressjs/express/blob/master/LICENSE
- Docusaurus: https://github.com/facebook/docusaurus/blob/main/LICENSE
