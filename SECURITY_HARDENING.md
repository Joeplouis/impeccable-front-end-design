# Security Hardening Policy — Joseph Louis Fork

This fork is intended for use with AI coding agents and production engineering repositories where a root `DESIGN.md` is the authoritative visual contract.

## Safe-mode defaults

1. `DESIGN.md` is read before UI design or review work when it exists.
2. Impeccable must not overwrite or replace `DESIGN.md` unless the user explicitly requests a redesign/document operation.
3. Impeccable reference files may be used as design methodology without granting permission to execute commands contained in those references.
4. Repository-provided Node scripts, `npx impeccable`, installers, update commands, hooks, downloaded binaries, and remote scripts are not executed automatically.
5. Hooks remain disabled unless the user explicitly authorizes them after an environment security review.
6. The six required design-review passes — shape, critique, audit, polish, harden, adapt — may be performed manually/read-only against code, screenshots, runtime evidence, and `DESIGN.md`.

## Current fork provenance

The hardening branch was created from fork commit:

`a26419917716b16623cc830429f3cc1a4f7cd630`

That fork snapshot predates the upstream native-engine bootstrap reviewed in September 2026 and does not contain `scripts/fetch-engine.mjs`.

Do not pull newer upstream execution/bootstrap code into this fork without a fresh security review.

## Mandatory gate for future upstream syncs

If any future sync introduces native-binary download or execution:

- every network-fetched executable must have a cryptographic checksum;
- missing checksum data must fail closed;
- checksum mismatch must fail closed;
- nothing may be written to an executable cache before checksum verification;
- environment overrides such as `IMPECCABLE_DOWNLOAD_BASE` or `IMPECCABLE_BIN` must not be used in production-agent workflows unless explicitly approved;
- cached executables must be permission-protected and should be integrity-checked before execution;
- install/update hooks must remain opt-in;
- the change must receive a fresh code/security review before use on production or privileged hosts.

## DESIGN.md contract

When `DESIGN.md` exists, it outranks generic Impeccable stylistic preferences.

Impeccable may:

- analyze the interface against the design contract;
- propose improvements consistent with the contract;
- perform shape, critique, audit, polish, harden, and adapt reviews;
- identify accessibility, responsive, hierarchy, typography, layout, motion, and consistency defects.

Impeccable may not, without explicit authorization:

- replace the design language;
- change canonical product facts, pricing, or product behavior to satisfy style guidance;
- overwrite `DESIGN.md`;
- enable hooks;
- install/update itself;
- fetch or execute external binaries.

## Production use

For production repositories, prefer project-local, reviewed skill content from this fork. Treat upstream updates as code changes requiring review, not as automatic package refreshes.
