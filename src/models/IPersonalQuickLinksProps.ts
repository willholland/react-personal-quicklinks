import { IPersonalQuickLinksWebPartProps, IQuickLink } from 'models'
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { BaseWebPartContext } from '@microsoft/sp-webpart-base';

export interface IPersonalQuickLinksProps extends IPersonalQuickLinksWebPartProps {  
  themeVariant: IReadonlyTheme | undefined;  
  context: BaseWebPartContext;
  editLink: (index:number) =>  void;
  addLink: (link:IQuickLink) => void;
  handlePropertyChange: (value: string) => void;
}
