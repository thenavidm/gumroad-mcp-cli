# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.20. The 57 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A person approves each confirmed operation over MCP.** All 32 still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `GUMROAD_CONFIRM=model` makes it enough everywhere. The refusal and the approval form both say what 2.0 said, that the call may change billing, refund payments, alter licenses/webhooks or save private commerce files, and the audit log records who approved each one.
- **`GUMROAD_ALLOW_DESTRUCTIVE=0` still refuses all 32**, confirmed or not, and `GUMROAD_READ_ONLY=1` still leaves only the 25 reads.
- **Gumroad's status picks the exit code.** A request Gumroad rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that refunds a sale and its flags took a median of 82,764 input tokens over the CLI instead of 104,433 (five runs each): four 2.0.1 runs tried `schema` without a command, then read the command list and the command's help, and one guessed the name and read its help straight away (61,526). Four 3.0.0 runs asked `which refund`, which fits refunding a sale and the two refund policy commands alike, so it lists them, and read the command's help next; the fifth asked `which refund sale`, whose answer carries the help, and stopped there (61,842).
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`gumroad-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **The tool list marks the 32 tools that need approval.** Each carries `anthropic/requiresUserInteraction`, which Claude Code reads and does not pass to the model, and prices and counts no longer advertise JavaScript's safe-integer bounds, so the list a client receives is 17,032 o200k tokens instead of 16,813. With every tool loaded, Claude Code 2.1.286 spends 22,128 tokens a message on the list instead of 22,424.
- **Less work to start.** Each input and body schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 179 ms of CPU before its first answer where 2.0.1 spent 251, and answers in 132 ms of wall time instead of 155 (median of 21 runs, taking turns on one Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **`doctor --network` reads the seller's user**, as 2.0's did.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending, and the exit codes say what 2 covers.

### Upgrading

Over MCP, expect an approval prompt or form before any confirmed operation; a headless agent that should run them with `confirm: true` alone needs `GUMROAD_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error is now one JSON object with `error`, Slipway's `code` (`usage`, `refused`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`) and a `hint`, plus Gumroad's `status` when it answered; 2.0.1 printed the tool's JSON inside the `error` string. Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `GUMROAD_READ_ONLY=1`, a client that calls a hidden tool gets "tool not found" instead of a refusal naming `GUMROAD_READ_ONLY`, and that call is not in the audit log; the CLI still names the setting. The audit log's lines gain `confirmed_by`, and each allowed call is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `GUMROAD_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 138 tokens, for `which`, `install`, what each setting is for and the exit codes; the command list by 16; and a missing argument's error by 14, for its code and a hint. Over MCP, Codex prints only the start and the end of a tool list this long, 40,145 characters on both sides, and 3.0.0's kept part takes a few more tokens to say, so a discovery task read a median of 76,542 input tokens instead of 76,448. `SKILL.md` is 64 tokens longer in Claude Code, because it says how approval works over MCP, and that exit 1 is an unexpected error and 2 also an unknown command or a hidden write.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/gumroad-mcp-cli` always starts the MCP server.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order, so an MCP client set up with this README's install line could get `gumroad-cli` and its command list instead of a server. A third binary named after the package now always starts the server, and npx picks it by name.

## 2.0.0 — 2026-10-03

- Modernize private 1.0.0 MCP into scoped shared TypeScript CLI/local MCP and desktop bundle; preserve all 34 legacy names with corrected current major argument contracts.
- Add explicit per-call confirmation for all 32 effects and direct read-only refusal. Agent output flags do not grant approval.
- Correct Bearer seller transport, current product_id and private license settings; verification explicitly transmits false, while counter increment is a distinct confirmed effect.
- Correct native PUT webhooks, subscriber pagination, opaque ID padding and custom-field compatibility reads. Reject guessed/unsupported fields.
- Add current sales effects, payouts, refund policy, variant tasks, exact reviewed batches and bounded private cursor exports with partial-page continuation.
- Deliver rotated-license receipt only in a new private file. No automatic retry, transaction, rollback or token-saving claim.
- Include full current tool/client/OS/private setup, official/community comparison, FAQs, version history and matching navid.me guide. Publication and runtime acceptance evidence are recorded separately.

## 1.0.0 — preserved private legacy

Original34-tool Gumroad MCP. Its intact source history remains private. Version 2 changes setup/arguments/approval behavior; consult the migration table instead of using old snippets.
