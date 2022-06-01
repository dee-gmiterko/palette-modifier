import React, {useState} from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

const ColorPicker = ({color, onChange, disabled}) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        if(disabled) {
            return;
        }

        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const styles = reactCSS({
        'default': {
            color: {
                width: '100%',
                height: '16px',
                borderRadius: '2px',
                background: color,
            },
            swatch: {
                padding: '5px',
                width: '100%',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: disabled ? 'inherit' : 'pointer',
            },
            popover: {
                position: 'absolute',
                marginLeft: -145,
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <div>
            <div style={ styles.swatch } onClick={ handleClick }>
                <div style={ styles.color } />
            </div>
            { displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ handleClose }/>
                <SketchPicker color={ color } disableAlpha={true} onChange={ onChange } />
            </div> : null }
        </div>
    );
}

export default ColorPicker;
