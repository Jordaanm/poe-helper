export const proxy = (url: string) => {
  return 'https://corsproxy.io/?' + encodeURIComponent(url);
};

export const proxyFetch = (url: string, options?:RequestInit|undefined) => {
  const proxyUrl = proxy(url);
  return fetch(proxyUrl, options);
}