#!/usr/bin/env node

import { Command } from "commander"
import { createAgent } from "./commands/createAgent"
import { listAgents } from "./commands/listAgents"

const program = new Command()

program
 .name("oix")
 .description("OIX AI Platform CLI")
 .version("1.0.0")

program
 .command("create-agent")
 .description("Create a new AI agent")
 .action(createAgent)

program
 .command("list-agents")
 .description("List available agents")
 .action(listAgents)

program.parse()
