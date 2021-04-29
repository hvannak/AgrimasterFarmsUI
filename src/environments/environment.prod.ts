export const environment = {
  production: true,
  // apiURL: 'http://localhost:64030/api',
  apiURL: 'http://' + window.location.hostname +':64030/api',
  // hubURL: 'http://localhost:64030',
  hubURL: 'http://' + window.location.hostname + ':64030',
  format: 'yyyy-MM-dd',
  formatTime: 'HH:mm',
  locale: 'en-US'
};