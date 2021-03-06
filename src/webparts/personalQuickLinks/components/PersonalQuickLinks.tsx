import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './PersonalQuickLinks.module.scss';
import { IPersonalQuickLinksProps } from '../../../models/IPersonalQuickLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Enums from '@utility';
import { CompactDisplay } from './compact/display';

export default class PersonalQuickLinks extends React.Component<IPersonalQuickLinksProps, {}> {
  public render(): React.ReactElement<IPersonalQuickLinksProps> {
    let view:any = undefined;
    
    const varientStyles = {
      "--varientBGColor": this.props.themeVariant.semanticColors.bodyBackground
      , "--varientFontColor": this.props.themeVariant.semanticColors.bodyText
      , "--varientBGHovered": this.props.themeVariant.semanticColors.listItemBackgroundHovered    
    } as React.CSSProperties;

    switch(this.props.layout){
      case Enums.Layouts.LayoutCompact:
        view = React.createElement(
          CompactDisplay,
          {
            links: this.props.links
          }        
        );
        break;
      default:
        view = (<div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{ this.props.layout } </p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>);
    }

    return (<div className={styles.personalQuickLinks} style={ varientStyles }>
      { view }
    </div>)    
  }
}
