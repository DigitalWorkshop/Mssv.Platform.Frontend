import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44348',
  redirectUri: baseUrl,
  clientId: 'Platform_App',
  responseType: 'code',
  scope: 'offline_access Platform',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Platform',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44348',
      rootNamespace: 'Mssv.Platform',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
