module.exports = {
  default: {
    require: ["features/steps/**/*.ts", "tests/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["@cucumber/pretty-formatter"],
    paths: ["features/**/*.feature"],
    parallel: 1,
    format: ["json:reports/report.json"],
  },
};
