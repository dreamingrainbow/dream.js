import { MainWrapper } from './components/lib/MainWrapper.js';

import { HoloCard } from './components/theme/holo/HoloCard.js';
import { HoloGrid } from './components/theme/holo/HoloGrid.js';
import { HoloPanel } from './components/theme/holo/HoloPanel.js';
import { HoloTitle } from './components/theme/holo/HoloTitle.js';
import { HoloButton } from './components/theme/holo/HoloButton.js';

const Library = {
    MainWrapper
};

const HoloLibrary = {
    HoloCard,
    HoloGrid,
    HoloPanel,
    HoloTitle,
    HoloButton,
};

const Components = {
    Library,
    HoloLibrary
};



export { Components };

export default Components;



/*

// app.js

import Dream from "./dream.js";

import { HoloCard } from "./components/HoloCard.js";
import { HoloButton } from "./components/HoloButton.js";

const App = () => {

    
};

Dream.onReady({
    el: "app",
    node: HoloCard({
        children: [
            {
                el: "h2",
                content: "Welcome"
            },
            HoloButton({
                id: "connect",
                text: "Connect Wallet"
            })
        ]
    })
}, App);

*/