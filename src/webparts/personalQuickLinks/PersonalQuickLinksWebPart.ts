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
import { IPersonalQuickLinksWebPartProps, IQuickLink } from 'models';
import * as Enums from 'utilities';
import {
  IReadonlyTheme,
  ThemeChangedEventArgs,
  ThemeProvider
} from "@microsoft/sp-component-base";

export default class PersonalQuickLinksWebPart extends BaseClientSideWebPart<IPersonalQuickLinksWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  private _activeIndex : number = -1;

  //Get & Set function for our activeIndex property.
  public get activeIndex() : number {
    return this._activeIndex;
  }
  public set activeIndex(v : number) {
    this._activeIndex = v;
  }

  public onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );

    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IPersonalQuickLinksProps> = React.createElement(
      PersonalQuickLinks,
      {
        links: [
          { title: "Google", url: "https://google.com", thumbNailOption: Enums.ThumbnailOptions.AutoSelected, thumbNailUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAADjCAMAAADdXVr2AAABTVBMVEX////qQzU0qFNChfT7vAREhvQ8gvR0ofZwn/b7uQDqPi//vQD7ugAwp1DqPS7qQTMopUsdo0XpNiXpMR797u3pLRgwffP4/PnpNCL98/L8wADrSj0ho0c3gPRDg/z/+/v1sKz85+bpODcYp1YzqkTtY1nylI7ubGP509HxioP4zMnxeSX8y1f+6r/93Jazyvqd0Kng8ORSsmpnuntBrV30p6LsXFHsVUnveHDznZf3wr/73tz3oxT8xTnrTTLziCD94aT5sAz+8teiv/n/+vBUkPWStPjT4PxUqkvx9v7g6v2Cqvd+w47p9ezD1fs1pWY+kMrL5tG63sI3oXg8lLg6maF4wInwgHnuZyv1lhrsWi/80W7zlWP81oT8yk3+68T7xDH/9eH9352qwW/TtyCjsjRwrUTkuRW7tCuLrzzguRiSy6Aog9c4nY+q1rRQ+7o4AAALrklEQVR4nO2c+UPbyBXHZWEINtEdYYPlYrr4gObAB9g4TTYblmSTQLamLbRN9+yxbd31//9jZyxfumc0MxrJ3e9P4QfH+vDevO+bmScEgbkO9p6fDM8ax4Pmeb9SyeVylUr/vD44blzUhq1HB+wfgJX2WrWLQV8xjbKuy3JRAcpBwX8UZVnWy4Yp95uNWusR70fF1MHz2n3FNADWDClIEFQ3TH1w1spKIFsXddkAYKFcLkrAqNfPWrwfPUqPagPD0Is4aAvEIghjs3bIGyFQh2fnRhkran6I52dpJHxUOzfjhc2lom6e1/Z44zg1bIKUJEdbEJYHJ7yRFjps6GUacVuRIhuVs1SEEASOaL0FEurl4+e84WoVg15SugFlc8DVK2pymUXglpLNJjfAmqKzhYMqmk0uKTrMMY7cEnCQuBOe9I1k4KBk8zjRjvSwaTIrKL7S9VpydBeGnCgckGLUE1qCrVwCFcWronmRBN2xyQMOSu8zLzEtRecEl4MBPGNL1+AWOlvlOsNG9LDCMXS25DKzrUSNXXuJLsVsMIE7GCRo5GFikqCHlcS9LkhyjnoFHaYhMedSzCFdujPOFdMlha7FH5u8gdwyjunRNbn7gVd6kxLcwXkK6UABpcO3l56SuSq5QsUeDpUUlcylaNHJ602XKkOYixYdl41rpCjRPcqtc2bupZOuSIdO6KfSEWjRNdea7j6VvUoxR4fuzOBN4idasTtJ3R4BilbsDlNy8OAUrdgJFRaWoMwV8/O0YicMqBZNOHlUNkxDzlX6/X6lohhwEEvGvY6nFjt6ZUUpAjC93qidPN87mF9iHcAxulqjrmNNwVCL3XNKZUWRjXL9Yhh8rHU4bJybiIjUYidUaJQVwFZsnETfOu4N73UEQmqxE44p+HmxrB8j3/kfDAdGxNakmKM1FEnueIps1od4t8V74QMk9OgOSDewim7EGrc5qQdeaNOjE+7JPEHRyxdxV0mr7t9MUKQjTE3ZbJCUgJO+zzAJRTohRzSOaQ5In6Smu7OHJt0FSdXUKxQGpPbundcZRYUeHUknTe1a40ReCSDN2JFs0PUKtbmTveaiKaQZO6EVu64oJsUbm+V9G9XYCf3YWxXa94mtMvTAokyTbhh3oyBXqN8Gw7tuurGL3UrrdQbzegfnOtXYCbVyPDrjnuZTLEXsoU69jBe8ZCbZiPWq8Kdfx6Gr8X5wNOXz+5/j82WF7kkB8P0Wm47xiB41vcgD7Rf+ghVAIxvrThBeF/JT7f8Gg69MtVVhqcf5mfb/jMynD3g/Nap+KOQXfF+8RAMs9nk/NbK+WeLl9/NIDqHo2XmjN+8QkkOY6XnDLkpPCi6+aIfQ2QzFMtHjvEuRDlE85/3M6Pqy4MaLcgjFTOP7uwF65YMX7hBGjfczY+iFD12oQ2QpNVdNz8kX6BAm95daMfRjAF6gQ2Spagblps3n5xCKnpU/XwHlVzeXfD4OUa7xfmQc+dbNFUC3QygV3k+MpccPQ/E8DlGmfKbJWOHBy7sdQsnxfmAsvY7Ey+/vrzhEtlae8DQab9UhFDlLZVMQvkWgW3EIPSvHKzMh0S0dwszOJhYKYenNAaFDFGm9upOQIlzPwQccImOuIHyKcD0H3xcvM9WPCchLb8aX/yvv58VTCT03oQqveD8wntAri433JeH3bW9tJqTddwJWZYH6lvTXub21kZB234Ov+wajsoDg/ZghvI8Cas+ywHudHbzqJfi677Hw8qR0CeJtfQA7dTw64qWXJN5VxEGER4WnGcLb2BSE7/DwvssSXvWd5+4kAu+HLOEBZ8CzvQIxXaJ4bzFt70W28D7i4T38lCm86jPhE07wHpIXzkTxLvGaFhrbhQTxtt7gNS2FJ1nDw6Gj0HEmi/cBE4/c9hLF28bEI93LJou3cfUL3v8P3sP1xsta9DZ/wcsw3sZa+x6IHl5Tlq2uBeCFjLT44GWr5wSV0zPpGIr3Kmt467zfA3jrvFsHLfXTNT5r2Xqw1idlYL+3zuecYLeOd3uZsVPqy7W+Y6g+W+cboo3qx3W+34OH8Gt8Ozu9XF/fu/UNOBqxvpMRYLvHY64lMborAX8qiXRPlODd+jb8Piy6nZ2/keJVt+ILC6/6Bn4fzkTgTv4r7YYM7832g/i6wsJ7Br8Po7bs/F0SrQlh+Ej0ACd+0PZwasvOPz4TRanHEW8TJ3rTkTmhhJyY/wR0oqi1udG938VKTvtDaH3Lzk/SlE5Ur7nhPati0NmFE/E9hp1/2XAwfCVeeB9wlp5dOJEW387Ovxd0onrKCw8nePa8I1Qk3s5PXy3pRNHiFL63WEtvOq0KFXXWCf1gVRan8L3Bit7G/GMRzjf1A4dUPuHDgptXluA3g224mR848MY86D7i2cLl4oMhO/ad/0geOlA8CTuzWMJrxu2eZapga1jxA0f47pKnw/P0jd3lJ4Oy0+EHzvCNEsfDKyzLpScEZSfYHwTQceg83+EFz94uzOSbnW4/4GsOmK6wcD0ov+z0+oEzPZPtrDGDB8fEV+Rpq/38gGd6YrWb0+uFVblvUvz9wKFEdw54/ZjDFqZynkgE+IErPW+Tw7vCPICquj6/epob7Ae8lt8lZvDg+zUOrRQX1/4gWJKYUO+J6eje3FwpLqF+4JTaTQYPNzU3tjz/xby4RPiBU1Yi5eUDnuV56uZU3yP5gUtaAnuHZ7ip6fT0meCuD8EP3HzMuxdcT7DfbPMK0Q8S5sMuK65+c6FXBTQ/SJTv3Qb+lYt9fusRoh94+Biuvzh0foUFamLFwhM1ZvXz3WaM6zK/wjJVD9nxnLI6bPz9fTUGnWMj69CtFg9PVEUW/Rne2dEieJ6OZaFOzPCJEoP+GrfRnAXP1xVsjeKGj8EC3I5Ftzx791NXjc2n9mgm6NsYJTMqeIJwEz98IEHpOcT4v7+KRRcePEE4jWkOU1kinfPBdk87+kMsvvDgAYlxq4sdwC75+XXpWgPPcPQz5iCEHbzgsmmLoLrYgNdkHlgaa/b6V7++wt0IhXjeQtfxq4v9WNo4PmBpbC2+XlJ/h5uggQ3LiiSS9LQBr+MV0fY8cjMd/RGPr+o+YvETYXragJ1b3BCWbjuaO3GOfo/VdFb9twoukaYnlGSp1xhltDS6syyfrFF7GA6x67vP8ypua+16NE0dj1Bi2J50LU/g5r8mdIeINIXF95Gn55zQ6oxHIV5xMzrtSpoa9us8+hlx34BSV2xNaPHB+mdBxsmoXSrNQ1kq3bRHt6fXHUsLR7N/R2gOsXsZiuTQHYXl52IEUsUeEPgJ/mCp0WTzTyM4BHJqTkVn+XmfFAr/YwgOgZ6aUCS9NQNFOgRq1ZyLgvvRlCqGOsTWAzw6quWFhsIdYjOax61rkr0RA4XsIfAW3kwEW3cmCnQI3IU3U+yTJUaSjnwdAqmT9lGJaG/LQn4Oged4q7pJH5/HIbZilJUFH2pnkZg8DoG2CwriI97c0pbLIWIVzTTHz+EQkWdH2YvfikNEHGsi8aWuviz2EBTogD/0Uubv4swhqNABdVLWn4lTh6BFB/rPdPXXUKpFjU4QTtPGJ1lU551HWqoKjKRSvg++SVOBUXv0XzXopiZBNSazepOUJCirSaG2lIIElRi+RMHfIbQuyyHZkcU1gJLG+M3r0h3HFWh12M9vj0ROPZrEfnp0qlMuAdQSCJ2tm27igGqif+9g1EkUkHjiAlu3ot91MSO4Loe/dTCREqkxktZJ/m1IG1BlHkF+cFC3PaZrUNW6HOGgRt55FEqSrLgDQFTVHvsOpRBK1XoTHi+Q+2g6UkSTULLUO85Z6VT7tEeLECRlF3toi73apx2NNEslVZPuUshm6+a2izKKE4RmaZ1xqnLSR6NxR9WQh3LmZKoG0dIaNqdK7cmdCCePou9fpOnIkng3CZs9S6NKo8m425EAJRywcowjgR9UVbXgTFmve3rbzkbQ/FQqwfG48fVdt9PrQTQ4V9bp3o3Hp7dwjo7ld/8PkUL+g8f1DeQAAAAASUVORK5CYII=" },
          { title: "Bing", url: "https://bing.com", thumbNailOption: Enums.ThumbnailOptions.AutoSelected, thumbNailUrl:"data:image/jpeg;base64,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" },
          { title: "Yahoo", url: "https://yahoo.com", thumbNailOption: Enums.ThumbnailOptions.AutoSelected, thumbNailUrl:"data:image/png;base64,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" }
        ],
        editLink: (index:number) =>{
          if (index === -1) {
            this.properties.links.push({} as IQuickLink);
            index = this.properties.links.length - 1;
          }
          this.activeIndex = index;
          
          this.context.propertyPane.open();
        },
        themeVariant: this._themeVariant,
        ...this.properties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this.context.propertyPane.isRenderedByWebPart() ? 
      this.getItemPropertyPaneConfiguration() : this.getWebPartPropertyPaneConfiguration();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;

    this.render();
  }

  private getWebPartPropertyPaneConfiguration(): IPropertyPaneConfiguration{
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

  private getItemPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const props = [
      // Compact Layout Properties
      [ 
        PropertyPaneConfiguration.QuickLink_url
        , PropertyPaneConfiguration.QuickLink_title
      ], 
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
      pages:[
        {
          displayGroupsAsAccordion: true,
          groups: [

          ]
        }
      ]
    }
  }
}
