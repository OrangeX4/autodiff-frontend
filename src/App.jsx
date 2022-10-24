import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { green, yellow, red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Radio from '@mui/material/Radio';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import FileIcon from '@mui/icons-material/DescriptionOutlined';
import DifferenceIcon from '@mui/icons-material/DifferenceOutlined';
import ChangeIcon from '@mui/icons-material/VisibilityOutlined';
import PlayIcon from '@mui/icons-material/PlayArrowOutlined';
import ReplayIcon from '@mui/icons-material/PlayDisabledOutlined';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItem, Skeleton } from '@mui/material';

import './App.css'

const Prism = require('prismjs');


const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

const highlightSyntax = (str) => {
    if (!str) return;
    const html = Prism.highlight(str, Prism.languages.clike, "clike");
    return <pre><code className="language-cpp" dangerouslySetInnerHTML={{
        __html: html,
        // __html: str,
    }}
    /></pre>
};

const oldCode = `
#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int size, int target, int* returnSize) {
    int* returnValues = (int*)malloc(2 * sizeof(int));

    for (int i = 0; i < size; ++i) {
        for (int j = i + 1; j < size; ++j) {
            if (nums[i] + nums[j] == target) {
                returnValues[0] = i;
                returnValues[1] = j;
                *returnSize = 2;
                return returnValues;
            }
        }
    }

    return 0;
}

int main() {
    int nums[] = { 2, 7, 11, 15 };
    int returnSize;
    int* result = twoSum(nums, 4, 18, &returnSize);
    printf("%d %d", result[0], result[1]);
    
    getchar();
    getchar();
    return 0;
}
`;

const newCode = `
#include <stdlib.h>
#include <stdio.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* returnValues = (int*)malloc(2 * sizeof(int));

    for (int i = 0; i < numsSize; ++i) {
        for (int j = i + 1; j < numsSize; ++j) {
            if (nums[i] + nums[j] == target) {
                returnValues[1] = j;
                returnValues[0] = i;
                *returnSize = 2;
                return returnValues;
            }
        }
    }

    return 0;
}

int main() {
    int returnSize;
    int nums[] = { 2, 7, 11, 15 };
    int* result = twoSum(nums, 4, 18, &returnSize);
    printf("%d %d", result[0], result[1]);
    
    getchar();
    return 0;
}
`;

function App() {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => {
        setOpen(!open);
    };

    const [selectedValue, setSelectedValue] = useState('yellow');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const controlProps = (val, item, uncheckedColor, checkedColor) => ({
        checked: val,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
        sx: {
            color: uncheckedColor,
            '&.Mui-checked': {
                color: checkedColor,
            },
        }
    });

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={true} color='inherit'>
                    <Toolbar>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            File1 / File2
                        </Typography>
                        <div>
                            <Radio {...controlProps(selectedValue === 'green', 'green', green[800], green[600])} />
                            <Radio {...controlProps(selectedValue === 'yellow', 'yellow', yellow[900], yellow[800])} />
                            <Radio {...controlProps(selectedValue === 'red', 'red', red[800], red[600])} />
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={true}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: [2],
                        }}
                    >
                        <MenuIcon style={{ marginRight: 30 }} />
                        <Typography variant="h6" noWrap>
                            目录
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <ListItemButton onClick={toggleOpen}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Diff" />
                            <ReplayIcon onClick={(e) => e.stopPropagation()} />
                            <ChangeIcon onClick={(e) => e.stopPropagation()} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem sx={{ pl: 6 }}>
                                    <Skeleton variant="text" width={300} height={30} />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={toggleOpen}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Diff" />
                            <PlayIcon onClick={(e) => e.stopPropagation()} />
                            <ChangeIcon onClick={(e) => e.stopPropagation()} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }}>
                                    <ListItemIcon>
                                        <DifferenceIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="File1 / File2" />
                                    <Radio {...controlProps(true, 'yellow', yellow[900], yellow[800])} />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={toggleOpen}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Folder" />
                            <PlayIcon onClick={(e) => e.stopPropagation()} />
                            <ChangeIcon onClick={(e) => e.stopPropagation()} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }}>
                                    <ListItemIcon>
                                        <FileIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="File1" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        // backgroundColor: (theme) =>
                        //     theme.palette.mode === 'light'
                        //         ? theme.palette.grey[100]
                        //         : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar sx={{ marginBottom: 1 }} />
                    <ReactDiffViewer
                        oldValue={oldCode}
                        newValue={newCode}
                        showDiffOnly={false}
                        compareMethod={DiffMethod.WORDS}
                        renderContent={highlightSyntax}
                        splitView={true}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;