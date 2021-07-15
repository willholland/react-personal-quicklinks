import * as Enums from 'utilities';

export interface IQuickLink{
    url: string;
    title: string;
    thumbNailOption?: Enums.ThumbnailOptions;
    thumbNailUrl: string;
    alternateText?: string;
    description?: string;
}