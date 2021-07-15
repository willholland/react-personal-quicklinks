import { IQuickLink } from 'models'
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IQuickLinks{
    displayMode: DisplayMode,
    links: IQuickLink[],
    editLink: Function
}