import * as React from 'react';
import { IQuickLinks, IQuickLink } from 'models';
import { FocusZone, List, ImageIcon, Link, Icon, IImageProps, ImageFit } from 'office-ui-fabric-react';
import styles from './styles.module.scss';

export const CompactDisplay: React.FunctionComponent<IQuickLinks> = props => {
    const onRenderCell = React.useCallback((item:IQuickLink, index: number | undefined) => {
        const imageProps: IImageProps = {
            src: item.thumbNailUrl,
            imageFit: ImageFit.cover,
            maximizeFrame: false,
            className: styles.icon
        }
        return (
            <div style={{margin: "0px 10px 10px", position: "relative"}}>
                <div style={{ width: "284.667px"}}>
                    get
                    <Link href={ item.url } className={ styles.link }>
                        <div className={ styles.content }>
                            {/* <Image className={ styles.image } src={ item.thumbNailUrl } /> */}
                            <ImageIcon  imageProps={ imageProps } className={ styles.thumbnail }/>
                            <div title="Home" className={ styles.cardText } data-automation-id="quick-links-item-title">{ item.title }</div>
                        </div>
                    </Link>
                </div>
            </div>
            // <a href="https://wchdev.sharepoint.com/sites/GSS-User-3/Shared Documents/ExampleFilewithPII.xlsx?web=1">
            //     <div data-automation-id="compact-card">
            //         <Image src={item.thumbNailUrl} />
            //         <div title="Home" className="cardText-249" data-automation-id="quick-links-item-title">{item.title}</div>
            //     </div>
            // </a>
        );
    }, []);

    return(
            <FocusZone className={ styles.focusZone }>
                <List
                    items={ props.links }
                    onRenderCell= { onRenderCell }
                />                
            </FocusZone>
    );
}