export interface Pet {
    id: string;
    attributes: {
        name: string;
        sex: string;
        ageGroup: string;
        breedPrimary: string;
        pictureThumbnailUrl: string;
    };
}
