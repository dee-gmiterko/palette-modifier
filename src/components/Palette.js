import React from 'react'

import ColorPicker from './ColorPicker';

const Palette = ({ palette, changePaletteColor }) => {
    return (
        <div className={"palette small-up-"+palette.length+" small-collapse clearfix"}>
            {palette.map((color, i) => {
                return <div key={i} className="column column-block">
                    {changePaletteColor ? (
                        <ColorPicker color={color.hex()} onChange={(color) => changePaletteColor(i, color)} />
                    ) : (
                        <ColorPicker color={color.hex()} disabled={true} />
                    )}
                </div>
            })}
        </div>
    );
}

export default Palette;
