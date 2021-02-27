declare interface ILayoutOptions {
  LayoutOptionsGroupName: string;
  LayoutCompact: string;
  LayoutFilmstrip: string;
  LayoutGrid: string;
  LayoutButton: string;
  LayoutList: string;
  LayoutTiles: string;
}

declare interface ICompactLayoutOptions {
  ShowImageInLayout: string;
}

declare interface IFilmstripLayoutOptions {
  SwitchToOtherLayouts: string;
}

declare interface IButtonLayoutOptions {
  ShowDescriptions: string;
  Icons: string;
  IconsOptionsNoIcon: string;
  IconsOptionsIconOnLeft: string;
  IconsOptionsIconOnTop: string;
  ButtonAppearance: string;
  ButtonAppearanceOptionsNoOutline: string;
  ButtonAppearanceOptionsOutline: string;
  ButtonAppearanceOptionsFillColor: string;
  Alignment: string;
  AlignmentOptionsTop: string;
  AlignmentOptionsCenter: string;
  TitleText: string;
  TitleTextOptionsOneLine: string;
  TitleTextOptionsTwoLines: string;
}

declare interface IListLayoutOptions{
  ShowDescriptions: string;
  ShowIcons: string;
}

declare interface ITileLayoutOptions{
  IconSize: string;
  IconSizeSmall: string;
  IconSizeMedium: string;
  IconSizeLarge: string;
  IconSizeExtraLarge: string;
  IconSizeFillSpace: string;
  ShowOnlyIconOrImage: string;
}


declare interface IPersonalQuickLinksWebPartStrings {
  Yes: string;
  No: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  LayoutOptionsGroupName: string;
  LayoutCompact: string;
  LayoutFilmstrip: string;
  LayoutGrid: string;
  LayoutButton: string;
  LayoutList: string;
  LayoutTiles: string;
  ShowDescriptions: string;
  ShowImageInLayout: string;
  SwitchToOtherLayouts: string;
  ShowIcons: string;
  Icons: string;
  IconsOptionsNoIcon: string;
  IconsOptionsIconOnLeft: string;
  IconsOptionsIconOnTop: string;
  ShowOnlyIconOrImage: string;
  IconSize: string;
  IconSizeSmall: string;
  IconSizeMedium: string;
  IconSizeLarge: string;
  IconSizeExtraLarge: string;
  IconSizeFillSpace: string;
  ButtonAppearance: string;
  ButtonAppearanceOptionsNoOutline: string;
  ButtonAppearanceOptionsOutline: string;
  ButtonAppearanceOptionsFillColor: string;
  Alignment: string;
  AlignmentOptionsTop: string;
  AlignmentOptionsCenter: string;
  TitleText: string;
  TitleTextOptionsOneLine: string;
  TitleTextOptionsTwoLines: string;
}


declare module 'PersonalQuickLinksWebPartStrings' {
  const strings: IPersonalQuickLinksWebPartStrings;
  const layoutOptions: ILayoutOptions;
  const compactLayoutOptions: ICompactLayoutOptions;
  const filmstripLayoutOptions: IFilmstripLayoutOptions;
  const buttonLayoutOptions: IButtonLayoutOptions;
  const tileLayoutOptions: ITileLayoutOptions;
  
  export = strings;

  // export = {
  //   basicStrings = basicStrings,
  //   layoutOptions = layoutOptions,
  //   compactLayoutOptions = compactLayoutOptions,
  //   filmstripLayoutOptions = filmstripLayoutOptions,
  //   buttonLayoutOptions = buttonLayoutOptions,
  //   tileLayoutOptions = tileLayoutOptions
  // }
}

