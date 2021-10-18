export type Feature = {
    id: number;
    name: string;
};

type Selected = {
    selected: boolean
}

export type FeatureSelect = Feature & Selected