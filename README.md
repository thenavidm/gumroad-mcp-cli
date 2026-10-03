<img src="https://cdn.navid.me/platforms/gumroad.png" alt="Gumroad" width="88">

# Gumroad MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/gumroad-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/gumroad-mcp-cli)
[![CI](https://github.com/thenavidm/gumroad-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/gumroad-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Gumroad MCP server and CLI for Codex and AI agents. 57 shared tasks with private seller/license profiles, mandatory effect approval, exact reviewed work and bounded metadata exports.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=gumroad-mcp-cli&utm_content=readme). Full setup is on [navid.me](https://navid.me/mcp-servers/gumroad).

<img src="https://cdn.navid.me/repos/gumroad-mcp-cli-retina.gif" alt="Illustrated Gumroad workflow in the actual house terminal component" width="520">

The house terminal illustrates supported shipped tasks, not an authenticated customer or financial session. Node 22+ and the intended private seller/license credentials are required for provider work. Official CLI and MCP already exist; compare their strengths below.

## Two ways to use it

### Command line

~~~bash
gumroad-cli tools
gumroad-cli list-sales --agent
gumroad-cli refund-sale --help
gumroad-cli schema refund-sale
~~~

Use the shared task CLI for deliberate shell work and supported agent skills. --confirm approves only requested effects.

### MCP server, for your AI app

~~~bash
codex mcp add gumroad -- npx -y @thenavidm/gumroad-mcp-cli@latest
~~~

Local stdio MCP runs the same tasks and guards. Forward private runtime settings using INSTALL.md.

### Which one

Use MCP for conversational discovery and CLI for shell tasks or scripts. Both use identical native contracts. Actual task/token costs depend on client loading, output and equivalent successful outcomes.

## Features

| Feature | Behavior |
| --- | --- |
| Shared surfaces | 57 tools through both binaries and desktop bundle |
| Current contracts | 51 native task contracts/50 distinct routes plus 6 local/compatibility helpers |
| Private accounts | Separate named seller/license profiles; no fallback |
| Effect controls | 32 confirmed effects; hidden direct calls refused in read-only |
| Safe license read | Explicit false increment flag, separate confirmed counter action |
| Reviewed work | Exact ordered requests/profile label/snapshot digest; stop first failure |
| Private exports | Cursor/page/item/byte caps and explicit resume offset; no downloads |
| Complete setup | All advertised client/OS/private-file/update instructions |

## Contents

| Number | Section | Coverage |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | What you can ask it |
| 2 | [Quick install](#2-quick-install) | Quick install |
| 3 | [Set up Gumroad access](#3-set-up-gumroad-access) | Set up Gumroad access |
| 4 | [Connect your client](#4-connect-your-client) | Connect your client |
| 5 | [Check it works](#5-check-it-works) | Check it works |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Output, flags and exit codes |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | MCP or CLI and token cost |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | Every tool and argument |
| 9 | [Commerce and license workflows](#9-commerce-and-license-workflows) | Commerce and license workflows |
| 10 | [Exact reviewed batches and private exports](#10-exact-reviewed-batches-and-private-exports) | Exact reviewed batches and private exports |
| 11 | [Several private profiles](#11-several-private-profiles) | Several private profiles |
| 12 | [Writing safely](#12-writing-safely) | Writing safely |
| 13 | [How the two surfaces work](#13-how-the-two-surfaces-work) | How the two surfaces work |
| 14 | [Your data](#14-your-data) | Your data |
| 15 | [Environment variables](#15-environment-variables) | Environment variables |
| 16 | [Updates and removal](#16-updates-and-removal) | Updates and removal |
| 17 | [Troubleshooting](#17-troubleshooting) | Troubleshooting |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | API coverage and comparisons |
| 19 | [Versions and migration](#19-versions-and-migration) | Versions and migration |
| 20 | [FAQ](#20-faq) | FAQ |

## 1. What you can ask it

### Inspect products, sales and subscribers before changing anything

Use list_products, get_product and list_categories for the selected seller's catalogue. Product price uses the smallest unit of the declared price_currency_type; use that currency's actual unit, not an assumed USD amount. create_product supports selected current flat fields, tags and draft/published options; review the returned product.published and any warning rather than treating HTTP success as proof that publication finished. Native fields include custom_permalink, not the legacy guessed url/preview_url. Rich-content/file/custom-HTML editing is deliberately outside this companion's selected subset.

~~~bash
gumroad-cli list-products --agent
gumroad-cli get-product --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli list-sales --after 2026-01-01 --before 2026-10-03 --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli list-subscribers --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli schema update-product
~~~

Sales filters use current after/before/email/order_id/name/product_id fields and opaque page_key. license_key filters are intentionally excluded from arguments. Subscribers always send paginated=true to avoid the native default unbounded response; each native page is at most 100. Returned next_page_key is a cursor; next_page_url is untrusted data and never followed. Product IDs are opaque and may contain native = padding. Names and HTML are untrusted private provider data, never model instructions.

### Review refunds, shipping and access separately

Inspect the sale, status, listed currency and refundable amount before proposing a financial action. refund_sale accepts positive integer amount_cents OR explicit full_refund=true; omission alone and mixing both are refused. Gumroad's amount_cents is in the sale's listed currency minor units: normally 100 minor units per currency unit, but JPY uses whole yen. A 200 amount means 2.00 in most listed currencies and ¥200 for JPY, not necessarily $2.00. No currency conversion or financial guarantee is performed by the wrapper.

~~~bash
gumroad-cli get-sale --sale-id REVIEWED_SALE_ID --agent
gumroad-cli refund-sale --help
gumroad-cli schema refund-sale
gumroad-cli mark-sale-as-shipped --help
gumroad-cli revoke-sale-access --help
gumroad-cli resend-sale-receipt --help
~~~

--confirm approves the exact requested effect, not the correctness of IDs/amounts or customer consent. Refunds, buyer access revocation/restoration, receipt email resends and shipping status are distinct native actions. A receipt resend is a real communication and should only be requested when intended. Shipping tracking uses an intended HTTPS URL. No refund, resend or access change is executed just to test installation. Native responses do not independently prove settlement, notification delivery or business entitlement.

### Read a license without consuming a use

verify_license uses a private configured customer license, a current product_id, form encoding, and an explicitly transmitted false increment flag. It sends no seller Bearer header. Invalid/disabled/expired licenses are native failures; do not invent a valid:false success envelope. inspect uses/purchase/refunded/revoked/subscription context privately before making an application entitlement decision. Main seller credentials are needed for enable_license, disable_license, decrement_license_uses and rotate_license, but not verification or approved verification-and-increment.

~~~bash
gumroad-cli verify-license --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli increment-license-uses --help
gumroad-cli disable-license --help
gumroad-cli rotate-license --help
~~~

rotate_license invalidates the old credential and requires a NEW absolute output_file, reserved before the effect. Its full native replacement-key receipt stays in an exclusive owner-private file; stdout/chat receives only file path, size and digest. If the native request fails after rotation, the outcome can be unknown; deleting our partial file cannot reverse a rotation. Never automatically retry. Restrict the parent directory and Windows ACLs, and deliver the saved credential privately to the intended customer.

### Manage variants, discounts and checkout fields

Use the documented variant-category and nested variant endpoints with exact product/category/variant IDs. Current selected schemas support title, name, price_difference_cents and max_purchase_count; full advanced membership/file variants are not advertised. Offer codes use native amount_off and offer_type=cents or percent. A percent discount must be 1–100; fixed discounts are currency minor units. update_offer_code changes only supported purchase/minimum fields, not an arbitrary price/name body.

get_custom_field is a compatibility helper: one documented list_custom_fields read followed by an exact name match. There is no single-field native GET route. Field update/delete addresses the URL-encoded existing name; required=false is transmitted, never omitted. All writes require local confirmation.

~~~bash
gumroad-cli list-variant-categories --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli create-variant --help
gumroad-cli create-offer-code --help
gumroad-cli list-custom-fields --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli get-custom-field --product-id REVIEWED_PRODUCT_ID --name "Phone number" --agent
~~~

### Payouts, refund policy and webhooks

Read payouts with native after/before/page_key/include_upcoming; get_payout/get_upcoming_payout can request the selected native sales/transaction details. Payout metadata remains sensitive and is not accounting reconciliation. Refund policy changes use native refund_period=none/7/14/30/183 and optional fine_print; an empty fine_print clears it. Review the policy before any confirmed change.

Gumroad calls webhooks resource subscriptions. Creation is current PUT /resource_subscriptions, not the old guessed POST. Supported events are sale, refund, dispute, dispute_won, cancellation, subscription_updated, subscription_ended and subscription_restarted. List subscriptions by required resource_name. Callbacks receive private customer/event data; the package does not host a listener or prove delivery. Deleting a webhook is a separate confirmed request and does not undo previous events.
~~~bash
gumroad-cli list-payouts --agent
gumroad-cli get-refund-policy --agent
gumroad-cli list-resource-subscriptions --resource-name sale --agent
gumroad-cli create-resource-subscription --help
~~~

## 2. Quick install

~~~bash
npm install -g @thenavidm/gumroad-mcp-cli@latest
gumroad-cli --version
gumroad-cli tools
gumroad-cli login
~~~

## 3. Set up Gumroad access

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


## 4. Connect your client

Complete client and OS details are in [INSTALL.md](INSTALL.md).

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

1. Download `gumroad-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/gumroad-mcp-cli/releases/latest).
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









## 5. Check it works

~~~bash
gumroad-cli --version
gumroad-cli tools
gumroad-cli list-accounts --agent
gumroad-cli doctor
# One deliberate native seller read after private configuration
gumroad-cli doctor --network
~~~

Help/discovery/login/schema are local. Real provider account outcomes, desktop GUI installation and matched Codex usage remain separate evidence from fixture/protocol checks.

## 6. Output, flags and exit codes

~~~bash
gumroad-cli list-sales --agent
gumroad-cli get-sale --sale-id REVIEWED_SALE_ID --agent --select sale.id,sale.currency
gumroad-cli schema refund-sale
~~~

CLI uses hyphenated commands, MCP uses underscores. --json gives parsed native objects, --compact emits one line, --agent requests compact JSON/no-input/no-color/yes formatting, and --select keeps chosen fields. None approves effects. Repeated --tags takes each string; --tasks takes each task JSON object; --arguments takes one JSON filter object.

| Exit | Meaning |
| --- | --- |
| 0 | Success |
| 2 | Usage/input/refused effect |
| 3 | Native/helper not found |
| 4 | Authentication/permission |
| 5 | API/unknown transport failure |
| 7 | Rate limited |
| 10 | Missing/invalid configuration |

## 7. MCP or CLI and token cost

Client loading mode matters: MCP may load full schemas, defer discovery or select tools. CLI also needs help/schema discovery, execution and model-readable output. --agent emits compact JSON; --select can narrow returned fields without changing the requested native call. These formatting options do not establish fewer tokens for a successful equivalent task.

Codex is the current priority. Matched completed provider-task/token measurements remain pending: record client/model/package versions, checked date, actual loading mode, equivalent requested outcomes, API input/output/cache usage and latency. Do not substitute tool counts, character-based estimates, protocol discovery or another integration's results. Claude Code benchmarks remain deferred. This release claims verified contracts and local behavior, not measured task-token savings.


## 8. Every tool and argument

#### get_user

Get user. Reviewed native GET /user; scope: view_profile. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-user --help
gumroad-cli schema get-user
~~~

~~~json
{
  "type": "object",
  "properties": {
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [],
  "additionalProperties": false
}
~~~

Native request: **GET /user**. Authentication/scope: view_profile. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/User.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_user",
  "title": "Get user",
  "description": "Get user. Reviewed native GET /user; scope: view_profile. Read only; no local effect approval required.",
  "group": "User",
  "method": "GET",
  "path": "/user",
  "pathKeys": {},
  "properties": {},
  "required": [],
  "nativeFields": [],
  "risk": "read",
  "scope": "view_profile",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/User.tsx"
}
~~~

#### list_categories

List categories. Reviewed native GET /categories; scope: view_profile. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-categories --help
gumroad-cli schema list-categories
~~~

~~~json
{
  "type": "object",
  "properties": {
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [],
  "additionalProperties": false
}
~~~

Native request: **GET /categories**. Authentication/scope: view_profile. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_categories",
  "title": "List categories",
  "description": "List categories. Reviewed native GET /categories; scope: view_profile. Read only; no local effect approval required.",
  "group": "Products",
  "method": "GET",
  "path": "/categories",
  "pathKeys": {},
  "properties": {},
  "required": [],
  "nativeFields": [],
  "risk": "read",
  "scope": "view_profile",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### list_products

List products. Reviewed native GET /products; scope: view_profile. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `page_key` | string | Optional | Opaque native continuation cursor; never an arbitrary URL. {"minLength": 1, "maxLength": 1024} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-products --help
gumroad-cli schema list-products
~~~

~~~json
{
  "type": "object",
  "properties": {
    "page_key": {
      "type": "string",
      "maxLength": 1024,
      "description": "Opaque native continuation cursor; never an arbitrary URL.",
      "minLength": 1
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [],
  "additionalProperties": false
}
~~~

Native request: **GET /products**. Authentication/scope: view_profile. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_products",
  "title": "List products",
  "description": "List products. Reviewed native GET /products; scope: view_profile. Read only; no local effect approval required.",
  "group": "Products",
  "method": "GET",
  "path": "/products",
  "pathKeys": {},
  "properties": {
    "page_key": {
      "type": "string",
      "maxLength": 1024,
      "description": "Opaque native continuation cursor; never an arbitrary URL.",
      "minLength": 1
    }
  },
  "required": [],
  "nativeFields": [
    "page_key"
  ],
  "risk": "read",
  "scope": "view_profile",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": "products",
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### get_product

Get product. Reviewed native GET /products/:id; scope: view_profile. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-product --help
gumroad-cli schema get-product
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{id}**. Authentication/scope: view_profile. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_product",
  "title": "Get product",
  "description": "Get product. Reviewed native GET /products/:id; scope: view_profile. Read only; no local effect approval required.",
  "group": "Products",
  "method": "GET",
  "path": "/products/{id}",
  "pathKeys": {
    "id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "view_profile",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### create_product

Create product. Reviewed native POST /products; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `draft` | boolean | Optional | (optional, true or false, default false) save as an unpublished draft instead of publishing |
| `published` | boolean | Optional | (optional, true or false, default true) false saves as an unpublished draft, same as draft=true |
| `native_type` | string | Optional | (optional, "digital" (default), "course", "ebook", "membership", "bundle", "coffee", "call", or "commission") cannot be changed later {"enum": ["digital", "course", "ebook", "membership", "bundle", "coffee", "call", "commission"]} |
| `name` | string | Required | (required) {"minLength": 1, "maxLength": 65536} |
| `description` | string | Optional | (optional) HTML {"maxLength": 65536} |
| `custom_permalink` | string | Optional | (optional) {"maxLength": 65536} |
| `price` | integer | Required | (required) in the smallest currency unit (e.g. cents) {"minimum": 0, "maximum": 9007199254740991} |
| `price_currency_type` | string | Optional | (optional) ISO currency code; defaults to your account currency {"maxLength": 65536, "pattern": "^[a-zA-Z]{3}$"} |
| `subscription_duration` | string | Optional | (optional, membership only, "monthly", "quarterly", "biannually", "yearly", or "every_two_years") {"enum": ["monthly", "quarterly", "biannually", "yearly", "every_two_years"]} |
| `customizable_price` | boolean | Optional | (optional, true or false) pay-what-you-want |
| `suggested_price_cents` | integer | Optional | (optional) {"minimum": 0, "maximum": 9007199254740991} |
| `max_purchase_count` | integer | Optional | (optional) {"minimum": 0, "maximum": 9007199254740991} |
| `category` | string | Optional | (optional) full category path from GET /v2/categories, e.g. "design/ui-and-web/figma"; cannot be sent with taxonomy_id {"maxLength": 65536} |
| `taxonomy_id` | string | Optional | (optional) numeric category ID; alias for category, cannot be sent with category {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `tags` | array | Optional | (optional) array of tag strings {"maxItems": 100} |
| `custom_summary` | string | Optional | (optional) {"maxLength": 65536} |
| `refund_period` | string | Optional | (optional, "inherit", "none", "7", "14", "30", or "183") sets a product-level refund policy; "inherit" uses the account default. Only available when the account-level refund policy is not in effect; otherwise use PUT /v2/refund_policy {"enum": ["inherit", "none", "7", "14", "30", "183"]} |
| `refund_fine_print` | string | Optional | (optional) fine print for the product-level refund policy; requires refund_period unless the product already has one enabled, and cannot be combined with refund_period "inherit". Empty string clears it {"maxLength": 65536} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli create-product --help
gumroad-cli schema create-product
~~~

~~~json
{
  "type": "object",
  "properties": {
    "draft": {
      "type": "boolean",
      "description": "(optional, true or false, default false) save as an unpublished draft instead of publishing"
    },
    "published": {
      "type": "boolean",
      "description": "(optional, true or false, default true) false saves as an unpublished draft, same as draft=true"
    },
    "native_type": {
      "type": "string",
      "enum": [
        "digital",
        "course",
        "ebook",
        "membership",
        "bundle",
        "coffee",
        "call",
        "commission"
      ],
      "description": "(optional, \"digital\" (default), \"course\", \"ebook\", \"membership\", \"bundle\", \"coffee\", \"call\", or \"commission\") cannot be changed later"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(required)",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) HTML"
    },
    "custom_permalink": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "price": {
      "type": "integer",
      "description": "(required) in the smallest currency unit (e.g. cents)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "price_currency_type": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) ISO currency code; defaults to your account currency",
      "pattern": "^[a-zA-Z]{3}$"
    },
    "subscription_duration": {
      "type": "string",
      "enum": [
        "monthly",
        "quarterly",
        "biannually",
        "yearly",
        "every_two_years"
      ],
      "description": "(optional, membership only, \"monthly\", \"quarterly\", \"biannually\", \"yearly\", or \"every_two_years\")"
    },
    "customizable_price": {
      "type": "boolean",
      "description": "(optional, true or false) pay-what-you-want"
    },
    "suggested_price_cents": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "category": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) full category path from GET /v2/categories, e.g. \"design/ui-and-web/figma\"; cannot be sent with taxonomy_id"
    },
    "taxonomy_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) numeric category ID; alias for category, cannot be sent with category",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "tags": {
      "type": "array",
      "maxItems": 100,
      "items": {
        "type": "string",
        "maxLength": 100,
        "description": "Tag",
        "minLength": 1
      },
      "description": "(optional) array of tag strings"
    },
    "custom_summary": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "refund_period": {
      "type": "string",
      "enum": [
        "inherit",
        "none",
        "7",
        "14",
        "30",
        "183"
      ],
      "description": "(optional, \"inherit\", \"none\", \"7\", \"14\", \"30\", or \"183\") sets a product-level refund policy; \"inherit\" uses the account default. Only available when the account-level refund policy is not in effect; otherwise use PUT /v2/refund_policy"
    },
    "refund_fine_print": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) fine print for the product-level refund policy; requires refund_period unless the product already has one enabled, and cannot be combined with refund_period \"inherit\". Empty string clears it"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "name",
    "price"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /products**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "create_product",
  "title": "Create product",
  "description": "Create product. Reviewed native POST /products; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Products",
  "method": "POST",
  "path": "/products",
  "pathKeys": {},
  "properties": {
    "draft": {
      "type": "boolean",
      "description": "(optional, true or false, default false) save as an unpublished draft instead of publishing"
    },
    "published": {
      "type": "boolean",
      "description": "(optional, true or false, default true) false saves as an unpublished draft, same as draft=true"
    },
    "native_type": {
      "type": "string",
      "enum": [
        "digital",
        "course",
        "ebook",
        "membership",
        "bundle",
        "coffee",
        "call",
        "commission"
      ],
      "description": "(optional, \"digital\" (default), \"course\", \"ebook\", \"membership\", \"bundle\", \"coffee\", \"call\", or \"commission\") cannot be changed later"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(required)",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) HTML"
    },
    "custom_permalink": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "price": {
      "type": "integer",
      "description": "(required) in the smallest currency unit (e.g. cents)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "price_currency_type": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) ISO currency code; defaults to your account currency",
      "pattern": "^[a-zA-Z]{3}$"
    },
    "subscription_duration": {
      "type": "string",
      "enum": [
        "monthly",
        "quarterly",
        "biannually",
        "yearly",
        "every_two_years"
      ],
      "description": "(optional, membership only, \"monthly\", \"quarterly\", \"biannually\", \"yearly\", or \"every_two_years\")"
    },
    "customizable_price": {
      "type": "boolean",
      "description": "(optional, true or false) pay-what-you-want"
    },
    "suggested_price_cents": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "category": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) full category path from GET /v2/categories, e.g. \"design/ui-and-web/figma\"; cannot be sent with taxonomy_id"
    },
    "taxonomy_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) numeric category ID; alias for category, cannot be sent with category",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "tags": {
      "type": "array",
      "maxItems": 100,
      "items": {
        "type": "string",
        "maxLength": 100,
        "description": "Tag",
        "minLength": 1
      },
      "description": "(optional) array of tag strings"
    },
    "custom_summary": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "refund_period": {
      "type": "string",
      "enum": [
        "inherit",
        "none",
        "7",
        "14",
        "30",
        "183"
      ],
      "description": "(optional, \"inherit\", \"none\", \"7\", \"14\", \"30\", or \"183\") sets a product-level refund policy; \"inherit\" uses the account default. Only available when the account-level refund policy is not in effect; otherwise use PUT /v2/refund_policy"
    },
    "refund_fine_print": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) fine print for the product-level refund policy; requires refund_period unless the product already has one enabled, and cannot be combined with refund_period \"inherit\". Empty string clears it"
    }
  },
  "required": [
    "name",
    "price"
  ],
  "nativeFields": [
    "draft",
    "published",
    "native_type",
    "name",
    "description",
    "custom_permalink",
    "price",
    "price_currency_type",
    "subscription_duration",
    "customizable_price",
    "suggested_price_cents",
    "max_purchase_count",
    "category",
    "taxonomy_id",
    "tags",
    "custom_summary",
    "refund_period",
    "refund_fine_print"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### update_product

Update product. Reviewed native PUT /products/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Optional | (optional) {"minLength": 1, "maxLength": 65536} |
| `description` | string | Optional | (optional) HTML {"maxLength": 65536} |
| `custom_permalink` | string | Optional | (optional) {"maxLength": 65536} |
| `price` | integer | Optional | (optional) in the smallest currency unit; not allowed for tiered memberships — use the variant endpoints to manage tier pricing {"minimum": 0, "maximum": 9007199254740991} |
| `price_currency_type` | string | Optional | (optional) ISO currency code {"maxLength": 65536, "pattern": "^[a-zA-Z]{3}$"} |
| `customizable_price` | boolean | Optional | (optional, true or false) |
| `suggested_price_cents` | integer | Optional | (optional) {"minimum": 0, "maximum": 9007199254740991} |
| `max_purchase_count` | integer | Optional | (optional) {"minimum": 0, "maximum": 9007199254740991} |
| `quantity_enabled` | boolean | Optional | (optional, true or false) |
| `is_adult` | boolean | Optional | (optional, true or false) |
| `display_product_reviews` | boolean | Optional | (optional, true or false) |
| `should_show_sales_count` | boolean | Optional | (optional, true or false) |
| `category` | string | Optional | (optional) full category path from GET /v2/categories, e.g. "design/ui-and-web/figma"; cannot be sent with taxonomy_id {"maxLength": 65536} |
| `taxonomy_id` | string | Optional | (optional) numeric category ID; alias for category, cannot be sent with category {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `tags` | array | Optional | (optional) array of tag strings; full replacement {"maxItems": 100} |
| `custom_receipt` | string | Optional | (optional) {"maxLength": 65536} |
| `custom_summary` | string | Optional | (optional) {"maxLength": 65536} |
| `refund_period` | string | Optional | (optional, "inherit", "none", "7", "14", "30", or "183") sets a product-level refund policy; "inherit" switches the product back to the account default. Only available when the account-level refund policy is not in effect; otherwise use PUT /v2/refund_policy {"enum": ["inherit", "none", "7", "14", "30", "183"]} |
| `refund_fine_print` | string | Optional | (optional) fine print for the product-level refund policy; requires refund_period unless the product already has one enabled, and cannot be combined with refund_period "inherit". Empty string clears it {"maxLength": 65536} |
| `has_same_rich_content_for_all_variants` | boolean | Optional | (optional, true or false) switches between product-level and per-variant rich content |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli update-product --help
gumroad-cli schema update-product
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) HTML"
    },
    "custom_permalink": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "price": {
      "type": "integer",
      "description": "(optional) in the smallest currency unit; not allowed for tiered memberships \u2014 use the variant endpoints to manage tier pricing",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "price_currency_type": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) ISO currency code",
      "pattern": "^[a-zA-Z]{3}$"
    },
    "customizable_price": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "suggested_price_cents": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "quantity_enabled": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "is_adult": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "display_product_reviews": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "should_show_sales_count": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "category": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) full category path from GET /v2/categories, e.g. \"design/ui-and-web/figma\"; cannot be sent with taxonomy_id"
    },
    "taxonomy_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) numeric category ID; alias for category, cannot be sent with category",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "tags": {
      "type": "array",
      "maxItems": 100,
      "items": {
        "type": "string",
        "maxLength": 100,
        "description": "Tag",
        "minLength": 1
      },
      "description": "(optional) array of tag strings; full replacement"
    },
    "custom_receipt": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "custom_summary": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "refund_period": {
      "type": "string",
      "enum": [
        "inherit",
        "none",
        "7",
        "14",
        "30",
        "183"
      ],
      "description": "(optional, \"inherit\", \"none\", \"7\", \"14\", \"30\", or \"183\") sets a product-level refund policy; \"inherit\" switches the product back to the account default. Only available when the account-level refund policy is not in effect; otherwise use PUT /v2/refund_policy"
    },
    "refund_fine_print": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) fine print for the product-level refund policy; requires refund_period unless the product already has one enabled, and cannot be combined with refund_period \"inherit\". Empty string clears it"
    },
    "has_same_rich_content_for_all_variants": {
      "type": "boolean",
      "description": "(optional, true or false) switches between product-level and per-variant rich content"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /products/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "update_product",
  "title": "Update product",
  "description": "Update product. Reviewed native PUT /products/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Products",
  "method": "PUT",
  "path": "/products/{id}",
  "pathKeys": {
    "id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) HTML"
    },
    "custom_permalink": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "price": {
      "type": "integer",
      "description": "(optional) in the smallest currency unit; not allowed for tiered memberships \u2014 use the variant endpoints to manage tier pricing",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "price_currency_type": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) ISO currency code",
      "pattern": "^[a-zA-Z]{3}$"
    },
    "customizable_price": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "suggested_price_cents": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "quantity_enabled": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "is_adult": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "display_product_reviews": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "should_show_sales_count": {
      "type": "boolean",
      "description": "(optional, true or false)"
    },
    "category": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) full category path from GET /v2/categories, e.g. \"design/ui-and-web/figma\"; cannot be sent with taxonomy_id"
    },
    "taxonomy_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) numeric category ID; alias for category, cannot be sent with category",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "tags": {
      "type": "array",
      "maxItems": 100,
      "items": {
        "type": "string",
        "maxLength": 100,
        "description": "Tag",
        "minLength": 1
      },
      "description": "(optional) array of tag strings; full replacement"
    },
    "custom_receipt": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "custom_summary": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional)"
    },
    "refund_period": {
      "type": "string",
      "enum": [
        "inherit",
        "none",
        "7",
        "14",
        "30",
        "183"
      ],
      "description": "(optional, \"inherit\", \"none\", \"7\", \"14\", \"30\", or \"183\") sets a product-level refund policy; \"inherit\" switches the product back to the account default. Only available when the account-level refund policy is not in effect; otherwise use PUT /v2/refund_policy"
    },
    "refund_fine_print": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) fine print for the product-level refund policy; requires refund_period unless the product already has one enabled, and cannot be combined with refund_period \"inherit\". Empty string clears it"
    },
    "has_same_rich_content_for_all_variants": {
      "type": "boolean",
      "description": "(optional, true or false) switches between product-level and per-variant rich content"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "name",
    "description",
    "custom_permalink",
    "price",
    "price_currency_type",
    "customizable_price",
    "suggested_price_cents",
    "max_purchase_count",
    "quantity_enabled",
    "is_adult",
    "display_product_reviews",
    "should_show_sales_count",
    "category",
    "taxonomy_id",
    "tags",
    "custom_receipt",
    "custom_summary",
    "refund_period",
    "refund_fine_print",
    "has_same_rich_content_for_all_variants"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### delete_product

Delete product. Reviewed native DELETE /products/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli delete-product --help
gumroad-cli schema delete-product
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **DELETE /products/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "delete_product",
  "title": "Delete product",
  "description": "Delete product. Reviewed native DELETE /products/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Products",
  "method": "DELETE",
  "path": "/products/{id}",
  "pathKeys": {
    "id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### enable_product

Enable product. Reviewed native PUT /products/:id/enable; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli enable-product --help
gumroad-cli schema enable-product
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /products/{id}/enable**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "enable_product",
  "title": "Enable product",
  "description": "Enable product. Reviewed native PUT /products/:id/enable; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Products",
  "method": "PUT",
  "path": "/products/{id}/enable",
  "pathKeys": {
    "id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### disable_product

Disable product. Reviewed native PUT /products/:id/disable; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli disable-product --help
gumroad-cli schema disable-product
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /products/{id}/disable**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Products.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "disable_product",
  "title": "Disable product",
  "description": "Disable product. Reviewed native PUT /products/:id/disable; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Products",
  "method": "PUT",
  "path": "/products/{id}/disable",
  "pathKeys": {
    "id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Products.tsx"
}
~~~

#### list_sales

List sales. Reviewed native GET /sales; scope: view_sales. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `after` | string | Optional | (optional, date in form YYYY-MM-DD) - Only return sales after this date {"maxLength": 65536, "format": "date"} |
| `before` | string | Optional | (optional, date in form YYYY-MM-DD) - Only return sales before this date {"maxLength": 65536, "format": "date"} |
| `product_id` | string | Optional | (optional) - Filter sales by this product {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `email` | string | Optional | (optional) - Filter sales by this email {"maxLength": 65536, "format": "email"} |
| `order_id` | string | Optional | (optional) - Filter sales by this Order ID {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Optional | (optional) - Filter sales by customer name {"maxLength": 65536} |
| `page_key` | string | Optional | (optional) - A key representing a page of results. It is given in the response as `next_page_key`. {"maxLength": 65536} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-sales --help
gumroad-cli schema list-sales
~~~

~~~json
{
  "type": "object",
  "properties": {
    "after": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return sales after this date",
      "format": "date"
    },
    "before": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return sales before this date",
      "format": "date"
    },
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) - Filter sales by this product",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "email": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - Filter sales by this email",
      "format": "email"
    },
    "order_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) - Filter sales by this Order ID",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - Filter sales by customer name"
    },
    "page_key": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - A key representing a page of results. It is given in the response as `next_page_key`."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [],
  "additionalProperties": false
}
~~~

Native request: **GET /sales**. Authentication/scope: view_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_sales",
  "title": "List sales",
  "description": "List sales. Reviewed native GET /sales; scope: view_sales. Read only; no local effect approval required.",
  "group": "Sales",
  "method": "GET",
  "path": "/sales",
  "pathKeys": {},
  "properties": {
    "after": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return sales after this date",
      "format": "date"
    },
    "before": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return sales before this date",
      "format": "date"
    },
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) - Filter sales by this product",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "email": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - Filter sales by this email",
      "format": "email"
    },
    "order_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(optional) - Filter sales by this Order ID",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - Filter sales by customer name"
    },
    "page_key": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - A key representing a page of results. It is given in the response as `next_page_key`."
    }
  },
  "required": [],
  "nativeFields": [
    "after",
    "before",
    "product_id",
    "email",
    "order_id",
    "name",
    "page_key"
  ],
  "risk": "read",
  "scope": "view_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": "sales",
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx"
}
~~~

#### get_sale

Get sale. Reviewed native GET /sales/:id; scope: view_sales. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `sale_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-sale --help
gumroad-cli schema get-sale
~~~

~~~json
{
  "type": "object",
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "sale_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /sales/{id}**. Authentication/scope: view_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_sale",
  "title": "Get sale",
  "description": "Get sale. Reviewed native GET /sales/:id; scope: view_sales. Read only; no local effect approval required.",
  "group": "Sales",
  "method": "GET",
  "path": "/sales/{id}",
  "pathKeys": {
    "id": "sale_id"
  },
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "sale_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "view_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx"
}
~~~

#### mark_sale_as_shipped

Mark sale as shipped. Reviewed native PUT /sales/:id/mark_as_shipped; scope: mark_sales_as_shipped. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `sale_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `tracking_url` | string | Optional | (optional) Full http:// or https:// URL {"maxLength": 65536, "format": "uri"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli mark-sale-as-shipped --help
gumroad-cli schema mark-sale-as-shipped
~~~

~~~json
{
  "type": "object",
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "tracking_url": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) Full http:// or https:// URL",
      "format": "uri"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "sale_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /sales/{id}/mark_as_shipped**. Authentication/scope: mark_sales_as_shipped. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "mark_sale_as_shipped",
  "title": "Mark sale as shipped",
  "description": "Mark sale as shipped. Reviewed native PUT /sales/:id/mark_as_shipped; scope: mark_sales_as_shipped. Requires explicit per-call confirmation.",
  "group": "Sales",
  "method": "PUT",
  "path": "/sales/{id}/mark_as_shipped",
  "pathKeys": {
    "id": "sale_id"
  },
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "tracking_url": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) Full http:// or https:// URL",
      "format": "uri"
    }
  },
  "required": [
    "sale_id"
  ],
  "nativeFields": [
    "tracking_url"
  ],
  "risk": "destructive",
  "scope": "mark_sales_as_shipped",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx"
}
~~~

#### refund_sale

Refund sale. Reviewed native PUT /sales/:id/refund; scope: edit_sales. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `sale_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `amount_cents` | integer | Optional | (optional) - Amount to refund, in minor units of the sale's listed currency — the `currency` field on the sale object, not the buyer's local currency. Every listed currency has 100 minor units except `jpy`, which has none (whole yen), so for most sales 200 means 2.00 of that currency, but for a JPY sale 200 means ¥200. If set, issue partial refund by this amount. If not set, issue full refund. You can issue multiple partial refunds per sale until it is fully refunded. {"minimum": 1, "maximum": 9007199254740991} |
| `full_refund` | boolean | Optional | Deliberate full refund. Must be true if amount_cents is omitted, and cannot coexist with it. |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli refund-sale --help
gumroad-cli schema refund-sale
~~~

~~~json
{
  "type": "object",
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "amount_cents": {
      "type": "integer",
      "description": "(optional) - Amount to refund, in minor units of the sale's listed currency \u2014 the `currency` field on the sale object, not the buyer's local currency. Every listed currency has 100 minor units except `jpy`, which has none (whole yen), so for most sales 200 means 2.00 of that currency, but for a JPY sale 200 means \u00a5200. If set, issue partial refund by this amount. If not set, issue full refund. You can issue multiple partial refunds per sale until it is fully refunded.",
      "minimum": 1,
      "maximum": 9007199254740991
    },
    "full_refund": {
      "type": "boolean",
      "description": "Deliberate full refund. Must be true if amount_cents is omitted, and cannot coexist with it."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "sale_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /sales/{id}/refund**. Authentication/scope: edit_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "refund_sale",
  "title": "Refund sale",
  "description": "Refund sale. Reviewed native PUT /sales/:id/refund; scope: edit_sales. Requires explicit per-call confirmation.",
  "group": "Sales",
  "method": "PUT",
  "path": "/sales/{id}/refund",
  "pathKeys": {
    "id": "sale_id"
  },
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "amount_cents": {
      "type": "integer",
      "description": "(optional) - Amount to refund, in minor units of the sale's listed currency \u2014 the `currency` field on the sale object, not the buyer's local currency. Every listed currency has 100 minor units except `jpy`, which has none (whole yen), so for most sales 200 means 2.00 of that currency, but for a JPY sale 200 means \u00a5200. If set, issue partial refund by this amount. If not set, issue full refund. You can issue multiple partial refunds per sale until it is fully refunded.",
      "minimum": 1,
      "maximum": 9007199254740991
    },
    "full_refund": {
      "type": "boolean",
      "description": "Deliberate full refund. Must be true if amount_cents is omitted, and cannot coexist with it."
    }
  },
  "required": [
    "sale_id"
  ],
  "nativeFields": [
    "amount_cents"
  ],
  "risk": "destructive",
  "scope": "edit_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx"
}
~~~

#### revoke_sale_access

Revoke sale access. Reviewed native PUT /sales/:id/revoke_access; scope: edit_sales. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `sale_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli revoke-sale-access --help
gumroad-cli schema revoke-sale-access
~~~

~~~json
{
  "type": "object",
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "sale_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /sales/{id}/revoke_access**. Authentication/scope: edit_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "revoke_sale_access",
  "title": "Revoke sale access",
  "description": "Revoke sale access. Reviewed native PUT /sales/:id/revoke_access; scope: edit_sales. Requires explicit per-call confirmation.",
  "group": "Sales",
  "method": "PUT",
  "path": "/sales/{id}/revoke_access",
  "pathKeys": {
    "id": "sale_id"
  },
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "sale_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx"
}
~~~

#### restore_sale_access

Restore sale access. Reviewed native PUT /sales/:id/undo_revoke_access; scope: edit_sales. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `sale_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli restore-sale-access --help
gumroad-cli schema restore-sale-access
~~~

~~~json
{
  "type": "object",
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "sale_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /sales/{id}/undo_revoke_access**. Authentication/scope: edit_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "restore_sale_access",
  "title": "Restore sale access",
  "description": "Restore sale access. Reviewed native PUT /sales/:id/undo_revoke_access; scope: edit_sales. Requires explicit per-call confirmation.",
  "group": "Sales",
  "method": "PUT",
  "path": "/sales/{id}/undo_revoke_access",
  "pathKeys": {
    "id": "sale_id"
  },
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "sale_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx"
}
~~~

#### resend_sale_receipt

Resend sale receipt. Reviewed native POST /sales/:id/resend_receipt; scope: edit_sales. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `sale_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli resend-sale-receipt --help
gumroad-cli schema resend-sale-receipt
~~~

~~~json
{
  "type": "object",
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "sale_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /sales/{id}/resend_receipt**. Authentication/scope: edit_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "resend_sale_receipt",
  "title": "Resend sale receipt",
  "description": "Resend sale receipt. Reviewed native POST /sales/:id/resend_receipt; scope: edit_sales. Requires explicit per-call confirmation.",
  "group": "Sales",
  "method": "POST",
  "path": "/sales/{id}/resend_receipt",
  "pathKeys": {
    "id": "sale_id"
  },
  "properties": {
    "sale_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "sale_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Sales.tsx"
}
~~~

#### list_subscribers

List subscribers. Reviewed native GET /products/:product_id/subscribers; scope: view_sales. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `email` | string | Optional | (optional) - Filter subscribers by this email {"maxLength": 65536, "format": "email"} |
| `page_key` | string | Optional | (optional) - A key representing a page of results. It is given in the paginated response of the previous page as `next_page_key`. {"maxLength": 65536} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-subscribers --help
gumroad-cli schema list-subscribers
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "email": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - Filter subscribers by this email",
      "format": "email"
    },
    "page_key": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - A key representing a page of results. It is given in the paginated response of the previous page as `next_page_key`."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/subscribers**. Authentication/scope: view_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Subscribers.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_subscribers",
  "title": "List subscribers",
  "description": "List subscribers. Reviewed native GET /products/:product_id/subscribers; scope: view_sales. Read only; no local effect approval required.",
  "group": "Subscribers",
  "method": "GET",
  "path": "/products/{product_id}/subscribers",
  "pathKeys": {
    "product_id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "email": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - Filter subscribers by this email",
      "format": "email"
    },
    "page_key": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - A key representing a page of results. It is given in the paginated response of the previous page as `next_page_key`."
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "email",
    "page_key"
  ],
  "risk": "read",
  "scope": "view_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": "subscribers",
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Subscribers.tsx"
}
~~~

#### get_subscriber

Get subscriber. Reviewed native GET /subscribers/:id; scope: view_sales. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `subscriber_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-subscriber --help
gumroad-cli schema get-subscriber
~~~

~~~json
{
  "type": "object",
  "properties": {
    "subscriber_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "subscriber_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /subscribers/{id}**. Authentication/scope: view_sales. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Subscribers.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_subscriber",
  "title": "Get subscriber",
  "description": "Get subscriber. Reviewed native GET /subscribers/:id; scope: view_sales. Read only; no local effect approval required.",
  "group": "Subscribers",
  "method": "GET",
  "path": "/subscribers/{id}",
  "pathKeys": {
    "id": "subscriber_id"
  },
  "properties": {
    "subscriber_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "subscriber_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "view_sales",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Subscribers.tsx"
}
~~~

#### verify_license

Verify license. Reviewed native POST /licenses/verify; scope: No OAuth required. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Current native product ID, never deprecated permalink. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli verify-license --help
gumroad-cli schema verify-license
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Current native product ID, never deprecated permalink.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /licenses/verify**. Authentication/scope: No OAuth required. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "verify_license",
  "title": "Verify license",
  "description": "Verify license. Reviewed native POST /licenses/verify; scope: No OAuth required. Read only; no local effect approval required.",
  "group": "Licenses",
  "method": "POST",
  "path": "/licenses/verify",
  "pathKeys": {},
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Current native product ID, never deprecated permalink.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "product_id"
  ],
  "risk": "read",
  "scope": "No OAuth required",
  "licenseAPI": true,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx"
}
~~~

#### enable_license

Enable license. Reviewed native PUT /licenses/enable; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | (the unique ID of the product — copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint) {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli enable-license --help
gumroad-cli schema enable-license
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /licenses/enable**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "enable_license",
  "title": "Enable license",
  "description": "Enable license. Reviewed native PUT /licenses/enable; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Licenses",
  "method": "PUT",
  "path": "/licenses/enable",
  "pathKeys": {},
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "product_id"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": true,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx"
}
~~~

#### disable_license

Disable license. Reviewed native PUT /licenses/disable; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | (the unique ID of the product — copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint) {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli disable-license --help
gumroad-cli schema disable-license
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /licenses/disable**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "disable_license",
  "title": "Disable license",
  "description": "Disable license. Reviewed native PUT /licenses/disable; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Licenses",
  "method": "PUT",
  "path": "/licenses/disable",
  "pathKeys": {},
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "product_id"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": true,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx"
}
~~~

#### decrement_license_uses

Decrement license uses. Reviewed native PUT /licenses/decrement_uses_count; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | (the unique ID of the product — copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint) {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli decrement-license-uses --help
gumroad-cli schema decrement-license-uses
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /licenses/decrement_uses_count**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "decrement_license_uses",
  "title": "Decrement license uses",
  "description": "Decrement license uses. Reviewed native PUT /licenses/decrement_uses_count; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Licenses",
  "method": "PUT",
  "path": "/licenses/decrement_uses_count",
  "pathKeys": {},
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "product_id"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": true,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx"
}
~~~

#### rotate_license

Rotate license. Reviewed native PUT /licenses/rotate; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | (the unique ID of the product — copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint) {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |
| `output_file` | string | Required | Required absolute NEW owner-private file for the replacement license receipt; no overwrite. {"minLength": 1} |

~~~bash
gumroad-cli rotate-license --help
gumroad-cli schema rotate-license
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    },
    "output_file": {
      "type": "string",
      "minLength": 1,
      "description": "Required absolute NEW owner-private file for the replacement license receipt; no overwrite."
    }
  },
  "required": [
    "product_id",
    "output_file"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /licenses/rotate**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "rotate_license",
  "title": "Rotate license",
  "description": "Rotate license. Reviewed native PUT /licenses/rotate; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Licenses",
  "method": "PUT",
  "path": "/licenses/rotate",
  "pathKeys": {},
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "(the unique ID of the product \u2014 copy it from the license key block on the product's Content tab, or use the id field returned by the GET /products endpoint)",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "product_id"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": true,
  "privateOutput": true,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx"
}
~~~

#### create_variant_category

Create variant category. Reviewed native POST /products/:product_id/variant_categories; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `title` | string | Required | Reviewed current contract value. {"maxLength": 65536} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli create-variant-category --help
gumroad-cli schema create-variant-category
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "title": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "title"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /products/{product_id}/variant_categories**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "create_variant_category",
  "title": "Create variant category",
  "description": "Create variant category. Reviewed native POST /products/:product_id/variant_categories; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Variants",
  "method": "POST",
  "path": "/products/{product_id}/variant_categories",
  "pathKeys": {
    "product_id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "title": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    }
  },
  "required": [
    "product_id",
    "title"
  ],
  "nativeFields": [
    "title"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### get_variant_category

Get variant category. Reviewed native GET /products/:product_id/variant_categories/:id; scope: edit_products. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-variant-category --help
gumroad-cli schema get-variant-category
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id",
    "variant_category_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/variant_categories/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_variant_category",
  "title": "Get variant category",
  "description": "Get variant category. Reviewed native GET /products/:product_id/variant_categories/:id; scope: edit_products. Read only; no local effect approval required.",
  "group": "Variants",
  "method": "GET",
  "path": "/products/{product_id}/variant_categories/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "id": "variant_category_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "variant_category_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### update_variant_category

Update variant category. Reviewed native PUT /products/:product_id/variant_categories/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `title` | string | Required | Reviewed current contract value. {"maxLength": 65536} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli update-variant-category --help
gumroad-cli schema update-variant-category
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "title": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "title"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /products/{product_id}/variant_categories/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "update_variant_category",
  "title": "Update variant category",
  "description": "Update variant category. Reviewed native PUT /products/:product_id/variant_categories/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Variants",
  "method": "PUT",
  "path": "/products/{product_id}/variant_categories/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "id": "variant_category_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "title": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "title"
  ],
  "nativeFields": [
    "title"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### delete_variant_category

Delete variant category. Reviewed native DELETE /products/:product_id/variant_categories/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli delete-variant-category --help
gumroad-cli schema delete-variant-category
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "variant_category_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **DELETE /products/{product_id}/variant_categories/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "delete_variant_category",
  "title": "Delete variant category",
  "description": "Delete variant category. Reviewed native DELETE /products/:product_id/variant_categories/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Variants",
  "method": "DELETE",
  "path": "/products/{product_id}/variant_categories/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "id": "variant_category_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "variant_category_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### list_variant_categories

List variant categories. Reviewed native GET /products/:product_id/variant_categories; scope: edit_products. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-variant-categories --help
gumroad-cli schema list-variant-categories
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/variant_categories**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_variant_categories",
  "title": "List variant categories",
  "description": "List variant categories. Reviewed native GET /products/:product_id/variant_categories; scope: edit_products. Read only; no local effect approval required.",
  "group": "Variants",
  "method": "GET",
  "path": "/products/{product_id}/variant_categories",
  "pathKeys": {
    "product_id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### create_variant

Create variant. Reviewed native POST /products/:product_id/variant_categories/:variant_category_id/variants; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Required | Reviewed current contract value. {"maxLength": 65536} |
| `price_difference_cents` | integer | Required | Reviewed current contract value. {"minimum": -9007199254740991, "maximum": 9007199254740991} |
| `max_purchase_count` | integer | Optional | (optional) {"minimum": 0, "maximum": 9007199254740991} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli create-variant --help
gumroad-cli schema create-variant
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    },
    "price_difference_cents": {
      "type": "integer",
      "description": "",
      "minimum": -9007199254740991,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "name",
    "price_difference_cents"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /products/{product_id}/variant_categories/{variant_category_id}/variants**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "create_variant",
  "title": "Create variant",
  "description": "Create variant. Reviewed native POST /products/:product_id/variant_categories/:variant_category_id/variants; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Variants",
  "method": "POST",
  "path": "/products/{product_id}/variant_categories/{variant_category_id}/variants",
  "pathKeys": {
    "product_id": "product_id",
    "variant_category_id": "variant_category_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    },
    "price_difference_cents": {
      "type": "integer",
      "description": "",
      "minimum": -9007199254740991,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "name",
    "price_difference_cents"
  ],
  "nativeFields": [
    "name",
    "price_difference_cents",
    "max_purchase_count"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### get_variant

Get variant. Reviewed native GET /products/:product_id/variant_categories/:variant_category_id/variants/:id; scope: edit_products. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-variant --help
gumroad-cli schema get-variant
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "variant_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/variant_categories/{variant_category_id}/variants/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_variant",
  "title": "Get variant",
  "description": "Get variant. Reviewed native GET /products/:product_id/variant_categories/:variant_category_id/variants/:id; scope: edit_products. Read only; no local effect approval required.",
  "group": "Variants",
  "method": "GET",
  "path": "/products/{product_id}/variant_categories/{variant_category_id}/variants/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "variant_category_id": "variant_category_id",
    "id": "variant_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "variant_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### update_variant

Update variant. Reviewed native PUT /products/:product_id/variant_categories/:variant_category_id/variants/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Optional | Reviewed current contract value. {"minLength": 1, "maxLength": 65536} |
| `price_difference_cents` | integer | Optional | Reviewed current contract value. {"minimum": -9007199254740991, "maximum": 9007199254740991} |
| `max_purchase_count` | integer | Optional | (optional) {"minimum": 0, "maximum": 9007199254740991} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli update-variant --help
gumroad-cli schema update-variant
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "",
      "minLength": 1
    },
    "price_difference_cents": {
      "type": "integer",
      "description": "",
      "minimum": -9007199254740991,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "variant_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /products/{product_id}/variant_categories/{variant_category_id}/variants/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "update_variant",
  "title": "Update variant",
  "description": "Update variant. Reviewed native PUT /products/:product_id/variant_categories/:variant_category_id/variants/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Variants",
  "method": "PUT",
  "path": "/products/{product_id}/variant_categories/{variant_category_id}/variants/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "variant_category_id": "variant_category_id",
    "id": "variant_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "",
      "minLength": 1
    },
    "price_difference_cents": {
      "type": "integer",
      "description": "",
      "minimum": -9007199254740991,
      "maximum": 9007199254740991
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "variant_id"
  ],
  "nativeFields": [
    "name",
    "price_difference_cents",
    "max_purchase_count"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### delete_variant

Delete variant. Reviewed native DELETE /products/:product_id/variant_categories/:variant_category_id/variants/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli delete-variant --help
gumroad-cli schema delete-variant
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "variant_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **DELETE /products/{product_id}/variant_categories/{variant_category_id}/variants/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "delete_variant",
  "title": "Delete variant",
  "description": "Delete variant. Reviewed native DELETE /products/:product_id/variant_categories/:variant_category_id/variants/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "Variants",
  "method": "DELETE",
  "path": "/products/{product_id}/variant_categories/{variant_category_id}/variants/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "variant_category_id": "variant_category_id",
    "id": "variant_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "variant_category_id",
    "variant_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### list_variants

List variants. Reviewed native GET /products/:product_id/variant_categories/:variant_category_id/variants; scope: edit_products. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `variant_category_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-variants --help
gumroad-cli schema list-variants
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id",
    "variant_category_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/variant_categories/{variant_category_id}/variants**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_variants",
  "title": "List variants",
  "description": "List variants. Reviewed native GET /products/:product_id/variant_categories/:variant_category_id/variants; scope: edit_products. Read only; no local effect approval required.",
  "group": "Variants",
  "method": "GET",
  "path": "/products/{product_id}/variant_categories/{variant_category_id}/variants",
  "pathKeys": {
    "product_id": "product_id",
    "variant_category_id": "variant_category_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "variant_category_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "variant_category_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Variants.tsx"
}
~~~

#### list_offer_codes

List offer codes. Reviewed native GET /products/:product_id/offer_codes; scope: edit_products. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-offer-codes --help
gumroad-cli schema list-offer-codes
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/offer_codes**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_offer_codes",
  "title": "List offer codes",
  "description": "List offer codes. Reviewed native GET /products/:product_id/offer_codes; scope: edit_products. Read only; no local effect approval required.",
  "group": "OfferCodes",
  "method": "GET",
  "path": "/products/{product_id}/offer_codes",
  "pathKeys": {
    "product_id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx"
}
~~~

#### get_offer_code

Get offer code. Reviewed native GET /products/:product_id/offer_codes/:id; scope: edit_products. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `offer_code_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-offer-code --help
gumroad-cli schema get-offer-code
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "offer_code_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id",
    "offer_code_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/offer_codes/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_offer_code",
  "title": "Get offer code",
  "description": "Get offer code. Reviewed native GET /products/:product_id/offer_codes/:id; scope: edit_products. Read only; no local effect approval required.",
  "group": "OfferCodes",
  "method": "GET",
  "path": "/products/{product_id}/offer_codes/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "id": "offer_code_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "offer_code_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "offer_code_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx"
}
~~~

#### create_offer_code

Create offer code. Reviewed native POST /products/:product_id/offer_codes; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Required | (the coupon code used at checkout) {"maxLength": 65536} |
| `amount_off` | integer | Required | Reviewed current contract value. {"minimum": 0, "maximum": 9007199254740991} |
| `offer_type` | string | Optional | (optional, "cents" or "percent") Default: "cents" {"enum": ["cents", "percent"]} |
| `max_purchase_count` | integer | Optional | (optional) {"minimum": 0, "maximum": 9007199254740991} |
| `minimum_amount_cents` | integer | Optional | (optional) Minimum order total in cents required for the offer code to apply {"minimum": 0, "maximum": 9007199254740991} |
| `universal` | boolean | Optional | (optional, true or false) Default: false |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli create-offer-code --help
gumroad-cli schema create-offer-code
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(the coupon code used at checkout)"
    },
    "amount_off": {
      "type": "integer",
      "description": "",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "offer_type": {
      "type": "string",
      "enum": [
        "cents",
        "percent"
      ],
      "description": "(optional, \"cents\" or \"percent\") Default: \"cents\""
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "minimum_amount_cents": {
      "type": "integer",
      "description": "(optional) Minimum order total in cents required for the offer code to apply",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "universal": {
      "type": "boolean",
      "description": "(optional, true or false) Default: false"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "name",
    "amount_off"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /products/{product_id}/offer_codes**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "create_offer_code",
  "title": "Create offer code",
  "description": "Create offer code. Reviewed native POST /products/:product_id/offer_codes; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "OfferCodes",
  "method": "POST",
  "path": "/products/{product_id}/offer_codes",
  "pathKeys": {
    "product_id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": "(the coupon code used at checkout)"
    },
    "amount_off": {
      "type": "integer",
      "description": "",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "offer_type": {
      "type": "string",
      "enum": [
        "cents",
        "percent"
      ],
      "description": "(optional, \"cents\" or \"percent\") Default: \"cents\""
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "(optional)",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "minimum_amount_cents": {
      "type": "integer",
      "description": "(optional) Minimum order total in cents required for the offer code to apply",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "universal": {
      "type": "boolean",
      "description": "(optional, true or false) Default: false"
    }
  },
  "required": [
    "product_id",
    "name",
    "amount_off"
  ],
  "nativeFields": [
    "name",
    "amount_off",
    "offer_type",
    "max_purchase_count",
    "minimum_amount_cents",
    "universal"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx"
}
~~~

#### update_offer_code

Update offer code. Reviewed native PUT /products/:product_id/offer_codes/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `offer_code_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `max_purchase_count` | integer | Optional | Reviewed current contract value. {"minimum": 0, "maximum": 9007199254740991} |
| `minimum_amount_cents` | integer | Optional | (optional) Minimum order total in cents required for the offer code to apply {"minimum": 0, "maximum": 9007199254740991} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli update-offer-code --help
gumroad-cli schema update-offer-code
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "offer_code_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "minimum_amount_cents": {
      "type": "integer",
      "description": "(optional) Minimum order total in cents required for the offer code to apply",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "offer_code_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /products/{product_id}/offer_codes/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "update_offer_code",
  "title": "Update offer code",
  "description": "Update offer code. Reviewed native PUT /products/:product_id/offer_codes/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "OfferCodes",
  "method": "PUT",
  "path": "/products/{product_id}/offer_codes/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "id": "offer_code_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "offer_code_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "max_purchase_count": {
      "type": "integer",
      "description": "",
      "minimum": 0,
      "maximum": 9007199254740991
    },
    "minimum_amount_cents": {
      "type": "integer",
      "description": "(optional) Minimum order total in cents required for the offer code to apply",
      "minimum": 0,
      "maximum": 9007199254740991
    }
  },
  "required": [
    "product_id",
    "offer_code_id"
  ],
  "nativeFields": [
    "max_purchase_count",
    "minimum_amount_cents"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx"
}
~~~

#### delete_offer_code

Delete offer code. Reviewed native DELETE /products/:product_id/offer_codes/:id; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `offer_code_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli delete-offer-code --help
gumroad-cli schema delete-offer-code
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "offer_code_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "offer_code_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **DELETE /products/{product_id}/offer_codes/{id}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "delete_offer_code",
  "title": "Delete offer code",
  "description": "Delete offer code. Reviewed native DELETE /products/:product_id/offer_codes/:id; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "OfferCodes",
  "method": "DELETE",
  "path": "/products/{product_id}/offer_codes/{id}",
  "pathKeys": {
    "product_id": "product_id",
    "id": "offer_code_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "offer_code_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id",
    "offer_code_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/OfferCodes.tsx"
}
~~~

#### list_custom_fields

List custom fields. Reviewed native GET /products/:product_id/custom_fields; scope: edit_products. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-custom-fields --help
gumroad-cli schema list-custom-fields
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /products/{product_id}/custom_fields**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_custom_fields",
  "title": "List custom fields",
  "description": "List custom fields. Reviewed native GET /products/:product_id/custom_fields; scope: edit_products. Read only; no local effect approval required.",
  "group": "CustomFields",
  "method": "GET",
  "path": "/products/{product_id}/custom_fields",
  "pathKeys": {
    "product_id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [],
  "risk": "read",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx"
}
~~~

#### create_custom_field

Create custom field. Reviewed native POST /products/:product_id/custom_fields; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Required | Reviewed current contract value. {"maxLength": 65536} |
| `required` | boolean | Required | (true or false) |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli create-custom-field --help
gumroad-cli schema create-custom-field
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    },
    "required": {
      "type": "boolean",
      "description": "(true or false)"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "name",
    "required"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /products/{product_id}/custom_fields**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "create_custom_field",
  "title": "Create custom field",
  "description": "Create custom field. Reviewed native POST /products/:product_id/custom_fields; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "CustomFields",
  "method": "POST",
  "path": "/products/{product_id}/custom_fields",
  "pathKeys": {
    "product_id": "product_id"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 65536,
      "description": ""
    },
    "required": {
      "type": "boolean",
      "description": "(true or false)"
    }
  },
  "required": [
    "product_id",
    "name",
    "required"
  ],
  "nativeFields": [
    "name",
    "required"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx"
}
~~~

#### update_custom_field

Update custom field. Reviewed native PUT /products/:product_id/custom_fields/:name; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Required | Exact existing field name; encoded as one URL segment. {"minLength": 1, "maxLength": 256} |
| `required` | boolean | Required | (true or false) |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli update-custom-field --help
gumroad-cli schema update-custom-field
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact existing field name; encoded as one URL segment.",
      "minLength": 1
    },
    "required": {
      "type": "boolean",
      "description": "(true or false)"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "name",
    "required"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /products/{product_id}/custom_fields/{name}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "update_custom_field",
  "title": "Update custom field",
  "description": "Update custom field. Reviewed native PUT /products/:product_id/custom_fields/:name; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "CustomFields",
  "method": "PUT",
  "path": "/products/{product_id}/custom_fields/{name}",
  "pathKeys": {
    "product_id": "product_id",
    "name": "name"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact existing field name; encoded as one URL segment.",
      "minLength": 1
    },
    "required": {
      "type": "boolean",
      "description": "(true or false)"
    }
  },
  "required": [
    "product_id",
    "name",
    "required"
  ],
  "nativeFields": [
    "required"
  ],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx"
}
~~~

#### delete_custom_field

Delete custom field. Reviewed native DELETE /products/:product_id/custom_fields/:name; scope: edit_products. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Required | Exact existing field name; encoded as one URL segment. {"minLength": 1, "maxLength": 256} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli delete-custom-field --help
gumroad-cli schema delete-custom-field
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact existing field name; encoded as one URL segment.",
      "minLength": 1
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id",
    "name"
  ],
  "additionalProperties": false
}
~~~

Native request: **DELETE /products/{product_id}/custom_fields/{name}**. Authentication/scope: edit_products. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "delete_custom_field",
  "title": "Delete custom field",
  "description": "Delete custom field. Reviewed native DELETE /products/:product_id/custom_fields/:name; scope: edit_products. Requires explicit per-call confirmation.",
  "group": "CustomFields",
  "method": "DELETE",
  "path": "/products/{product_id}/custom_fields/{name}",
  "pathKeys": {
    "product_id": "product_id",
    "name": "name"
  },
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "name": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact existing field name; encoded as one URL segment.",
      "minLength": 1
    }
  },
  "required": [
    "product_id",
    "name"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "edit_products",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/CustomFields.tsx"
}
~~~

#### create_resource_subscription

Create resource subscription. Reviewed native PUT /resource_subscriptions; scope: view_sales for sale event; provider authorization for other events. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `resource_name` | string | Required | Exact native event to subscribe to. {"enum": ["sale", "refund", "dispute", "dispute_won", "cancellation", "subscription_updated", "subscription_ended", "subscription_restarted"]} |
| `post_url` | string | Required | Intended HTTPS callback; provider posts private customer events. {"maxLength": 65536, "format": "uri"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli create-resource-subscription --help
gumroad-cli schema create-resource-subscription
~~~

~~~json
{
  "type": "object",
  "properties": {
    "resource_name": {
      "type": "string",
      "enum": [
        "sale",
        "refund",
        "dispute",
        "dispute_won",
        "cancellation",
        "subscription_updated",
        "subscription_ended",
        "subscription_restarted"
      ],
      "description": "Exact native event to subscribe to."
    },
    "post_url": {
      "type": "string",
      "maxLength": 65536,
      "description": "Intended HTTPS callback; provider posts private customer events.",
      "format": "uri"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "resource_name",
    "post_url"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /resource_subscriptions**. Authentication/scope: view_sales for sale event; provider authorization for other events. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/ResourceSubscriptions.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "create_resource_subscription",
  "title": "Create resource subscription",
  "description": "Create resource subscription. Reviewed native PUT /resource_subscriptions; scope: view_sales for sale event; provider authorization for other events. Requires explicit per-call confirmation.",
  "group": "ResourceSubscriptions",
  "method": "PUT",
  "path": "/resource_subscriptions",
  "pathKeys": {},
  "properties": {
    "resource_name": {
      "type": "string",
      "enum": [
        "sale",
        "refund",
        "dispute",
        "dispute_won",
        "cancellation",
        "subscription_updated",
        "subscription_ended",
        "subscription_restarted"
      ],
      "description": "Exact native event to subscribe to."
    },
    "post_url": {
      "type": "string",
      "maxLength": 65536,
      "description": "Intended HTTPS callback; provider posts private customer events.",
      "format": "uri"
    }
  },
  "required": [
    "resource_name",
    "post_url"
  ],
  "nativeFields": [
    "resource_name",
    "post_url"
  ],
  "risk": "destructive",
  "scope": "view_sales for sale event; provider authorization for other events",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/ResourceSubscriptions.tsx"
}
~~~

#### list_resource_subscriptions

List resource subscriptions. Reviewed native GET /resource_subscriptions; scope: view_sales for sale event; provider authorization for other events. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `resource_name` | string | Required | (string) - Currently there are 8 supported values - "sale", "refund", "dispute", "dispute_won", "cancellation", "subscription_updated", "subscription_ended", and "subscription_restarted". {"enum": ["sale", "refund", "dispute", "dispute_won", "cancellation", "subscription_updated", "subscription_ended", "subscription_restarted"]} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-resource-subscriptions --help
gumroad-cli schema list-resource-subscriptions
~~~

~~~json
{
  "type": "object",
  "properties": {
    "resource_name": {
      "type": "string",
      "enum": [
        "sale",
        "refund",
        "dispute",
        "dispute_won",
        "cancellation",
        "subscription_updated",
        "subscription_ended",
        "subscription_restarted"
      ],
      "description": "(string) - Currently there are 8 supported values - \"sale\", \"refund\", \"dispute\", \"dispute_won\", \"cancellation\", \"subscription_updated\", \"subscription_ended\", and \"subscription_restarted\"."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "resource_name"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /resource_subscriptions**. Authentication/scope: view_sales for sale event; provider authorization for other events. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/ResourceSubscriptions.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_resource_subscriptions",
  "title": "List resource subscriptions",
  "description": "List resource subscriptions. Reviewed native GET /resource_subscriptions; scope: view_sales for sale event; provider authorization for other events. Read only; no local effect approval required.",
  "group": "ResourceSubscriptions",
  "method": "GET",
  "path": "/resource_subscriptions",
  "pathKeys": {},
  "properties": {
    "resource_name": {
      "type": "string",
      "enum": [
        "sale",
        "refund",
        "dispute",
        "dispute_won",
        "cancellation",
        "subscription_updated",
        "subscription_ended",
        "subscription_restarted"
      ],
      "description": "(string) - Currently there are 8 supported values - \"sale\", \"refund\", \"dispute\", \"dispute_won\", \"cancellation\", \"subscription_updated\", \"subscription_ended\", and \"subscription_restarted\"."
    }
  },
  "required": [
    "resource_name"
  ],
  "nativeFields": [
    "resource_name"
  ],
  "risk": "read",
  "scope": "view_sales for sale event; provider authorization for other events",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/ResourceSubscriptions.tsx"
}
~~~

#### delete_resource_subscription

Delete resource subscription. Reviewed native DELETE /resource_subscriptions/:resource_subscription_id; scope: view_sales for sale event; provider authorization for other events. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `resource_subscription_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli delete-resource-subscription --help
gumroad-cli schema delete-resource-subscription
~~~

~~~json
{
  "type": "object",
  "properties": {
    "resource_subscription_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "resource_subscription_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **DELETE /resource_subscriptions/{resource_subscription_id}**. Authentication/scope: view_sales for sale event; provider authorization for other events. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/ResourceSubscriptions.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "delete_resource_subscription",
  "title": "Delete resource subscription",
  "description": "Delete resource subscription. Reviewed native DELETE /resource_subscriptions/:resource_subscription_id; scope: view_sales for sale event; provider authorization for other events. Requires explicit per-call confirmation.",
  "group": "ResourceSubscriptions",
  "method": "DELETE",
  "path": "/resource_subscriptions/{resource_subscription_id}",
  "pathKeys": {
    "resource_subscription_id": "resource_subscription_id"
  },
  "properties": {
    "resource_subscription_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "resource_subscription_id"
  ],
  "nativeFields": [],
  "risk": "destructive",
  "scope": "view_sales for sale event; provider authorization for other events",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/ResourceSubscriptions.tsx"
}
~~~

#### get_refund_policy

Get refund policy. Reviewed native GET /refund_policy; scope: account. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-refund-policy --help
gumroad-cli schema get-refund-policy
~~~

~~~json
{
  "type": "object",
  "properties": {
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [],
  "additionalProperties": false
}
~~~

Native request: **GET /refund_policy**. Authentication/scope: account. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/RefundPolicy.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_refund_policy",
  "title": "Get refund policy",
  "description": "Get refund policy. Reviewed native GET /refund_policy; scope: account. Read only; no local effect approval required.",
  "group": "RefundPolicy",
  "method": "GET",
  "path": "/refund_policy",
  "pathKeys": {},
  "properties": {},
  "required": [],
  "nativeFields": [],
  "risk": "read",
  "scope": "account",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/RefundPolicy.tsx"
}
~~~

#### update_refund_policy

Update refund policy. Reviewed native PUT /refund_policy; scope: account. Requires explicit per-call confirmation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `refund_period` | string | Required | Required. One of "none", "7", "14", "30", or "183". {"enum": ["none", "7", "14", "30", "183"]} |
| `fine_print` | string | Optional | Optional. Max 3000 characters. HTML is stripped. Send an empty value to clear it. {"maxLength": 3000} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli update-refund-policy --help
gumroad-cli schema update-refund-policy
~~~

~~~json
{
  "type": "object",
  "properties": {
    "refund_period": {
      "type": "string",
      "enum": [
        "none",
        "7",
        "14",
        "30",
        "183"
      ],
      "description": "Required. One of \"none\", \"7\", \"14\", \"30\", or \"183\"."
    },
    "fine_print": {
      "type": "string",
      "maxLength": 3000,
      "description": "Optional. Max 3000 characters. HTML is stripped. Send an empty value to clear it."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "refund_period"
  ],
  "additionalProperties": false
}
~~~

Native request: **PUT /refund_policy**. Authentication/scope: account. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/RefundPolicy.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "update_refund_policy",
  "title": "Update refund policy",
  "description": "Update refund policy. Reviewed native PUT /refund_policy; scope: account. Requires explicit per-call confirmation.",
  "group": "RefundPolicy",
  "method": "PUT",
  "path": "/refund_policy",
  "pathKeys": {},
  "properties": {
    "refund_period": {
      "type": "string",
      "enum": [
        "none",
        "7",
        "14",
        "30",
        "183"
      ],
      "description": "Required. One of \"none\", \"7\", \"14\", \"30\", or \"183\"."
    },
    "fine_print": {
      "type": "string",
      "maxLength": 3000,
      "description": "Optional. Max 3000 characters. HTML is stripped. Send an empty value to clear it."
    }
  },
  "required": [
    "refund_period"
  ],
  "nativeFields": [
    "refund_period",
    "fine_print"
  ],
  "risk": "destructive",
  "scope": "account",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/RefundPolicy.tsx"
}
~~~

#### list_payouts

List payouts. Reviewed native GET /payouts; scope: view_payouts. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `after` | string | Optional | (optional, date in form YYYY-MM-DD) - Only return payouts after this date {"maxLength": 65536, "format": "date"} |
| `before` | string | Optional | (optional, date in form YYYY-MM-DD) - Only return payouts before this date {"maxLength": 65536, "format": "date"} |
| `page_key` | string | Optional | (optional) - A key representing a page of results. It is given in the response as `next_page_key`. {"maxLength": 65536} |
| `include_upcoming` | boolean | Optional | (optional, default: "true") - Set to "false" to exclude the upcoming payout from the response. |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli list-payouts --help
gumroad-cli schema list-payouts
~~~

~~~json
{
  "type": "object",
  "properties": {
    "after": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return payouts after this date",
      "format": "date"
    },
    "before": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return payouts before this date",
      "format": "date"
    },
    "page_key": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - A key representing a page of results. It is given in the response as `next_page_key`."
    },
    "include_upcoming": {
      "type": "boolean",
      "description": "(optional, default: \"true\") - Set to \"false\" to exclude the upcoming payout from the response."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [],
  "additionalProperties": false
}
~~~

Native request: **GET /payouts**. Authentication/scope: view_payouts. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Payouts.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "list_payouts",
  "title": "List payouts",
  "description": "List payouts. Reviewed native GET /payouts; scope: view_payouts. Read only; no local effect approval required.",
  "group": "Payouts",
  "method": "GET",
  "path": "/payouts",
  "pathKeys": {},
  "properties": {
    "after": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return payouts after this date",
      "format": "date"
    },
    "before": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional, date in form YYYY-MM-DD) - Only return payouts before this date",
      "format": "date"
    },
    "page_key": {
      "type": "string",
      "maxLength": 65536,
      "description": "(optional) - A key representing a page of results. It is given in the response as `next_page_key`."
    },
    "include_upcoming": {
      "type": "boolean",
      "description": "(optional, default: \"true\") - Set to \"false\" to exclude the upcoming payout from the response."
    }
  },
  "required": [],
  "nativeFields": [
    "after",
    "before",
    "page_key",
    "include_upcoming"
  ],
  "risk": "read",
  "scope": "view_payouts",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": "payouts",
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Payouts.tsx"
}
~~~

#### get_payout

Get payout. Reviewed native GET /payouts/:id; scope: view_payouts. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `payout_id` | string | Required | Exact opaque provider ID, including native = padding. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `include_sales` | boolean | Optional | (optional, default: "true") - Set to "false" to exclude the "sales", "refunded_sales", and "disputed_sales" details from the response. |
| `include_transactions` | boolean | Optional | (optional, default: "false") - Set to "true" to include the same transaction details in the response as exported payout CSV. All balance-affecting transactions included in the payout will be listed in a "transactions" array. Each transaction will have these keys: { type:, date:, purchase_id:, item_name:, buyer_name:, buyer_email:, taxes:, shipping:, sale_price:, gumroad_fees:, net_total: }. The "type" of transactions can be "Sale", "Chargeback", "Full Refund", "Partial Refund", "PayPal Refund", "Stripe Connect Refund", "Affiliate Credit", "PayPal Connect Affiliate Fees", "Stripe Connect Affiliate Fees", "PayPal Payouts", "Stripe Connect Payouts", "Credit", "Payout Fee", and "Technical Adjustment". |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-payout --help
gumroad-cli schema get-payout
~~~

~~~json
{
  "type": "object",
  "properties": {
    "payout_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "include_sales": {
      "type": "boolean",
      "description": "(optional, default: \"true\") - Set to \"false\" to exclude the \"sales\", \"refunded_sales\", and \"disputed_sales\" details from the response."
    },
    "include_transactions": {
      "type": "boolean",
      "description": "(optional, default: \"false\") - Set to \"true\" to include the same transaction details in the response as exported payout CSV. All balance-affecting transactions included in the payout will be listed in a \"transactions\" array. Each transaction will have these keys: { type:, date:, purchase_id:, item_name:, buyer_name:, buyer_email:, taxes:, shipping:, sale_price:, gumroad_fees:, net_total: }. The \"type\" of transactions can be \"Sale\", \"Chargeback\", \"Full Refund\", \"Partial Refund\", \"PayPal Refund\", \"Stripe Connect Refund\", \"Affiliate Credit\", \"PayPal Connect Affiliate Fees\", \"Stripe Connect Affiliate Fees\", \"PayPal Payouts\", \"Stripe Connect Payouts\", \"Credit\", \"Payout Fee\", and \"Technical Adjustment\"."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "payout_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **GET /payouts/{id}**. Authentication/scope: view_payouts. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Payouts.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_payout",
  "title": "Get payout",
  "description": "Get payout. Reviewed native GET /payouts/:id; scope: view_payouts. Read only; no local effect approval required.",
  "group": "Payouts",
  "method": "GET",
  "path": "/payouts/{id}",
  "pathKeys": {
    "id": "payout_id"
  },
  "properties": {
    "payout_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Exact opaque provider ID, including native = padding.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "include_sales": {
      "type": "boolean",
      "description": "(optional, default: \"true\") - Set to \"false\" to exclude the \"sales\", \"refunded_sales\", and \"disputed_sales\" details from the response."
    },
    "include_transactions": {
      "type": "boolean",
      "description": "(optional, default: \"false\") - Set to \"true\" to include the same transaction details in the response as exported payout CSV. All balance-affecting transactions included in the payout will be listed in a \"transactions\" array. Each transaction will have these keys: { type:, date:, purchase_id:, item_name:, buyer_name:, buyer_email:, taxes:, shipping:, sale_price:, gumroad_fees:, net_total: }. The \"type\" of transactions can be \"Sale\", \"Chargeback\", \"Full Refund\", \"Partial Refund\", \"PayPal Refund\", \"Stripe Connect Refund\", \"Affiliate Credit\", \"PayPal Connect Affiliate Fees\", \"Stripe Connect Affiliate Fees\", \"PayPal Payouts\", \"Stripe Connect Payouts\", \"Credit\", \"Payout Fee\", and \"Technical Adjustment\"."
    }
  },
  "required": [
    "payout_id"
  ],
  "nativeFields": [
    "include_sales",
    "include_transactions"
  ],
  "risk": "read",
  "scope": "view_payouts",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Payouts.tsx"
}
~~~

#### get_upcoming_payout

Get upcoming payout. Reviewed native GET /payouts/upcoming; scope: view_payouts. Read only; no local effect approval required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `include_sales` | boolean | Optional | (optional, default: "true") - Set to "false" to exclude the "sales", "refunded_sales", and "disputed_sales" details from the response. |
| `include_transactions` | boolean | Optional | (optional, default: "false") - Set to "true" to include the same transaction details in the response as exported payout CSV. All balance-affecting transactions included in the payout will be listed in a "transactions" array. Each transaction will have these keys: { type:, date:, purchase_id:, item_name:, buyer_name:, buyer_email:, taxes:, shipping:, sale_price:, gumroad_fees:, net_total: }. The "type" of transactions can be "Sale", "Chargeback", "Full Refund", "Partial Refund", "PayPal Refund", "Stripe Connect Refund", "Affiliate Credit", "PayPal Connect Affiliate Fees", "Stripe Connect Affiliate Fees", "PayPal Payouts", "Stripe Connect Payouts", "Credit", "Payout Fee", and "Technical Adjustment". |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-upcoming-payout --help
gumroad-cli schema get-upcoming-payout
~~~

~~~json
{
  "type": "object",
  "properties": {
    "include_sales": {
      "type": "boolean",
      "description": "(optional, default: \"true\") - Set to \"false\" to exclude the \"sales\", \"refunded_sales\", and \"disputed_sales\" details from the response."
    },
    "include_transactions": {
      "type": "boolean",
      "description": "(optional, default: \"false\") - Set to \"true\" to include the same transaction details in the response as exported payout CSV. All balance-affecting transactions included in the payout will be listed in a \"transactions\" array. Each transaction will have these keys: { type:, date:, purchase_id:, item_name:, buyer_name:, buyer_email:, taxes:, shipping:, sale_price:, gumroad_fees:, net_total: }. The \"type\" of transactions can be \"Sale\", \"Chargeback\", \"Full Refund\", \"Partial Refund\", \"PayPal Refund\", \"Stripe Connect Refund\", \"Affiliate Credit\", \"PayPal Connect Affiliate Fees\", \"Stripe Connect Affiliate Fees\", \"PayPal Payouts\", \"Stripe Connect Payouts\", \"Credit\", \"Payout Fee\", and \"Technical Adjustment\"."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [],
  "additionalProperties": false
}
~~~

Native request: **GET /payouts/upcoming**. Authentication/scope: view_payouts. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Payouts.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "get_upcoming_payout",
  "title": "Get upcoming payout",
  "description": "Get upcoming payout. Reviewed native GET /payouts/upcoming; scope: view_payouts. Read only; no local effect approval required.",
  "group": "Payouts",
  "method": "GET",
  "path": "/payouts/upcoming",
  "pathKeys": {},
  "properties": {
    "include_sales": {
      "type": "boolean",
      "description": "(optional, default: \"true\") - Set to \"false\" to exclude the \"sales\", \"refunded_sales\", and \"disputed_sales\" details from the response."
    },
    "include_transactions": {
      "type": "boolean",
      "description": "(optional, default: \"false\") - Set to \"true\" to include the same transaction details in the response as exported payout CSV. All balance-affecting transactions included in the payout will be listed in a \"transactions\" array. Each transaction will have these keys: { type:, date:, purchase_id:, item_name:, buyer_name:, buyer_email:, taxes:, shipping:, sale_price:, gumroad_fees:, net_total: }. The \"type\" of transactions can be \"Sale\", \"Chargeback\", \"Full Refund\", \"Partial Refund\", \"PayPal Refund\", \"Stripe Connect Refund\", \"Affiliate Credit\", \"PayPal Connect Affiliate Fees\", \"Stripe Connect Affiliate Fees\", \"PayPal Payouts\", \"Stripe Connect Payouts\", \"Credit\", \"Payout Fee\", and \"Technical Adjustment\"."
    }
  },
  "required": [],
  "nativeFields": [
    "include_sales",
    "include_transactions"
  ],
  "risk": "read",
  "scope": "view_payouts",
  "licenseAPI": false,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Payouts.tsx"
}
~~~

#### increment_license_uses

Verify the intended private license and increment its native usage counter. Explicit confirmation required; no OAuth required.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Current native product ID, never deprecated permalink. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |

~~~bash
gumroad-cli increment-license-uses --help
gumroad-cli schema increment-license-uses
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Current native product ID, never deprecated permalink.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    }
  },
  "required": [
    "product_id"
  ],
  "additionalProperties": false
}
~~~

Native request: **POST /licenses/verify**. Authentication/scope: No OAuth required. [Pinned official source](https://github.com/antiwork/gumroad/blob/0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f/app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx). Native fields are URL query for GET or form fields for effects. Private license credentials and forced verify increment flag are supplied internally; account/confirm/full_refund/output_file are local controls.

~~~json
{
  "name": "increment_license_uses",
  "title": "Verify and increment license uses",
  "description": "Verify the intended private license and increment its native usage counter. Explicit confirmation required; no OAuth required.",
  "group": "Licenses",
  "method": "POST",
  "path": "/licenses/verify",
  "pathKeys": {},
  "properties": {
    "product_id": {
      "type": "string",
      "maxLength": 256,
      "description": "Current native product ID, never deprecated permalink.",
      "minLength": 1,
      "pattern": "^[A-Za-z0-9_=-]+$"
    }
  },
  "required": [
    "product_id"
  ],
  "nativeFields": [
    "product_id"
  ],
  "risk": "destructive",
  "scope": "No OAuth required",
  "licenseAPI": true,
  "privateOutput": false,
  "collection": null,
  "sourceFile": "app/javascript/components/ApiDocumentation/Endpoints/Licenses.tsx"
}
~~~

#### get_custom_field

Compatibility read using documented list_custom_fields then exact field-name match. There is no native single-custom-field GET endpoint.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `product_id` | string | Required | Reviewed current contract value. {"minLength": 1, "maxLength": 256, "pattern": "^[A-Za-z0-9_=-]+$"} |
| `name` | string | Required | Reviewed current contract value. {"minLength": 1, "maxLength": 256} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli get-custom-field --help
gumroad-cli schema get-custom-field
~~~

~~~json
{
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "pattern": "^[A-Za-z0-9_=-]+$",
      "minLength": 1,
      "maxLength": 256
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "product_id",
    "name"
  ],
  "additionalProperties": false
}
~~~

#### list_accounts

Local profile labels/default and credential availability only. No secrets, file paths, provider identity or network.

This local command takes no arguments.

~~~bash
gumroad-cli list-accounts --help
gumroad-cli schema list-accounts
~~~

~~~json
{
  "type": "object",
  "properties": {},
  "required": [],
  "additionalProperties": false
}
~~~

#### get_operation_schema

Local native method/path, fields, scopes and pinned provenance. Field subset, not an official OpenAPI document or permission proof.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `operation` | string | Required | Reviewed current contract value. {"enum": ["get_user", "list_categories", "list_products", "get_product", "create_product", "update_product", "delete_product", "enable_product", "disable_product", "list_sales", "get_sale", "mark_sale_as_shipped", "refund_sale", "revoke_sale_access", "restore_sale_access", "resend_sale_receipt", "list_subscribers", "get_subscriber", "verify_license", "enable_license", "disable_license", "decrement_license_uses", "rotate_license", "create_variant_category", "get_variant_category", "update_variant_category", "delete_variant_category", "list_variant_categories", "create_variant", "get_variant", "update_variant", "delete_variant", "list_variants", "list_offer_codes", "get_offer_code", "create_offer_code", "update_offer_code", "delete_offer_code", "list_custom_fields", "create_custom_field", "update_custom_field", "delete_custom_field", "create_resource_subscription", "list_resource_subscriptions", "delete_resource_subscription", "get_refund_policy", "update_refund_policy", "list_payouts", "get_payout", "get_upcoming_payout", "increment_license_uses"]} |

~~~bash
gumroad-cli get-operation-schema --help
gumroad-cli schema get-operation-schema
~~~

~~~json
{
  "type": "object",
  "properties": {
    "operation": {
      "type": "string",
      "enum": [
        "get_user",
        "list_categories",
        "list_products",
        "get_product",
        "create_product",
        "update_product",
        "delete_product",
        "enable_product",
        "disable_product",
        "list_sales",
        "get_sale",
        "mark_sale_as_shipped",
        "refund_sale",
        "revoke_sale_access",
        "restore_sale_access",
        "resend_sale_receipt",
        "list_subscribers",
        "get_subscriber",
        "verify_license",
        "enable_license",
        "disable_license",
        "decrement_license_uses",
        "rotate_license",
        "create_variant_category",
        "get_variant_category",
        "update_variant_category",
        "delete_variant_category",
        "list_variant_categories",
        "create_variant",
        "get_variant",
        "update_variant",
        "delete_variant",
        "list_variants",
        "list_offer_codes",
        "get_offer_code",
        "create_offer_code",
        "update_offer_code",
        "delete_offer_code",
        "list_custom_fields",
        "create_custom_field",
        "update_custom_field",
        "delete_custom_field",
        "create_resource_subscription",
        "list_resource_subscriptions",
        "delete_resource_subscription",
        "get_refund_policy",
        "update_refund_policy",
        "list_payouts",
        "get_payout",
        "get_upcoming_payout",
        "increment_license_uses"
      ]
    }
  },
  "required": [
    "operation"
  ],
  "additionalProperties": false
}
~~~

#### preview_commerce_batch

Local validation/hash binding exact ordered requests/profile label/native snapshot. No provider requests, secret loading, ownership/state validation or financial guarantee.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `tasks` | array | Required | One to twenty exact ordered native effects. No replacement-key output. Nested arguments cannot override profile/confirmation or carry credentials/files. {"minItems": 1, "maxItems": 20} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |

~~~bash
gumroad-cli preview-commerce-batch --help
gumroad-cli schema preview-commerce-batch
~~~

~~~json
{
  "type": "object",
  "properties": {
    "tasks": {
      "type": "array",
      "minItems": 1,
      "maxItems": 20,
      "description": "One to twenty exact ordered native effects. No replacement-key output. Nested arguments cannot override profile/confirmation or carry credentials/files.",
      "items": {
        "type": "object",
        "properties": {
          "tool": {
            "type": "string",
            "enum": [
              "create_product",
              "update_product",
              "delete_product",
              "enable_product",
              "disable_product",
              "mark_sale_as_shipped",
              "refund_sale",
              "revoke_sale_access",
              "restore_sale_access",
              "resend_sale_receipt",
              "enable_license",
              "disable_license",
              "decrement_license_uses",
              "create_variant_category",
              "update_variant_category",
              "delete_variant_category",
              "create_variant",
              "update_variant",
              "delete_variant",
              "create_offer_code",
              "update_offer_code",
              "delete_offer_code",
              "create_custom_field",
              "update_custom_field",
              "delete_custom_field",
              "create_resource_subscription",
              "delete_resource_subscription",
              "update_refund_policy",
              "increment_license_uses"
            ]
          },
          "arguments": {
            "type": "object"
          }
        },
        "required": [
          "tool",
          "arguments"
        ],
        "additionalProperties": false
      }
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    }
  },
  "required": [
    "tasks"
  ],
  "additionalProperties": false
}
~~~

#### submit_commerce_batch

Confirmed ordered native effects, all prevalidated before first request, exact hash checked, stops first failure with known/unattempted receipts. No retry or implicit continuation.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `tasks` | array | Required | One to twenty exact ordered native effects. No replacement-key output. Nested arguments cannot override profile/confirmation or carry credentials/files. {"minItems": 1, "maxItems": 20} |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |
| `review_sha256` | string | Required | Reviewed current contract value. {"pattern": "^[a-f0-9]{64}$"} |

~~~bash
gumroad-cli submit-commerce-batch --help
gumroad-cli schema submit-commerce-batch
~~~

~~~json
{
  "type": "object",
  "properties": {
    "tasks": {
      "type": "array",
      "minItems": 1,
      "maxItems": 20,
      "description": "One to twenty exact ordered native effects. No replacement-key output. Nested arguments cannot override profile/confirmation or carry credentials/files.",
      "items": {
        "type": "object",
        "properties": {
          "tool": {
            "type": "string",
            "enum": [
              "create_product",
              "update_product",
              "delete_product",
              "enable_product",
              "disable_product",
              "mark_sale_as_shipped",
              "refund_sale",
              "revoke_sale_access",
              "restore_sale_access",
              "resend_sale_receipt",
              "enable_license",
              "disable_license",
              "decrement_license_uses",
              "create_variant_category",
              "update_variant_category",
              "delete_variant_category",
              "create_variant",
              "update_variant",
              "delete_variant",
              "create_offer_code",
              "update_offer_code",
              "delete_offer_code",
              "create_custom_field",
              "update_custom_field",
              "delete_custom_field",
              "create_resource_subscription",
              "delete_resource_subscription",
              "update_refund_policy",
              "increment_license_uses"
            ]
          },
          "arguments": {
            "type": "object"
          }
        },
        "required": [
          "tool",
          "arguments"
        ],
        "additionalProperties": false
      }
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    },
    "review_sha256": {
      "type": "string",
      "pattern": "^[a-f0-9]{64}$"
    }
  },
  "required": [
    "tasks",
    "review_sha256"
  ],
  "additionalProperties": false
}
~~~

#### export_resources

Confirmed cursor-based JSON export into a new exclusive 0600 private file, with page/item/byte budgets and explicit continuation. No URL following, digital files or atomic backup.

| Argument | Type | Required | Meaning and constraints |
| --- | --- | --- | --- |
| `operation` | string | Required | Reviewed current contract value. {"enum": ["list_products", "list_sales", "list_subscribers", "list_payouts"]} |
| `arguments` | object | Optional | Actual list filters/page_key, no account override. |
| `account` | string | Optional | Exact private profile label; never inherited credentials, ownership or scope proof. |
| `confirm` | boolean | Optional | Explicit approval of this exact native effect or private file output. |
| `start_offset` | integer | Optional | Reviewed current contract value. {"minimum": 0, "maximum": 9999} |
| `max_pages` | integer | Optional | Reviewed current contract value. {"minimum": 1, "maximum": 100} |
| `max_items` | integer | Optional | Reviewed current contract value. {"minimum": 1, "maximum": 10000} |
| `output_file` | string | Required | Reviewed current contract value. {"minLength": 1} |

~~~bash
gumroad-cli export-resources --help
gumroad-cli schema export-resources
~~~

~~~json
{
  "type": "object",
  "properties": {
    "operation": {
      "type": "string",
      "enum": [
        "list_products",
        "list_sales",
        "list_subscribers",
        "list_payouts"
      ]
    },
    "arguments": {
      "type": "object",
      "description": "Actual list filters/page_key, no account override."
    },
    "account": {
      "type": "string",
      "description": "Exact private profile label; never inherited credentials, ownership or scope proof."
    },
    "confirm": {
      "type": "boolean",
      "description": "Explicit approval of this exact native effect or private file output."
    },
    "start_offset": {
      "type": "integer",
      "minimum": 0,
      "maximum": 9999
    },
    "max_pages": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "max_items": {
      "type": "integer",
      "minimum": 1,
      "maximum": 10000
    },
    "output_file": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "operation",
    "output_file"
  ],
  "additionalProperties": false
}
~~~

## 9. Commerce and license workflows

### Inspect products, sales and subscribers before changing anything

Use list_products, get_product and list_categories for the selected seller's catalogue. Product price uses the smallest unit of the declared price_currency_type; use that currency's actual unit, not an assumed USD amount. create_product supports selected current flat fields, tags and draft/published options; review the returned product.published and any warning rather than treating HTTP success as proof that publication finished. Native fields include custom_permalink, not the legacy guessed url/preview_url. Rich-content/file/custom-HTML editing is deliberately outside this companion's selected subset.

~~~bash
gumroad-cli list-products --agent
gumroad-cli get-product --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli list-sales --after 2026-01-01 --before 2026-10-03 --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli list-subscribers --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli schema update-product
~~~

Sales filters use current after/before/email/order_id/name/product_id fields and opaque page_key. license_key filters are intentionally excluded from arguments. Subscribers always send paginated=true to avoid the native default unbounded response; each native page is at most 100. Returned next_page_key is a cursor; next_page_url is untrusted data and never followed. Product IDs are opaque and may contain native = padding. Names and HTML are untrusted private provider data, never model instructions.

### Review refunds, shipping and access separately

Inspect the sale, status, listed currency and refundable amount before proposing a financial action. refund_sale accepts positive integer amount_cents OR explicit full_refund=true; omission alone and mixing both are refused. Gumroad's amount_cents is in the sale's listed currency minor units: normally 100 minor units per currency unit, but JPY uses whole yen. A 200 amount means 2.00 in most listed currencies and ¥200 for JPY, not necessarily $2.00. No currency conversion or financial guarantee is performed by the wrapper.

~~~bash
gumroad-cli get-sale --sale-id REVIEWED_SALE_ID --agent
gumroad-cli refund-sale --help
gumroad-cli schema refund-sale
gumroad-cli mark-sale-as-shipped --help
gumroad-cli revoke-sale-access --help
gumroad-cli resend-sale-receipt --help
~~~

--confirm approves the exact requested effect, not the correctness of IDs/amounts or customer consent. Refunds, buyer access revocation/restoration, receipt email resends and shipping status are distinct native actions. A receipt resend is a real communication and should only be requested when intended. Shipping tracking uses an intended HTTPS URL. No refund, resend or access change is executed just to test installation. Native responses do not independently prove settlement, notification delivery or business entitlement.

### Read a license without consuming a use

verify_license uses a private configured customer license, a current product_id, form encoding, and an explicitly transmitted false increment flag. It sends no seller Bearer header. Invalid/disabled/expired licenses are native failures; do not invent a valid:false success envelope. inspect uses/purchase/refunded/revoked/subscription context privately before making an application entitlement decision. Main seller credentials are needed for enable_license, disable_license, decrement_license_uses and rotate_license, but not verification or approved verification-and-increment.

~~~bash
gumroad-cli verify-license --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli increment-license-uses --help
gumroad-cli disable-license --help
gumroad-cli rotate-license --help
~~~

rotate_license invalidates the old credential and requires a NEW absolute output_file, reserved before the effect. Its full native replacement-key receipt stays in an exclusive owner-private file; stdout/chat receives only file path, size and digest. If the native request fails after rotation, the outcome can be unknown; deleting our partial file cannot reverse a rotation. Never automatically retry. Restrict the parent directory and Windows ACLs, and deliver the saved credential privately to the intended customer.

### Manage variants, discounts and checkout fields

Use the documented variant-category and nested variant endpoints with exact product/category/variant IDs. Current selected schemas support title, name, price_difference_cents and max_purchase_count; full advanced membership/file variants are not advertised. Offer codes use native amount_off and offer_type=cents or percent. A percent discount must be 1–100; fixed discounts are currency minor units. update_offer_code changes only supported purchase/minimum fields, not an arbitrary price/name body.

get_custom_field is a compatibility helper: one documented list_custom_fields read followed by an exact name match. There is no single-field native GET route. Field update/delete addresses the URL-encoded existing name; required=false is transmitted, never omitted. All writes require local confirmation.

~~~bash
gumroad-cli list-variant-categories --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli create-variant --help
gumroad-cli create-offer-code --help
gumroad-cli list-custom-fields --product-id REVIEWED_PRODUCT_ID --agent
gumroad-cli get-custom-field --product-id REVIEWED_PRODUCT_ID --name "Phone number" --agent
~~~

### Payouts, refund policy and webhooks

Read payouts with native after/before/page_key/include_upcoming; get_payout/get_upcoming_payout can request the selected native sales/transaction details. Payout metadata remains sensitive and is not accounting reconciliation. Refund policy changes use native refund_period=none/7/14/30/183 and optional fine_print; an empty fine_print clears it. Review the policy before any confirmed change.

Gumroad calls webhooks resource subscriptions. Creation is current PUT /resource_subscriptions, not the old guessed POST. Supported events are sale, refund, dispute, dispute_won, cancellation, subscription_updated, subscription_ended and subscription_restarted. List subscriptions by required resource_name. Callbacks receive private customer/event data; the package does not host a listener or prove delivery. Deleting a webhook is a separate confirmed request and does not undo previous events.
~~~bash
gumroad-cli list-payouts --agent
gumroad-cli get-refund-policy --agent
gumroad-cli list-resource-subscriptions --resource-name sale --agent
gumroad-cli create-resource-subscription --help
~~~

## 10. Exact reviewed batches and private exports

### Review exact ordered effects locally

preview_commerce_batch accepts 1–20 ordered native effects, excluding rotated-key output. Every task has tool and arguments. Nested arguments cannot override account/confirm, supply credentials, or reference mutable output/payload files. All schemas and native semantics are checked before any network call. The returned reviewSha256 binds exact ordered requests, profile label and reviewed snapshot digest. It does not hash loaded private credentials, freeze upstream state, expire, guarantee single use or confer provider authority.

~~~bash
gumroad-cli preview-commerce-batch --tasks '{"tool":"disable_product","arguments":{"product_id":"REVIEWED_PRODUCT_ID"}}' --agent
gumroad-cli submit-commerce-batch --help
~~~

Each repeated --tasks flag carries one JSON task object. To execute only requested work, explicitly confirm and supply the identical review_sha256 with unchanged tasks/profile/schema. Re-review after credential rotation or provider changes. Execution prevalidates the whole batch and stops at the first failure, returning knownResults, failedIndex and unattemptedIndices. It never retries, rolls back or silently continues. Failed effects can have unknown outcomes. Inspect native state and request a deliberate follow-up only for the intended unresolved work.

### Export private metadata with bounded continuation

export_resources supports list_products/list_sales/list_subscribers/list_payouts and only their actual filters. Defaults are 10 pages/1,000 items; accepted maxima are 100 pages/10,000 items with a 5 MiB final file cap. The output file is exclusively created with 0600 on POSIX before native reads; no existing file is overwritten and the final target symlink is not followed. The parent directory and Windows ACLs require separate private configuration.

~~~bash
gumroad-cli export-resources --help
gumroad-cli schema export-resources
~~~

The export uses fixed-host native requests and next_page_key, never next_page_url. Item caps can stop partway through a page: continuation preserves exact filters/cursor and start_offset. Resume deliberately into another new file. Missing native cursors, repeated cursors, malformed collections or changing offsets fail and remove only this export's new partial file. Customer data remains private; license/token/signed credential fields are redacted. A metadata export is not an atomic snapshot, digital-file backup or guaranteed financial reconciliation. The API can change between requests.


## 11. Several private profiles



GUMROAD_ACCOUNTS is a private JSON array with unique name and access_token OR token_file, plus license_key OR license_file when needed. Named profiles never inherit global credentials or another profile's key. GUMROAD_DEFAULT_ACCOUNT chooses an exact default label; --account selects another configured label. list_accounts reports only labels, default selection and credential availability, not secret values, file paths or provider identity. Missing credentials fail only when the requested credential type is used.

~~~bash
gumroad-cli list-accounts --agent
gumroad-cli get-user --account intended-seller --agent
gumroad-cli verify-license --product-id REVIEWED_PRODUCT_ID --account intended-license --agent
~~~

These labels/IDs are placeholders. Configure their real values privately. Revoke or replace the intended application token in Gumroad's account/application controls, rotate a customer license only on explicit request, and restart the dependent runtimes. Removing our package does not revoke tokens or reverse provider effects.


## 12. Writing safely

All 32 native/local effects require explicit confirm. GUMROAD_READ_ONLY=1 hides them and directly refuses hidden confirmed calls through the actual server handler. GUMROAD_ALLOW_DESTRUCTIVE=0 refuses them even with confirm. --agent and --yes affect output/prompt formatting only, never approval. The same guard protects CLI and MCP, including counter changes, receipts, product publication, refunds and private export file writes.

Native authorization remains with Gumroad. A local profile, filter, confirmation or request-review hash does not prove seller ownership, customer consent, entitlement or financial correctness. No automatic retry, redirects or guessed continuation is allowed. A failure after a write can mean an unknown outcome; investigate before deliberately repeating. Default pacing is 1,000ms/request with 30,000ms timeout, 1 MiB request and 5 MiB response caps. Other processes share provider quotas; this is conservative local pacing, not a global rate-limit guarantee.


## 13. How the two surfaces work

src/tools/index.ts exports one shared array. The native reviewed operations.json and provenance.json define the selected typed field subset. The existing CLI bridge invokes the real server via in-memory SDK transport; both use identical validation/profile/native compiler/WriteGuard. This is not an official OpenAPI export. No generic request passthrough or arbitrary host is exposed.

## 14. Your data

Known configured credentials, license_key fields, signed credential URLs and sensitive download/content fields are redacted from ordinary output/errors. Other customer/sale/subscriber/payout fields remain private data and are not anonymized. Do not paste them into public issues, screenshots or unrelated agent context. Raw rotated-license receipts are intentionally saved only in a requested new owner-private file.

The package has no telemetry, browser-cookie import, arbitrary host or digital-file download. Returned HTML, customer text and URLs are untrusted data. Optional best-effort audit logs record static guard decisions, not credentials/arguments, and are not verified settlement ledgers. Removing the package does not revoke credentials, refund a payment, restore a deleted product, cancel webhooks or delete private exports.


## 15. Environment variables

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

## 16. Updates and removal

Restart npx@latest to resolve updates; update global installs with npm install -g @thenavidm/gumroad-mcp-cli@latest. Reconnect clients after changes. Download/install the new desktop archive manually. Remove only the requested package/client registration/skill/extension. Revoke intended provider credentials separately; uninstall does not undo effects or private files.

~~~bash
npm install -g @thenavidm/gumroad-mcp-cli@latest
gumroad-cli --version
# Only when removal is requested
npm uninstall -g @thenavidm/gumroad-mcp-cli
~~~

## 17. Troubleshooting

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

## 18. API coverage and comparisons

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

## 19. Versions and migration

| Component | Version and evidence |
| --- | --- |
| Package and desktop | 2.0.0; public installation verified in release evidence |
| Native API | v2; selected 51 tool contracts/50 distinct routes checked 2026-10-03 |
| Official CLI/local MCP | 2026.10.02;105 actual discovered tools |
| Official app source | 0feb9b02b45efffc4ea4c7f8dea5c18a7f58ec0f |
| Printing Press | Declared 2026.9.1; pinned source only |
| MCP SDK | 1.32.0 locked |
| Node | >=22 |
| Private legacy | 1.0.0;34 names preserved, current major arguments apply |
| Matched Codex usage | Pending completed equivalent provider tasks |

| Legacy behavior | Current 2.0.0 contract |
| --- | --- |
| One MCP binary/startup global token | Scoped package, both binaries, credential-free discovery |
| Tokens in query URL | Private Bearer seller auth |
| product_permalink/license_key in arguments | Current product_id plus private license settings |
| Verification omission increments | verify_license explicitly sends false; separate confirmed increment |
| Guessed custom-field GET | Documented list plus exact matching compatibility helper |
| POST resource subscription | Current native PUT, required resource_name and HTTPS post_url |
| Legacy guessed product url/preview | Selected current custom_permalink and native field subset |
| No common effect confirmation | All 32 native/local effects confirmed and read-only enforced |
| Unbounded subscribers | Native paginated=true |
| No review/export controls | Exact ordered review and bounded private cursor continuation |
| Private source history | Intact private history retained; sanitized new public snapshot |

See [CHANGELOG.md](CHANGELOG.md). No old private refs or credentials are published.

## 20. FAQ

<details>
<summary><b>What does this Gumroad MCP server and CLI do?</b></summary>

It provides 57 shared commerce tasks through a local stdio MCP, dedicated task CLI and desktop bundle. Current selected product/sale/subscriber/payout/license/webhook work uses the same contracts and approval policy across both interfaces.

</details>

<details>
<summary><b>Does Gumroad already have official CLI and MCP tools?</b></summary>

Yes. Official CLI/local MCP release 2026.10.02 exposes 105 tools in actual protocol discovery, and hosted OAuth MCP exists. Official pagination, summaries, OAuth, previews and marketing confirmations remain useful; this companion targets specific private-profile and effect-policy workflows.

</details>

<details>
<summary><b>How many tasks are read only?</b></summary>

57 shared tools include 25 reads/helpers and 32 confirmed effects. There are 51 native tool contracts covering 50 distinct routes, plus six compatibility/local helpers. READ_ONLY exposes 25; counts alone do not compare native capability depth.

</details>

<details>
<summary><b>How do I obtain seller access?</b></summary>

Use the intended Gumroad seller advanced/application settings or application OAuth. Store seller credentials privately in ACCESS_TOKEN or TOKEN_FILE, never public repositories or tool arguments. Current requests use Bearer headers and endpoint-specific scopes.

</details>

<details>
<summary><b>Does license verification require a seller token?</b></summary>

No. Configure the customer license privately and pass the current product_id. verify_license sends no seller authorization and explicitly sends increment_uses_count=false. License management effects require seller authority too; increment verification is its own confirmed command.

</details>

<details>
<summary><b>Will verify_license increment the native use count?</b></summary>

No. Its shared handler explicitly transmits false instead of omitting the native parameter. increment_license_uses deliberately transmits true and requires confirmation. This behavior is verified with request fixtures, not a live customer-license test.

</details>

<details>
<summary><b>Can I use several seller accounts or licenses?</b></summary>

Use named private ACCOUNTS profiles, unique labels and explicit credential sources. DEFAULT_ACCOUNT or --account chooses one. Named profiles never inherit global/other-profile credentials; missing selected credentials fail before sending the request.

</details>

<details>
<summary><b>Do profile names or product filters authorize access?</b></summary>

No. Native tokens/scopes and seller/license ownership govern provider authority. A label or product_id filter is selection, not an account security boundary or entitlement proof. Review exact intended records and least privilege.

</details>

<details>
<summary><b>Are CLI and MCP separate implementations?</b></summary>

No. Both use the same tool definitions, JSON schemas, native compiler, private profiles and WriteGuard. The house CLI calls the real server over SDK in-memory transport, so supported arguments and guards remain aligned.

</details>

<details>
<summary><b>How do I approve an effect?</b></summary>

Explicitly confirm only the requested native/local action. --agent and --yes never grant approval. READ_ONLY or ALLOW_DESTRUCTIVE=0 refuses effects even with confirmation; approval does not prove consent, amount correctness or authority.

</details>

<details>
<summary><b>How are full and partial refunds specified?</b></summary>

Partial refunds use positive integer amount_cents in the sale listed currency minor units; JPY uses whole yen. A full refund requires explicit full_refund=true with no amount. Omission alone and mixed intent are refused. No currency conversion or independent settlement proof is supplied.

</details>

<details>
<summary><b>Does this create or publish products?</b></summary>

The selected native create/update/enable/disable commands can change products only with confirmation. Current selected fields include custom_permalink and tags, not guessed legacy URL fields or file/rich-content editing. Inspect returned published/warning state; HTTP success is not proof of full publication.

</details>

<details>
<summary><b>Why does get_custom_field use a list request?</b></summary>

Current native API has no single-custom-field GET route. The compatibility helper makes one documented list_custom_fields request and matches the exact name, returning not found when absent. Update/delete use the existing field name as an encoded path segment.

</details>

<details>
<summary><b>Where is a rotated license key delivered?</b></summary>

rotate_license reserves a new absolute private output_file before the effect, then saves the complete native receipt there. Chat/stdout receives only file metadata. The old license becomes invalid; no retry or rollback is promised after an uncertain response.

</details>

<details>
<summary><b>What does a review hash guarantee?</b></summary>

It binds exact ordered native requests, selected profile label and snapshot digest. It does not bind loaded credentials, lock provider state, expire, guarantee single use or provide financial approval. Re-review after credential/upstream changes; execution stops first failure.

</details>

<details>
<summary><b>Can exports back up digital products or reconcile payouts?</b></summary>

Exports are bounded private metadata with native cursor and partial-page offset receipts. They never follow returned URLs or download digital files, and are not atomic backups or independent accounting reconciliation. Sensitive key/signed fields are redacted; other customer data stays private.

</details>

<details>
<summary><b>Does the package retry failures?</b></summary>

No automatic retry is performed, including429, timeout or unknown effect outcomes. Default pacing is 1,000 milliseconds per request with a 30-second timeout. Inspect native state and known/unattempted results before deliberately repeating requested work.

</details>

<details>
<summary><b>Which clients and operating systems are supported?</b></summary>

Codex is prioritized; setup also covers Claude Code, Claude Desktop, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Docker and compatible local stdio clients on their supported macOS/Windows/Linux runtimes. Remote-only clients need a remote connector. Desktop GUI acceptance is separate from bundle discovery.

</details>

<details>
<summary><b>Does CLI use fewer tokens than MCP?</b></summary>

Equivalent completed Codex provider-task usage remains unmeasured. Loading mode, discovery, requested outcome and result sizes all matter. Compact output/field selection can narrow results, but schema counts, character estimates and another tool benchmark are not task-token evidence.

</details>

<details>
<summary><b>How do I update, uninstall or report a problem?</b></summary>

Restart npx@latest, update global CLI packages and manually install the latest desktop bundle. Remove only requested registrations/skills/packages; revoke credentials separately. Uninstall cannot undo effects or delete exports. Report reproducible secret-free issues; sensitive reports use private security reporting.

</details>

## Questions

Open a [secret-free issue](https://github.com/thenavidm/gumroad-mcp-cli/issues). Read [SECURITY.md](SECURITY.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. This Gumroad MCP server and CLI is one piece of that system.

**Links**

- Personal website: [navid.me](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=gumroad-mcp-cli&utm_content=readme)
- Link in bio: [navid.bio](https://navid.bio?utm_source=github&utm_medium=referral&utm_campaign=gumroad-mcp-cli&utm_content=readme)
- Navid Media: [navid.media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=gumroad-mcp-cli&utm_content=readme)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

If this is useful, star the repo and come say hi on [X](https://x.com/thenavidm).

## Dependencies

| Library | License | Purpose |
| --- | --- | --- |
| [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) | MIT | Server, actual MCP and in-memory CLI transport |
| [Ajv](https://github.com/ajv-validator/ajv) | MIT | Typed input contracts |
| [ajv-formats](https://github.com/ajv-validator/ajv-formats) | MIT | Native date/URI/email validation |

Pinned official documentation/controller source informs selected contracts; it is not an extra runtime SDK. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

[AGPL-3.0](LICENSE), preserving the existing project license. Not affiliated with or endorsed by Gumroad.

---

©2026 [Navid Media](https://navid.media). Built and maintained by [Navid Moazzez](https://navid.me).
