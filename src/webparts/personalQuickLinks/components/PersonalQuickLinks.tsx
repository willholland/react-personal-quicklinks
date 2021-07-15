import React, { useReducer, useContext, createContext } from 'react';
import styles from './PersonalQuickLinks.module.scss';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { IPersonalQuickLinksProps, IQuickLink } from 'models';
import * as Enums from '@utility';
import { CompactDisplay } from './compactLayout/display';
import QuickLinksContext from 'providers/QuickLinksProvider';
import { AddLinkButton } from './addLinkButton/AddLinkButton';
// import WebPartPropertyProvider from 'providers/WebPartPropertyProvider';

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
            links: this.props.links, 
            displayMode: this.props.displayMode,
            editLink: this.props.editLink
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
    return (
      <div className={styles.personalQuickLinks} style={ varientStyles}>
        <WebPartTitle displayMode={this.props.displayMode} title={this.props.title} className={styles.title} updateProperty={this.props.handlePropertyChange} />
        <QuickLinksContext.Provider value={this.props.links}>
          <AddLinkButton context={this.props.context} onSave={ this.props.addLink } />
         { view }
        </QuickLinksContext.Provider>
      </div>
    ) 
  }
}
