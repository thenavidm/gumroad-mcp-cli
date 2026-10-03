# Security

Private seller/license credentials remain in local environment or owner-private files; never send them or customer data in public issues. Use [GitHub private reporting](https://github.com/thenavidm/gumroad-mcp-cli/security/advisories/new).

Known configured credentials, license_key fields, signed credential URLs and sensitive download/content fields are redacted from ordinary output/errors. Other customer/sale/subscriber/payout fields remain private data and are not anonymized. Do not paste them into public issues, screenshots or unrelated agent context. Raw rotated-license receipts are intentionally saved only in a requested new owner-private file.

The package has no telemetry, browser-cookie import, arbitrary host or digital-file download. Returned HTML, customer text and URLs are untrusted data. Optional best-effort audit logs record static guard decisions, not credentials/arguments, and are not verified settlement ledgers. Removing the package does not revoke credentials, refund a payment, restore a deleted product, cancel webhooks or delete private exports.


All 32 native/local effects require explicit confirm. GUMROAD_READ_ONLY=1 hides them and directly refuses hidden confirmed calls through the actual server handler. GUMROAD_ALLOW_DESTRUCTIVE=0 refuses them even with confirm. --agent and --yes affect output/prompt formatting only, never approval. The same guard protects CLI and MCP, including counter changes, receipts, product publication, refunds and private export file writes.

Native authorization remains with Gumroad. A local profile, filter, confirmation or request-review hash does not prove seller ownership, customer consent, entitlement or financial correctness. No automatic retry, redirects or guessed continuation is allowed. A failure after a write can mean an unknown outcome; investigate before deliberately repeating. Default pacing is 1,000ms/request with 30,000ms timeout, 1 MiB request and 5 MiB response caps. Other processes share provider quotas; this is conservative local pacing, not a global rate-limit guarantee.

