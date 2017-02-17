import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            displayColorPicker: false,
        }
    }

    handleClick = () => {
        if(this.props.disabled) {
            return;
        }
        
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '100%',
                    height: '16px',
                    borderRadius: '2px',
                    background: this.props.color,
                },
                swatch: {
                    padding: '5px',
                    width: '100%',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: this.props.disabled ? 'inherit' : 'pointer',
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
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.props.color } disableAlpha={true} onChange={ this.props.onChange } />
                </div> : null }
            </div>
        );
    }
}

export default ColorPicker;
