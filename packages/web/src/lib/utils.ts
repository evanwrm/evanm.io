const URIParse = (url: string) => {
    // URI RFC: https://datatracker.ietf.org/doc/html/rfc3986#appendix-B
    const match = url.match(/^(([^:\/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
    return (
        match && {
            protocol: match[1],
            host: match[4]
        }
    );
};

export const isExternal = (url: string, baseLocation: string = "/") => {
    const match = URIParse(url);
    const location = URIParse(baseLocation);

    return location && (match?.protocol !== location?.protocol || match?.host !== location?.host);
};
