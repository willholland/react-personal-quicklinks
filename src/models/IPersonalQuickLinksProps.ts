import { IPersonalQuickLinksWebPartProps } from 'models'
import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IPersonalQuickLinksProps extends IPersonalQuickLinksWebPartProps {  
  themeVariant: IReadonlyTheme | undefined;  
  editLink: Function;
}
