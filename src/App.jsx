import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { green, blue, yellow, red } from '@mui/material/colors';
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
import PlayIcon from '@mui/icons-material/PlayArrowOutlined';
import ReplayIcon from '@mui/icons-material/PlayDisabledOutlined';
import FilterIcon from '@mui/icons-material/FilterListOutlined';
import FilterOffIcon from '@mui/icons-material/FilterListOffOutlined';
import ReorderIcon from '@mui/icons-material/ReorderOutlined';
import SegmentIcon from '@mui/icons-material/SegmentOutlined';
import SummarizeIcon from '@mui/icons-material/SummarizeOutlined';

import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, ListItem, Skeleton } from '@mui/material';

import './App.css';

const Prism = require('prismjs');


const drawerWidth = 400;

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
                    width: theme.spacing(0),
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


function getColor(auto, manual) {
    if (manual === "equiv") {
        return "green";
    } else if (auto === "unequiv" || manual === "unequiv") {
        return "red";
    } else if (auto === "equiv") {
        return "blue";
    } else {
        return "yellow";
    }
}


function App() {
    // clusters
    const [clusters, setClusters] = useState({
        "4A": {
            "open": {
                "cluster": false,
                "files": {
                    "101036360.cpp": true,
                    "117364748.cpp": true,
                    "127473352.cpp": false,
                    "134841308.cpp": false,
                    "173077807.cpp": false,
                    "48762087.cpp": false,
                    "84822638.cpp": false,
                    "84822639.cpp": false
                }
            },
            "running": false,
            "list": false,
            "filter": false,
            "data": {
                "cluster_name": "4A",
                "config": {
                    "random_seed": 0,
                    "random_test_times": 10
                },
                "custom_input": [],
                "diff": {
                    "101036360.cpp": {
                        "117364748.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "127473352.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "134841308.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "173077807.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "48762087.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822638.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822639.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        }
                    },
                    "117364748.cpp": {
                        "101036360.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "127473352.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "134841308.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "173077807.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "48762087.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822638.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822639.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        }
                    },
                    "127473352.cpp": {
                        "101036360.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "117364748.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "134841308.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        },
                        "173077807.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "48762087.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822638.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822639.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        }
                    },
                    "134841308.cpp": {
                        "101036360.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "117364748.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "127473352.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        },
                        "173077807.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "48762087.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822638.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822639.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        }
                    },
                    "173077807.cpp": {
                        "101036360.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "117364748.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "127473352.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "134841308.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "48762087.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822638.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        },
                        "84822639.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        }
                    },
                    "48762087.cpp": {
                        "101036360.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "117364748.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "127473352.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "134841308.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "173077807.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822638.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822639.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        }
                    },
                    "84822638.cpp": {
                        "101036360.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "117364748.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "127473352.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "134841308.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "173077807.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        },
                        "48762087.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822639.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        }
                    },
                    "84822639.cpp": {
                        "101036360.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "117364748.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "127473352.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "134841308.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "173077807.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        },
                        "48762087.cpp": {
                            "auto": "unequiv",
                            "logic": "unequiv",
                            "manual": "unknown"
                        },
                        "84822638.cpp": {
                            "auto": "equiv",
                            "logic": "unknown",
                            "manual": "unknown"
                        }
                    }
                },
                "diff_list": [
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "101036360.cpp",
                        "file2": "117364748.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "101036360.cpp",
                        "file2": "127473352.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "101036360.cpp",
                        "file2": "134841308.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "101036360.cpp",
                        "file2": "173077807.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "101036360.cpp",
                        "file2": "48762087.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "101036360.cpp",
                        "file2": "84822638.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "101036360.cpp",
                        "file2": "84822639.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "117364748.cpp",
                        "file2": "127473352.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "117364748.cpp",
                        "file2": "134841308.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "117364748.cpp",
                        "file2": "173077807.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "117364748.cpp",
                        "file2": "48762087.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "117364748.cpp",
                        "file2": "84822638.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "117364748.cpp",
                        "file2": "84822639.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "equiv",
                        "cluster_name": "4A",
                        "file1": "127473352.cpp",
                        "file2": "134841308.cpp",
                        "logic": "unknown",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "127473352.cpp",
                        "file2": "173077807.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "127473352.cpp",
                        "file2": "48762087.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "127473352.cpp",
                        "file2": "84822638.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "127473352.cpp",
                        "file2": "84822639.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "134841308.cpp",
                        "file2": "173077807.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "134841308.cpp",
                        "file2": "48762087.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "134841308.cpp",
                        "file2": "84822638.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "134841308.cpp",
                        "file2": "84822639.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "173077807.cpp",
                        "file2": "48762087.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "equiv",
                        "cluster_name": "4A",
                        "file1": "173077807.cpp",
                        "file2": "84822638.cpp",
                        "logic": "unknown",
                        "manual": "unknown"
                    },
                    {
                        "auto": "equiv",
                        "cluster_name": "4A",
                        "file1": "173077807.cpp",
                        "file2": "84822639.cpp",
                        "logic": "unknown",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "48762087.cpp",
                        "file2": "84822638.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "unequiv",
                        "cluster_name": "4A",
                        "file1": "48762087.cpp",
                        "file2": "84822639.cpp",
                        "logic": "unequiv",
                        "manual": "unknown"
                    },
                    {
                        "auto": "equiv",
                        "cluster_name": "4A",
                        "file1": "84822638.cpp",
                        "file2": "84822639.cpp",
                        "logic": "unknown",
                        "manual": "unknown"
                    }
                ],
                "equiv": [],
                "files": {
                    "101036360.cpp": {
                        "content": "#include<iostream>\nusing namespace std;\nint main(){\n\tint n;\n\tcin>>n;\n\tcout<<\"Yes\";\n}\n",
                        "equiv_class": "101036360.cpp"
                    },
                    "117364748.cpp": {
                        "content": "#include <iostream>\n\nusing namespace std;\n\nint main()\n{\n\n    return 0;\n}",
                        "equiv_class": "117364748.cpp"
                    },
                    "127473352.cpp": {
                        "content": "#include <iostream>\nusing namespace std; \nint main() {\n\tcout<<\"YES\";\n\treturn 0;\n}",
                        "equiv_class": "127473352.cpp"
                    },
                    "134841308.cpp": {
                        "content": "#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<\"YES\";\n\treturn 0;\n} ",
                        "equiv_class": "134841308.cpp"
                    },
                    "173077807.cpp": {
                        "content": "#import<iostream>\nmain(int n){std::cin>>n;puts(n<3|n%2?\"NO\":\"YES\");}",
                        "equiv_class": "173077807.cpp"
                    },
                    "48762087.cpp": {
                        "content": "#include<iostream>\nusing namespace std ;\nint main()\n{\n    cout<<\"HELLO\" ;\n}",
                        "equiv_class": "48762087.cpp"
                    },
                    "84822638.cpp": {
                        "content": "#import<cstdio>\nmain(int w){scanf(\"%d\",&w);puts(w<3||w%2?\"NO\":\"YES\");}",
                        "equiv_class": "84822638.cpp"
                    },
                    "84822639.cpp": {
                        "content": "#include<cstdio>\nmain(int w){scanf(\"%d\",&w);puts(w<3||w%2?\"NO\":\"YES\");}",
                        "equiv_class": "84822639.cpp"
                    }
                },
                "is_loaded": true,
                "random_input_generator": {
                    "content": "int(1,100)",
                    "type": "stdin_format.txt"
                },
                "unequiv": [
                    [
                        "117364748.cpp",
                        "134841308.cpp"
                    ],
                    [
                        "117364748.cpp",
                        "48762087.cpp"
                    ],
                    [
                        "134841308.cpp",
                        "84822639.cpp"
                    ],
                    [
                        "48762087.cpp",
                        "84822638.cpp"
                    ],
                    [
                        "117364748.cpp",
                        "173077807.cpp"
                    ],
                    [
                        "127473352.cpp",
                        "48762087.cpp"
                    ],
                    [
                        "101036360.cpp",
                        "134841308.cpp"
                    ],
                    [
                        "101036360.cpp",
                        "48762087.cpp"
                    ],
                    [
                        "117364748.cpp",
                        "84822638.cpp"
                    ],
                    [
                        "48762087.cpp",
                        "84822639.cpp"
                    ],
                    [
                        "127473352.cpp",
                        "173077807.cpp"
                    ],
                    [
                        "101036360.cpp",
                        "173077807.cpp"
                    ],
                    [
                        "134841308.cpp",
                        "48762087.cpp"
                    ],
                    [
                        "127473352.cpp",
                        "84822638.cpp"
                    ],
                    [
                        "117364748.cpp",
                        "84822639.cpp"
                    ],
                    [
                        "134841308.cpp",
                        "173077807.cpp"
                    ],
                    [
                        "101036360.cpp",
                        "84822638.cpp"
                    ],
                    [
                        "117364748.cpp",
                        "127473352.cpp"
                    ],
                    [
                        "101036360.cpp",
                        "117364748.cpp"
                    ],
                    [
                        "127473352.cpp",
                        "84822639.cpp"
                    ],
                    [
                        "134841308.cpp",
                        "84822638.cpp"
                    ],
                    [
                        "101036360.cpp",
                        "84822639.cpp"
                    ],
                    [
                        "101036360.cpp",
                        "127473352.cpp"
                    ],
                    [
                        "173077807.cpp",
                        "48762087.cpp"
                    ]
                ]
            }
        }
    });

    // get file content from clusters
    function getFileContent(cluster_name, file) {
        if (cluster_name in clusters) {
            if (file in clusters[cluster_name].data.files) {
                return clusters[cluster_name].data.files[file].content;
            }
        }
        return "";
    }

    // get color from file1 and file2
    function getColorFromFiles(cluster_name, file1, file2) {
        if (cluster_name === '' || file1 === '' || file2 === '') {
            return 'red';
        }
        return getColor(clusters[cluster_name].data.diff[file1][file2].auto,
            clusters[cluster_name].data.diff[file1][file2].manual);
    }

    // render Radio
    function renderRadio(color) {
        switch (color) {
            case "green":
                return <Radio {...controlProps(true, 'green', green[800], green[600])} />;
            case "blue":
                return <Radio {...controlProps(true, 'blue', blue[800], blue[600])} />;
            case "yellow":
                return <Radio {...controlProps(true, 'yellow', yellow[900], yellow[800])} />;
            case "red":
                return <Radio {...controlProps(true, 'red', red[800], red[600])} />;
            default:
                return <Radio {...controlProps(true, 'red', red[800], red[600])} />;
        }
    }

    // render files or diff
    function renderFiles(cluster_name) {
        if (clusters[cluster_name].list) {
            return (
                <List component="div" disablePadding>
                    {
                        clusters[cluster_name].data.diff_list.filter((diff) => {
                            const color = getColor(diff.auto, diff.manual);
                            return !clusters[cluster_name].filter || color === 'blue' || color === 'yellow';
                        }).map((diff) => (
                            <ListItemButton onClick={() => openDiff(cluster_name, diff.file1, diff.file2)}
                                sx={{ pl: 6 }} key={diff.file1 + " / " + diff.file2}>
                                <ListItemIcon>
                                    <DifferenceIcon />
                                </ListItemIcon>
                                <ListItemText primary={diff.file1 + " / " + diff.file2} />
                                {renderRadio(getColor(diff.auto, diff.manual))}
                            </ListItemButton>
                        ))
                    }
                </List>
            )
        } else {
            return (
                <>{
                    Object.keys(clusters[cluster_name].data.files).map((file) => (
                        <div key={file}>
                            <List component="div" disablePadding>
                                <ListItemButton onClick={() => toggleOpenFile(cluster_name, file)} sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <FileIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={file} />
                                    {clusters[cluster_name].open.files[file] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                            </List>
                            <Collapse in={clusters[cluster_name].open.files[file]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        Object.keys(clusters[cluster_name].data.diff[file]).filter((file2) => {
                                            const color = getColorFromFiles(cluster_name, file, file2);
                                            return !clusters[cluster_name].filter || color === 'blue' || color === 'yellow';
                                        }).map((file2) => (
                                            <ListItemButton onClick={() => openDiff(cluster_name, file, file2)}
                                                sx={{ pl: 6 }} key={file + " / " + file2}>
                                                <ListItemIcon>
                                                    <DifferenceIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={file + " / " + file2} />
                                                {renderRadio(getColorFromFiles(cluster_name, file, file2))}
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </div>
                    ))
                }</>
            )
        }
    }

    // cluster_name, file1, file2
    const [clusterName, setClusterName] = useState("");
    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");

    function openDiff(cluster_name, file1, file2) {
        setClusterName(cluster_name);
        setFile1(file1);
        setFile2(file2);
    }

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleDrawer = () => {
        setSidebarOpen(!sidebarOpen);
    };

    function toggleOpenCluster(cluster_name) {
        if (clusters[cluster_name].open.cluster) {
            clusters[cluster_name].open.cluster = false;
        } else {
            clusters[cluster_name].open.cluster = true;
        }
        // update clusters
        setClusters({ ...clusters });
    };

    function toggleOpenFile(cluster_name, file) {
        if (clusters[cluster_name].open.files[file]) {
            clusters[cluster_name].open.files[file] = false;
        } else {
            clusters[cluster_name].open.files[file] = true;
        }
        // update clusters
        setClusters({ ...clusters });
    };

    function toggleList(cluster_name) {
        if (clusters[cluster_name].list) {
            clusters[cluster_name].list = false;
        } else {
            clusters[cluster_name].list = true;
        }
        // update clusters
        setClusters({ ...clusters });
    };

    function toggleFilter(cluster_name) {
        if (clusters[cluster_name].filter) {
            clusters[cluster_name].filter = false;
        } else {
            clusters[cluster_name].filter = true;
        }
        // update clusters
        setClusters({ ...clusters });
    };


    const handleChangeRadio = (event) => {
        // setSelectedValue(event.target.value);
    };

    const controlProps = (val, item, uncheckedColor, checkedColor) => ({
        checked: val,
        onChange: handleChangeRadio,
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
                <AppBar position="absolute" open={sidebarOpen} color='inherit'>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '12px',
                                ...(sidebarOpen && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {file1} / {file2}
                        </Typography>
                        <div>
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'green', 'green', green[800], green[600])} />
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'blue', 'blue', blue[800], blue[600])} />
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'yellow', 'yellow', yellow[900], yellow[800])} />
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'red', 'red', red[800], red[600])} />
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={sidebarOpen}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: [2],
                        }}
                    >
                        <SummarizeIcon />
                        <Typography variant="h6" noWrap>
                            目录
                        </Typography>
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {
                            Object.keys(clusters).map((cluster_name) => (
                                <div key={cluster_name}>
                                    <ListItemButton onClick={() => toggleOpenCluster(cluster_name)}>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={cluster_name} />
                                        {
                                            clusters[cluster_name].running ? (
                                                <ReplayIcon onClick={(e) => { e.stopPropagation(); }} />
                                            ) : (
                                                <PlayIcon onClick={(e) => { e.stopPropagation(); }} />
                                            )
                                        }
                                        {
                                            clusters[cluster_name].list ? (
                                                <ReorderIcon onClick={(e) => { e.stopPropagation(); toggleList(cluster_name) }} />
                                            ) : (
                                                <SegmentIcon onClick={(e) => { e.stopPropagation(); toggleList(cluster_name) }} />
                                            )
                                        }
                                        {
                                            clusters[cluster_name].filter ? (
                                                <FilterIcon onClick={(e) => { e.stopPropagation(); toggleFilter(cluster_name) }} />
                                            ) : (
                                                <FilterOffIcon onClick={(e) => { e.stopPropagation(); toggleFilter(cluster_name) }} />
                                            )
                                        }
                                        {
                                            clusters[cluster_name].open.cluster ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )
                                        }
                                    </ListItemButton>
                                    <Collapse in={clusters[cluster_name].open.cluster} timeout="auto" unmountOnExit>
                                        {
                                            clusters[cluster_name].running ? (
                                                <List component="div" disablePadding>
                                                    <ListItem sx={{ pl: 6 }}>
                                                        <Skeleton variant="text" width={300} height={30} />
                                                    </ListItem>
                                                </List>
                                            ) : (
                                                renderFiles(cluster_name)
                                            )
                                        }
                                    </Collapse>
                                </div>
                            ))
                        }
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
                        oldValue={getFileContent(clusterName, file1)}
                        newValue={getFileContent(clusterName, file2)}
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