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
            withHooks: true,
          },
        },
      ],
    },
  },
};

export default config;
