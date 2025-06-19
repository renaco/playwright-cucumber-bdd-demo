const fs = require("fs");
const reporter = require("cucumber-html-reporter");

const jsonFilePath = "reports/report.json";
const htmlFilePath = "reports/report.html";

if (!fs.existsSync(jsonFilePath)) {
  console.error(
    "❌ JSON report not found. Run tests first with 'npx cucumber-js'"
  );
  process.exit(1);
}

const options = {
  theme: "bootstrap",
  jsonFile: jsonFilePath,
  output: htmlFilePath,
  reportSuiteAsScenarios: true,
  launchReport: true,
};

reporter.generate(options);
