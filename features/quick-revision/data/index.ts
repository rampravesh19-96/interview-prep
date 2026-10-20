import { frontendEcosystem } from "./frontend-ecosystem.data";
import { frontendQuality } from "./frontend-quality.data";
import { javascriptPlatform } from "./javascript-platform.data";
import { reactApp } from "./react-app.data";
import { webFundamentals } from "./web-fundamentals.data";

export const quickRevisionCategories = [
  ...webFundamentals,
  ...javascriptPlatform,
  ...reactApp,
  ...frontendQuality,
  ...frontendEcosystem,
];
