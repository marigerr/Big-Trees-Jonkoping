import 'Stylesheets/app.css';
import 'Stylesheets/sidebar.custom.css';
import '../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
import mobileAndTabletcheck from 'Utilities/checkIfMobile.js';
import { initMap } from 'Map/map.js';
import {addDropdowns} from 'Sidebar/select.js';

var isMobile = mobileAndTabletcheck();
initMap();
addDropdowns();

export {isMobile};
