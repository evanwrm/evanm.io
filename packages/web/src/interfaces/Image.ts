export interface Image {
    data: {
        attributes: Attributes;
    };
}

interface Attributes {
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
}
