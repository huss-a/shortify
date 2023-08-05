export const addProtocolToUrl = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    } else return `https://${url}`;
};
