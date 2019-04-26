import 'Stylesheets/app.css';
import 'Stylesheets/sidebar.custom.css';
import '../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
import './favicon.ico';
import mobileAndTabletcheck from 'Utilities/checkIfMobile';
import { initMap } from 'Map/map';
import { addDropdowns } from 'Sidebar/select';

const isMobile = mobileAndTabletcheck();
initMap();
addDropdowns();

export { isMobile };
