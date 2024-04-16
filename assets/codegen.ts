import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/api/graphql",
  documents: ["src/gql/**/*.gql"],
  generates: {
    "./schema.gql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "./src/gql/introspection.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
    "./src/gql/generated.ts": {
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-operations",
        {
          "typescript-urql": {
            nonOptionalTypename: true,
            withHooks: true,
          },
        },
      ],
    },
  },
};

export default config;
