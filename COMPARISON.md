# Current Gumroad tooling comparison

Checked October 3, 2026.

### Official tooling already covers CLI and MCP

Gumroad's official [CLI](https://github.com/antiwork/gumroad-cli) and local gumroad mcp exist, as does the hosted OAuth MCP advertised through [Gumroad discovery](https://gumroad.com/.well-known/mcp.json). Our comparison pins official release 2026.10.02 and source 7c202ea43c47b66b46e633b4e2c8d69376372ff2. The actual checksum-verified release exposes 105 local tools; this is protocol discovery, not 105 individually completed provider tasks. Hosted anonymous discovery was verified separately; authenticated account discovery/financial outcomes were not tested.

Official CLI strengths include device/browser OAuth, JSON/jq/plain output, native pagination, sales summaries, currency-aware refunds, dry-run previews and explicit CLI confirmations. Marketing workflows already use reviewed confirmation tokens. The pinned local MCP source auto-approves most other CLI confirmations and delegates action approval to its client. That observation does not prove hosted clients lack human consent or that our wrapper is universally safer.

### Community alternatives

[Printing Press Library's Gumroad implementation](https://github.com/mvanhorn/printing-press-library/tree/25e0fe5b284266a153938b3f3aa8cd7a0a8084b1/library/commerce/gumroad), declared 2026.9.1, already offers dedicated CLI/local MCP/desktop packaging, SQLite sync/search/analytics, monitoring, output selection and dry-run behavior. Its source declares 52 native tools. The reviewed --agent implies --yes and its license handler omits false on the wire despite defaulting its increment setting to false; native omission increments. These are pinned source observations, not authenticated competitor tests. No runtime/financial superiority is claimed.

[rmarescu/gumroad-mcp](https://github.com/rmarescu/gumroad-mcp/tree/657d05e41d9cea07ba88f0eddd3c182597a77d00) declares 11 tools in reviewed source. Its runtime is not verified here. Generic MCP-to-terminal clients remain legitimate alternatives; a dedicated task binary alone is not proof that ours is better.

### Why build this companion

Use ours when consistent mandatory per-call guards across CLI/MCP, isolated private seller/license profiles, explicitly non-incrementing verification, exact locally reviewed effects and bounded private exports fit your work. Use official tools for their broader CLI/OAuth/native feature coverage or community tooling for its SQLite/analytics/monitoring capabilities. This is a selected commerce companion, not full parity with the official 105 tools or all 81 documented native endpoints. It does not implement admin, marketing, media, file-upload, hosted OAuth or custom storefront HTML actions.

| Capability | Our companion | Existing alternatives |
| --- | --- | --- |
| Surfaces | Shared task CLI/local MCP/desktop bundle | Official CLI/local MCP/hosted OAuth MCP already exist |
| Native scope | 51 reviewed native tool contracts/50 distinct routes, plus 6 compatibility/local helpers | Official local MCP 105 discovered tools; broader scopes differ |
| Approval | 32 effects require explicit per-call confirmation and direct read-only enforcement | Official CLI confirmations/marketing review tokens; local MCP delegates most approvals to client |
| Private accounts | Named isolated seller/license credentials, no fallback | Official OAuth and community credentials already exist |
| License reads | Explicit false transmitted; increment is separate confirmed effect | Compare the actual on-wire behavior, not just a default flag |
| Review | Ordered requests/profile label/snapshot hash, stop first failure | No transaction, credential/state lock, expiry or single use |
| Export | Cursor/page/item/byte budgets; private file and resume offset | Official pagination and community SQLite sync already exist |
| Token costs | Equivalent completed Codex tasks unmeasured | No schema-count, character estimate or borrowed benchmark |

Client loading mode matters: MCP may load full schemas, defer discovery or select tools. CLI also needs help/schema discovery, execution and model-readable output. --agent emits compact JSON; --select can narrow returned fields without changing the requested native call. These formatting options do not establish fewer tokens for a successful equivalent task.

Codex is the current priority. Matched completed provider-task/token measurements remain pending: record client/model/package versions, checked date, actual loading mode, equivalent requested outcomes, API input/output/cache usage and latency. Do not substitute tool counts, character-based estimates, protocol discovery or another integration's results. Claude Code benchmarks remain deferred. This release claims verified contracts and local behavior, not measured task-token savings.

