The TabPanel component is a React functional component designed to facilitate the rendering of content within a tabbed interface. It manages the visibility of tab panels based on the selected tab index (value) and renders the corresponding content (children) when the tab is active.

Props
children (optional): ReactNode representing the content of the tab panel.
index (required): Number indicating the index of the tab panel.
value (required): Number representing the index of the currently selected tab.

import { Tab, Tabs } from '@mui/material';
import { TabPanel, a11yProps } from '@/components/TabPanel';

const MyTabs = () => {
    const [currentTabValue, setCurrentTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTabValue(newValue);
    };

    return (
        <div>
            <Tabs value={currentTabValue} onChange={handleTabChange} aria-label="Tabs example">
                <Tab label="Tab 1" {...a11yProps(0)} />
                <Tab label="Tab 2" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={currentTabValue} index={0}>
                {/* Content for Tab 1 */}
            </TabPanel>
            <TabPanel value={currentTabValue} index={1}>
                {/* Content for Tab 2 */}
            </TabPanel>
        </div>
    );
};

export default MyTabs;

Dependencies
React: The component uses React functional component syntax and JSX for rendering.
Material-UI (@mui/material): Utilizes Material-UI components (Box, Typography, Tabs, Tab) for styling and UI components.
Accessibility (a11yProps): Provides accessibility attributes (id, aria-controls) for screen readers.
Functionality
TabPanel Component: Manages visibility of tab panels based on value and index props.
a11yProps Function: Generates accessibility attributes for tabs (id, aria-controls) to improve accessibility.
Flexibility: Allows developers to define and switch between different tab panels easily within a tabbed interface.
Notes
Ensure all dependencies (@mui/material, React) are correctly installed and imported into your project.
Customize the children prop to render the specific content for each tab panel.
Modify the handleTabChange function to handle tab selection and update currentTabValue accordingly.
