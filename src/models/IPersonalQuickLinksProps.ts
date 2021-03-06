import { IPersonalQuickLinksWebPartProps } from 'models'
import { IQuickLink } from 'models';
import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IPersonalQuickLinksProps extends IPersonalQuickLinksWebPartProps {
  links: IQuickLink[];
  themeVariant: IReadonlyTheme | undefined;
}
