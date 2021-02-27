import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalQuickLinksWebPartStrings';
import PersonalQuickLinks from './components/PersonalQuickLinks';
import { IPersonalQuickLinksProps } from '../../models/IPersonalQuickLinksProps';
import { PropertyPaneConfiguration } from './PropertyPaneConfig';
import { IPersonalQuickLinksWebPartProps } from 'models';
import * as Enums from 'utilities';

export default class PersonalQuickLinksWebPart extends BaseClientSideWebPart<IPersonalQuickLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalQuickLinksProps> = React.createElement(
      PersonalQuickLinks,
      {
        links: [],
        ...this.properties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const props = [
      // Compact Layout Properties
      [ PropertyPaneConfiguration.ShowImageInLayoutToggle ], 
      // Filmstrip Layout Properties
      [],
      // Grid Layout Properties
      [],
      // Button Layout Properties
      [ 
        PropertyPaneConfiguration.ShowDescriptionsToggle
        , PropertyPaneConfiguration.IconsDropdown
        , PropertyPaneConfiguration.ButtonAppearanceDropdown
        , PropertyPaneConfiguration.AlignmentChoiceGroup
        , PropertyPaneConfiguration.TitleTextChoiceGroup
      ],
      // List Layout Properties
      [
        PropertyPaneConfiguration.ShowDescriptionsToggle
        , PropertyPaneConfiguration.ShowIconsToggle
      ],
      // Tiles Layout Properties
      [
        PropertyPaneConfiguration.IconSizeChoiceGroup
      ]
    ]

    return {
      pages: [
        {                
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.LayoutOptionsGroupName,
              groupFields: [
                PropertyPaneConfiguration.LayoutTileSelector
              ].concat(props[this.properties.layout] as [])
            }
          ]
        }
      ]
    };
  }
}
