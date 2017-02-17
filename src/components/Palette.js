import React from 'react'

import ColorPicker from './ColorPicker';

class Palette extends React.Component {

    render() {
        return (
            <div className={"palette small-up-"+this.props.palette.length+" small-collapse clearfix"}>
                {this.props.palette.map((color, i) => {
                    return <div key={i} className="column column-block">
                        {this.props.changePaletteColor ? 
                        <ColorPicker color={color} onChange={(color) => this.props.changePaletteColor(i, color)} />
                        :
                        <ColorPicker color={color} disabled={true} />
                        }
                    </div>
                })}
            </div>
        );
    }
}

export default Palette;
