# Install Gumroad MCP Server & CLI

One package, 57 shared tasks, two binaries and bundled desktop extension. Node 22+ is required.

## Requirements

Install [Node](https://nodejs.org/en/download) and check node --version/npm --version in the actual client runtime. Windows may require npm.cmd when execution policy blocks npm.ps1. No sudo or policy weakening is needed.

## CLI

~~~bash
npm install -g @thenavidm/gumroad-mcp-cli@latest
gumroad-cli --version
gumroad-cli tools
gumroad-cli login
~~~

Alternatively use npx -y --package @thenavidm/gumroad-mcp-cli@latest gumroad-cli tools. Make shipped SKILL.md available in your supported private agent skill directory; npm does not automatically register it.

## Private credential setup

### Seller authentication and independent license credentials

1. Sign into the intended [Gumroad seller account](https://gumroad.com/settings/advanced). Use the application form/access-token controls in advanced settings, or an application OAuth authorization with only the scopes your task needs. The [current API](https://gumroad.com/api) accepts Bearer tokens; this package sends seller tokens in the Authorization header, not an access_token URL. It does not implement the official CLI's interactive device/browser OAuth login.
2. Configure exactly one private GUMROAD_ACCESS_TOKEN or GUMROAD_TOKEN_FILE. Use an absolute owner-private token-only file outside the repository. Tokens represent a particular seller and permission set; a profile name does not grant scopes or establish account ownership. Never copy an admin token into the seller-token setting.
3. License verification needs the customer's license credential and current native product_id, without seller OAuth. Configure GUMROAD_LICENSE_KEY OR GUMROAD_LICENSE_FILE privately. verify_license always transmits increment_uses_count=false. Omitted native increment defaults to true, so increment_license_uses is a separate explicitly confirmed command. Seller license enable/disable/decrement/rotate needs both that license credential and the intended seller access token. Raw license keys are not tool arguments.
4. Private credential files are token-only, at most 64 KiB, regular non-symlink absolute paths. On POSIX, the runtime user must own the file and permissions must be owner-only, normally 0600, inside a private directory. Windows requires separately restricted ACLs. GUI, Docker and remote runtime paths are their own paths, not the host's automatically shared files.
5. gumroad-cli login prints these instructions only. gumroad-cli doctor checks configured profile labels and policy locally; doctor --network deliberately performs GET /v2/user. That establishes one seller read, not every scope, all tool success, license entitlement or financial correctness. Private file credentials are cached for the process; restart clients after rotation or revocation.

### Scopes and provider authority

view_profile permits profile/product reads. edit_products covers product, variant, discount and custom-field work and seller license changes. view_sales covers sales/subscriber reads and sale-event subscriptions; edit_sales covers refunds, access changes and receipt resends; mark_sales_as_shipped permits shipping status changes; view_payouts covers payout reads. account is a broad fallback on many current native endpoints, not universal authority for every newer API. Refund policy uses account authority. Resource subscription permissions vary by event; inspect the native response and current source rather than inferring permission from the name.

Use the least privilege supported by Gumroad. Read-only is a local process policy and does not narrow a token at the provider or govern another client. A successful get_user response is not proof that a product belongs to an intended seller, that a license grants entitlement, or that a refund is correct. No test/live mode label is invented for seller tokens. Keep provider/customer consent separate from local effect approval.

### Several private seller and license profiles

GUMROAD_ACCOUNTS is a private JSON array with unique name and access_token OR token_file, plus license_key OR license_file when needed. Named profiles never inherit global credentials or another profile's key. GUMROAD_DEFAULT_ACCOUNT chooses an exact default label; --account selects another configured label. list_accounts reports only labels, default selection and credential availability, not secret values, file paths or provider identity. Missing credentials fail only when the requested credential type is used.

~~~bash
gumroad-cli list-accounts --agent
gumroad-cli get-user --account intended-seller --agent
gumroad-cli verify-license --product-id REVIEWED_PRODUCT_ID --account intended-license --agent
~~~

These labels/IDs are placeholders. Configure their real values privately. Revoke or replace the intended application token in Gumroad's account/application controls, rotate a customer license only on explicit request, and restart the dependent runtimes. Removing our package does not revoke tokens or reverse provider effects.


## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add gumroad -- npx -y @thenavidm/gumroad-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.gumroad]
command = "npx"
args = ["-y", "@thenavidm/gumroad-mcp-cli@latest"]
env_vars = ["GUMROAD_ACCESS_TOKEN", "GUMROAD_TOKEN_FILE", "GUMROAD_LICENSE_KEY", "GUMROAD_LICENSE_FILE", "GUMROAD_ACCOUNTS", "GUMROAD_DEFAULT_ACCOUNT", "GUMROAD_READ_ONLY", "GUMROAD_ALLOW_DESTRUCTIVE", "GUMROAD_AUDIT_LOG", "GUMROAD_REQUEST_TIMEOUT_MS", "GUMROAD_MIN_REQUEST_INTERVAL_MS"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user gumroad -- npx -y @thenavidm/gumroad-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `gumroad-3.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/gumroad-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Configure seller token OR token-only file. Add a private customer license OR license file when needed; leave unused sources empty. Named profiles require private manual runtime settings.
4. Enable read-only if you want only the 25 read/helper operations. Reconnect and verify the intended profile with one deliberate read.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "gumroad": {
      "command": "npx",
      "args": ["-y", "@thenavidm/gumroad-mcp-cli@latest"],
      "env": {
        "GUMROAD_ACCESS_TOKEN": "YOUR_PRIVATE_SELLER_TOKEN",
        "GUMROAD_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/gumroad-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "gumroad": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/gumroad-mcp-cli@latest"],
      "env": {
        "GUMROAD_ACCESS_TOKEN": "${env:GUMROAD_ACCESS_TOKEN}",
        "GUMROAD_TOKEN_FILE": "${env:GUMROAD_TOKEN_FILE}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "gumroad-api-token", "description": "Gumroad API key (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "gumroad-token-file", "description": "Optional private token-file path (leave empty for API key)"}
  ],
  "servers": {
    "gumroad": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/gumroad-mcp-cli@latest"],
      "env": {
        "GUMROAD_ACCESS_TOKEN": "${input:gumroad-api-token}",
        "GUMROAD_TOKEN_FILE": "${input:gumroad-token-file}"
      }
    }
  }
}
~~~

Start Gumroad through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Gumroad in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "gumroad": {
      "command": "npx",
      "args": ["-y", "@thenavidm/gumroad-mcp-cli@latest"],
      "env": {
        "GUMROAD_ACCESS_TOKEN": "YOUR_PRIVATE_SELLER_TOKEN",
        "GUMROAD_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/gumroad-mcp-cli.git
cd gumroad-mcp-cli
docker build -t gumroad-mcp-cli .
docker run --rm -i -e GUMROAD_ACCESS_TOKEN gumroad-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/gumroad-mcp-cli@latest`, stdio transport, and private local GUMROAD_ACCESS_TOKEN or GUMROAD_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; choose a separately supported remote connector rather than this local stdio command.









## Verify

~~~bash
gumroad-cli --version
gumroad-cli tools
gumroad-cli list-accounts --agent
gumroad-cli doctor
# One deliberate native seller read after private configuration
gumroad-cli doctor --network
~~~

Help/discovery/login/schema are local. Real provider account outcomes, desktop GUI installation and matched Codex usage remain separate evidence from fixture/protocol checks.

## Environment reference

| Variable | Purpose |
| --- | --- |
| GUMROAD_ACCESS_TOKEN | Private seller Bearer token; choose this OR TOKEN_FILE |
| GUMROAD_TOKEN_FILE | Absolute owner-private seller token-only file |
| GUMROAD_LICENSE_KEY | Independent private customer license; choose this OR LICENSE_FILE |
| GUMROAD_LICENSE_FILE | Absolute owner-private license-only file |
| GUMROAD_ACCOUNTS | Private named array: name, access_token/token_file, license_key/license_file; no fallback |
| GUMROAD_DEFAULT_ACCOUNT | Exact configured default profile label |
| GUMROAD_READ_ONLY | 1/true hides/directly refuses 32 effects |
| GUMROAD_ALLOW_DESTRUCTIVE | 0/false refuses effects even with confirm |
| GUMROAD_AUDIT_LOG | Optional private best-effort static guard decisions |
| GUMROAD_REQUEST_TIMEOUT_MS | Default 30000; accepted 100–300000 milliseconds |
| GUMROAD_MIN_REQUEST_INTERVAL_MS | Default 1000; accepted 0–10000 milliseconds; not distributed quota enforcement |

## Updates and removal

Restart npx@latest to resolve updates; update global installs with npm install -g @thenavidm/gumroad-mcp-cli@latest. Reconnect clients after changes. Download/install the new desktop archive manually. Remove only the requested package/client registration/skill/extension. Revoke intended provider credentials separately; uninstall does not undo effects or private files.

~~~bash
npm install -g @thenavidm/gumroad-mcp-cli@latest
gumroad-cli --version
# Only when removal is requested
npm uninstall -g @thenavidm/gumroad-mcp-cli
~~~

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Missing package/Node | Node 22+ and runtime PATH; Windows may need npm.cmd |
| Exit 10/no credentials | Intended credential type/profile/private file; login prints setup only |
| 401/403 | Seller credential expiry/revocation and correct native scope; admin token is separate |
| License verify failed | Current product_id, intended private license and native purchase/refund/revocation/subscription context |
| Use counter changed | Use verify-license for explicit false; increment-license-uses is a separate confirmed effect |
| Unreadable file | Absolute regular non-symlink owner-private token-only path, <=64 KiB; restrict Windows ACLs |
| Unknown URL/preview field | Use current flat selected schema; legacy guessed fields are rejected |
| Custom field GET 404 | Use compatibility get-custom-field or native list; no guessed single GET route |
| Refund refused | Positive amount_cents OR full_refund=true, never both; actual listed currency/units; confirm |
| Missing write | READ_ONLY hides effects and direct calls still refuse; ALLOW_DESTRUCTIVE can disable |
| Webhook creation failed | Current PUT/event/HTTPS callback and provider scopes; no delivery guarantee |
| Review mismatch | Preview identical requests/order/profile/schema; re-review after changes |
| Batch failure | Known/unattempted indices; no rollback/retry; inspect unknown outcome |
| Incomplete export | Budget/cursor/start_offset; resume deliberately in a NEW private file |
| Output exists | Choose a new file; never overwrite another private receipt |
| 429/timeout | No automatic retry; inspect provider state and current limits |
| Desktop install | Host/organization support, Node 22+, manual update; bundle discovery is not GUI proof |

## Development

~~~bash
git clone https://github.com/thenavidm/gumroad-mcp-cli.git
cd gumroad-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run check:discovery
npm run sync:api -- --check
npm run build:mcpb
~~~
