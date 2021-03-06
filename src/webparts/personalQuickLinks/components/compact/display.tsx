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
                    <Link href={ item.url } className={ styles.link }>
                        <div className={ styles.content }>
                            <ImageIcon  imageProps={ imageProps } className={ styles.thumbnail }/>
                            <div title={ item.title } className={ styles.cardText }>{ item.title }</div>
                        </div>
                    </Link>
                </div>
            </div>
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