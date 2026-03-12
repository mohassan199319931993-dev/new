import { qualityModule } from './quality/index.js';
import { spcModule } from './spc/index.js';
import { iotModule } from './iot/index.js';
import { aiModule } from './ai/index.js';
import { builderModule } from './builder/index.js';
import { reportsModule } from './reports/index.js';
import { adminModule } from './admin/index.js';
import { authModule } from './auth/index.js';

export const registeredModules = [
  authModule,
  qualityModule,
  spcModule,
  iotModule,
  aiModule,
  builderModule,
  reportsModule,
  adminModule
];
