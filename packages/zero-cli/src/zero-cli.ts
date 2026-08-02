#!/usr/bin/env node
import { generateZeroId } from "@zeroopensource/zero-id";
import { ZERO_OFFICIAL_LINKS } from "@zeroopensource/zero-official";
import {
  program,
  // InvalidArgumentError
} from "commander";
import packagejson from "../package.json";
import { buildIndex } from "./build-index";
import { commanderParseInt } from "./commander-parse-int";

program
  .name(Object.keys(packagejson.bin)[0] || "zero")
  .version(packagejson.version || "0.0.0", "-v, --version")
  .description(
    `${packagejson.name}@${packagejson.version}: ${packagejson.description}`
  );

program
  .command("official")
  .description("show official links for Zero Open Source")
  .action(() => {
    console.log("\nOfficial Links:\n");
    for (const [_key, value] of Object.entries(ZERO_OFFICIAL_LINKS)) {
      console.log(`  ${value.name}: ${value.url}`);
    }
    console.log();
  });

program
  .command("id")
  .description("generate random zero-id")
  .option(
    "--partsLength <value>",
    "limit length of each hex (default: 6)",
    commanderParseInt
  )
  .option(
    "--partsCount <value>",
    "specify number of hexes (default: 4)",
    commanderParseInt
  )
  .option("--separator <value>", `change separator (default: '-')`)
  .action((options) => {
    console.log(generateZeroId({ ...options }));
  });

program
  .command("index")
  .description("build index")
  .action(() => {
    buildIndex();
  });

program.parse(process.argv);

const noSubCommand = process.argv.length <= 2;
if (noSubCommand) {
  program.help();
}
