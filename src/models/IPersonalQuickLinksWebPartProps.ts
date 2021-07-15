import { IQuickLink } from 'models';
import * as Enums from '@utility'
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IPersonalQuickLinksWebPartProps {
    title: string;
    layout: Enums.Layouts;
    showImageInLayout: boolean;
    showDescriptions: boolean;
    icons: Enums.IconsOptions;
    buttonAppearance: Enums.ButtonAppearance;
    alignment: Enums.AlignmentOptions;
    titleText: Enums.TitleTextOptions;
    showIcons: boolean;
    iconSize: Enums.IconSizeOptions;
    showOnlyIconOrImage: boolean;
    links: IQuickLink[];
    displayMode: DisplayMode;
}