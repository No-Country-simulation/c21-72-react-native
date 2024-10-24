export const ENV = {
  STAGE: 'development' as 'development' | 'prod',
  API_URL: 'https://api.example.com',
  API_URL_IOS: 'https://api.ios.example.com',
  API_URL_ANDROID: 'https://api.android.example.com',
};

export type EnvType = typeof ENV;