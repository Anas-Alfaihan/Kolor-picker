import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { SketchPicker } from 'react-color';

function App() {
    const [color, setColor] = useState('#1fa9f4');
    const [gradient, setGradient] = useState([]);
    let id = 0;

    return (
        <>
            <SketchPicker
                color={color}
                onChange={(color, event) => {
                    setColor(color);
                    invoke('generate_gradiant', color.rgb).then((grad) => {
                        id = 0;
                        setGradient(grad);
                    });
                }}
            />
            {gradient.map((color) => (
                <div
                    key={(id += 1)}
                    style={{
                        padding: '2rem',
                        background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                    }}
                >
                    rgb({color[0]}, {color[1]}, {color[2]})
                </div>
            ))}
        </>
    );
}

export default App;
