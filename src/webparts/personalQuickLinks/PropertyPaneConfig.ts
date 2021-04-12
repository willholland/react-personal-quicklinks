import { PropertyPaneDropdown, PropertyPaneSlider, PropertyPaneToggle, PropertyPaneChoiceGroup, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'PersonalQuickLinksWebPartStrings';
import * as Enums from '@utility'

export class PropertyPaneConfiguration{
    public static LayoutTileSelector = PropertyPaneChoiceGroup("layout", {
        // label: ,
        options: [
            { key: Enums.Layouts.LayoutCompact, text: strings.LayoutCompact, iconProps: { officeFabricIconFontName: "AutoFillTemplate"} },
            { key: Enums.Layouts.LayoutFilmstrip, text: strings.LayoutFilmstrip, iconProps: { officeFabricIconFontName: "DoubleColumn"} },
            { key: Enums.Layouts.LayoutGrid, text: strings.LayoutGrid, iconProps: { officeFabricIconFontName: "GridViewSmall"} },
            { key: Enums.Layouts.LayoutButton, text: strings.LayoutButton, iconProps: { officeFabricIconFontName: "ButtonControl"} },
            { key: Enums.Layouts.LayoutList, text: strings.LayoutList, iconProps: { officeFabricIconFontName: "List"} },
            { key: Enums.Layouts.LayoutTiles, text: strings.LayoutTiles, iconProps: { officeFabricIconFontName: "Tiles"} }
        ]
    });
    
    public static ShowImageInLayoutToggle = PropertyPaneToggle("showImageInLayout", 
        {
            label: strings.ShowImageInLayout,            
            onText: strings.Yes,
            offText: strings.No
        }
    );

    public static ShowDescriptionsToggle = PropertyPaneToggle("showImageInLayout", 
        {
            label: strings.ShowDescriptions,            
            onText: strings.Yes,
            offText: strings.No
        }
    );

    public static IconsDropdown = PropertyPaneDropdown("icons", {
        label: strings.Icons,
        options: [
            { key: Enums.IconsOptions.NoIcon, text: strings.IconsOptionsNoIcon },
            { key: Enums.IconsOptions.IconOnLeft, text: strings.IconsOptionsIconOnLeft },
            { key: Enums.IconsOptions.IconOnTop, text: strings.IconsOptionsIconOnTop }
        ]
    });

    public static ButtonAppearanceDropdown = PropertyPaneDropdown("buttonAppearance", {
        label: strings.ButtonAppearance,
        options: [
            { key: Enums.ButtonAppearance.NoOutline, text: strings.ButtonAppearanceOptionsNoOutline },
            { key: Enums.ButtonAppearance.Outline, text: strings.ButtonAppearanceOptionsOutline },
            { key: Enums.ButtonAppearance.FillColor, text: strings.ButtonAppearanceOptionsFillColor }
        ]
    });

    public static AlignmentChoiceGroup = PropertyPaneChoiceGroup("alignment", {
        label: strings.Alignment,
        options: [
            { key: Enums.AlignmentOptions.Top, text: strings.AlignmentOptionsTop },
            { key: Enums.AlignmentOptions.Center, text: strings.AlignmentOptionsCenter }
        ]
    });

    public static TitleTextChoiceGroup = PropertyPaneChoiceGroup("titleText", {
        label: strings.TitleText,
        options: [
            { key: Enums.TitleTextOptions.OneLine, text: strings.TitleTextOptionsOneLine },
            { key: Enums.TitleTextOptions.TwoLines, text: strings.TitleTextOptionsTwoLines }
        ]
    });

    public static ShowIconsToggle = PropertyPaneToggle("showIcons", {
        label: strings.ShowIcons,
        onText: strings.Yes,
        offText: strings.No
    });

    public static IconSizeChoiceGroup = PropertyPaneChoiceGroup("iconSize", {
        label: strings.IconSize,
        options: [
            { key: Enums.IconSizeOptions.Small, text: strings.IconSizeSmall },
            { key: Enums.IconSizeOptions.Medium, text: strings.IconSizeMedium },
            { key: Enums.IconSizeOptions.Large, text: strings.IconSizeLarge },
            { key: Enums.IconSizeOptions.ExtraLarge, text: strings.IconSizeExtraLarge },
            { key: Enums.IconSizeOptions.FillSpace, text: strings.IconSizeFillSpace },
        ]
    });

    public static ShowOnlyIconOrImageToggle = PropertyPaneToggle("showOnlyIconOrImage", {
        label: strings.ShowOnlyIconOrImage,
        onText: strings.Yes,
        offText: strings.No        
    });

    // Quick Link Properties
    public static QuickLink_title = PropertyPaneTextField("title", {
        label: strings.Title,
    });
    public static QuickLink_url = PropertyPaneTextField("url", {
        label: strings.Link,
    });
    public static QuickLink_thumbNailUrl = PropertyPaneTextField("thumbNailUrl", {
        label: strings.Thumbnail,
    });

    public static QuickLink_alternateText = PropertyPaneTextField("alternateText", {
        label: strings.AlternateText,
    });

    public static QuickLink_description = PropertyPaneTextField("description", {
        label: strings.DescriptionFieldLabel,
    });



}