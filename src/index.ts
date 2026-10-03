#!/usr/bin/env node
import{StdioServerTransport}from'@modelcontextprotocol/sdk/server/stdio.js';import{buildServer,VERSION}from'./server.js';import{runCli,exitCodeFor}from'./cli.js';import{runDoctor}from'./doctor.js';import{basename}from'node:path';
const HELP=`Gumroad MCP and shared task CLI ${VERSION}
gumroad-mcp                         Local stdio MCP
gumroad-cli <command> --help         Shared actual arguments
gumroad-cli schema <command>         Actual JSON input schema
gumroad-cli doctor [--network]       Local settings / explicit native user read
gumroad-cli login                   Private setup instructions only
GUMROAD_ACCESS_TOKEN / TOKEN_FILE   Private seller Bearer credential
GUMROAD_LICENSE_KEY / LICENSE_FILE Separate customer license credential
GUMROAD_ACCOUNTS                    Isolated private named profiles, no fallback
GUMROAD_READ_ONLY=1                 Hide and directly refuse effects/private outputs
GUMROAD_ALLOW_DESTRUCTIVE=0          Refuse confirmed effects/private outputs
GUMROAD_REQUEST_TIMEOUT_MS          Default30000, no retries
GUMROAD_MIN_REQUEST_INTERVAL_MS     Default1000, conservative local pacing
`;
async function main():Promise<void>{const args=process.argv.slice(2),command=args[0];if(['--version','-v'].includes(command??'')){console.log(VERSION);return;}if(['--help','-h','help'].includes(command??'')){process.stdout.write(HELP);return;}if(command==='login'){console.log('Use the intended Gumroad seller account and its https://gumroad.com/settings/advanced application/OAuth access-token controls. Configure seller token privately in GUMROAD_ACCESS_TOKEN or absolute owner-only GUMROAD_TOKEN_FILE; native requests use Bearer auth, never token URLs. Native scopes differ by endpoint; view_profile is not financial authority. Independent verification uses private GUMROAD_LICENSE_KEY or GUMROAD_LICENSE_FILE and current product_id; verify_license explicitly sends increment_uses_count=false without OAuth. License mutations also require the intended seller credential. Named GUMROAD_ACCOUNTS use access_token/token_file and license_key/license_file without global fallback. login prints setup instructions only, not OAuth, browser cookie import or account changes.');return;}if(command==='doctor'){if(args.slice(1).some(a=>a!=='--network')){process.exitCode=2;console.error(JSON.stringify({error:'doctor accepts only --network'}));return;}process.exitCode=await runDoctor(args.includes('--network'));return;}if(args.length||basename(process.argv[1]??'').startsWith('gumroad-cli')){process.exitCode=await runCli(args);return;}const server=buildServer();await server.connect(new StdioServerTransport());for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>void server.close().then(()=>process.exit(0)));}
main().catch(e=>{console.error(JSON.stringify({error:e.message}));process.exitCode=exitCodeFor(e.message);});
