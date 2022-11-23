# Dinero.js Deno Example

This example demonstrates how to use Dinero.js ES Modules in Deno.

> ℹ️ Using an import map is required in order for Dinero.js modules to find dependencies.

To run the example

1. You need [Deno](https://deno.land/manual@v1.28.1/getting_started/installation) installed.

2. Switch to the example directory `cd dinero.js/examples/deno`

3. To run the example Deno needs to be aware of the location of the import map.

   Run as a task, Deno finds the import map through the deno.json file.

   `deno task start`

   Run directly from Deno requires an `import-map` cli flag.

   `deno run --import-map=./import_map.json main.ts`
