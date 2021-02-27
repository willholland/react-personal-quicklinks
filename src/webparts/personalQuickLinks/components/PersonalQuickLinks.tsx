import * as React from 'react';
import styles from './PersonalQuickLinks.module.scss';
import { IPersonalQuickLinksProps } from '../../../models/IPersonalQuickLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PersonalQuickLinks extends React.Component<IPersonalQuickLinksProps, {}> {
  public render(): React.ReactElement<IPersonalQuickLinksProps> {
    return (
      <div className={ styles.personalQuickLinks }>
        <div className={ styles.container }>
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
        </div>
      </div>
    );
  }
}
