import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

/** 
 * Docs https://commitlint.js.org/#/reference-rules
  Each rule has 3 properties:
  -> Level
  0: Disables the rule
  1: Enables the rule like a warning
  2: Enables the rule like a error
  -> Applicable
  "always": Enables the rule always
  "never": Disable the rule always
  -> Value
  string|boolean|number|array

  "name-rule": [Level, Applicable, Value]
*/

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [
      // It is responsible for validating the type
      RuleConfigSeverity.Error,
      "never"
    ],
    "type-enum": [
      // It is responsible for managing types (e.g., feat, fix, bug, and others)
      RuleConfigSeverity.Error,
      "always",
      ["feat", "fix", "styles", "docs", "test", "refactor"]
    ],
    "type-case": [
      // It is responsible for enforcing case conventions in the type
      RuleConfigSeverity.Error,
      "always",
      "lower-case"
    ],
    "scope-empty": [
      // It is responsible for managing the scope (e.g., feat(frontend), fix(web), and others)
      RuleConfigSeverity.Error,
      "always"
    ],
    "subject-empty": [
      // It is responsible for validating the subject
      RuleConfigSeverity.Error,
      "never"
    ],
    "subject-case": [
      // It is responsible for enforcing case conventions in the subject
      RuleConfigSeverity.Error,
      "always",
      "sentence-case"
    ],
    "subject-min-length": [
      // It is responsible for ensuring the subject meets the minimum length requirement
      RuleConfigSeverity.Error,
      "always",
      10
    ],
    "subject-max-length": [
      // It is responsible for enforcing the maximum length limit of the subject
      RuleConfigSeverity.Error,
      "always",
      50
    ],
    "body-empty": [
      // It is responsible for validating the body
      RuleConfigSeverity.Error,
      "always"
    ],
    "footer-empty": [
      // It is responsible for validating the footer
      RuleConfigSeverity.Error,
      "always"
    ]
  }
};
module.exports = Configuration;
