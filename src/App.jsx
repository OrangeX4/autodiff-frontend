import { useState, useEffect } from 'react';
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


function getColor(auto, logic) {
    if (logic === "equiv") {
        return "green";
    } else if (logic === "unequiv") {
        return "red";
    } else if (auto === "equiv") {
        return "blue";
    } else {
        return "yellow";
    }
}

function downloadFile(filename, text) {
    const elementA = document.createElement('a')

    // 文件的名称为时间戳加文件名后缀
    elementA.download = filename
    elementA.style.display = 'none'

    // 生成一个blob二进制数据，内容为文本数据
    const blob = new Blob([text])

    //生成一个指向blob的URL地址，并赋值给a标签的href属性
    elementA.href = URL.createObjectURL(blob)
    document.body.appendChild(elementA)
    elementA.click()
    document.body.removeChild(elementA)
}

// 读取数据
const url = "http://localhost:7376";

function initClusters(setClusters) {
    // GET http://localhost:7376/clusters
    fetch(url + "/clusters")
        .then(response => response.json())
        .then(data => {
            const result = {};
            for (const cluster_name in data) {
                result[cluster_name] = {};
                result[cluster_name].running = false;
                result[cluster_name].list = false;
                result[cluster_name].filter = false;
                result[cluster_name].open = {
                    "cluster": false,
                    "files": {},
                };
                for (const file in data[cluster_name].files) {
                    result[cluster_name].open.files[file] = false;
                }
                result[cluster_name].data = data[cluster_name];
            }
            setClusters(result);
        });
}

function updateManual(cluster_name, file1, file2, manual, clusters, setClusters) {
    // POST http://localhost:7376/update
    fetch(url + "/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "cluster_name": cluster_name,
            "file1": file1,
            "file2": file2,
            "manual": manual,
        }),
    })
        .then(response => response.json())
        .then(data => {
            clusters[cluster_name].data = data;
            clusters = { ...clusters };
            setClusters(clusters);
        });
}

function handleRun(cluster_name, clusters, setClusters) {
    // POST http://localhost:7376/run
    // update running
    clusters[cluster_name].running = true;
    clusters = { ...clusters };
    setClusters(clusters);
    // run
    fetch(url + "/run", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "cluster_name": cluster_name,
        }),
    })
        .then(response => response.json())
        .then(data => {
            clusters[cluster_name].running = false;
            clusters[cluster_name].data = data;
            clusters = { ...clusters };
            setClusters(clusters);
        });
}


function handleCsv() {
    // GET http://localhost:7376/csv
    fetch(url + "/csv")
        .then(response => response.json())
        .then(data => {
            downloadFile("equal.csv", data.equal_csv_content);
            downloadFile("unknown.csv", data.unknown_csv_content);
            downloadFile("inequal.csv", data.inequal_csv_content);
        });
}


function App() {
    // init clusters
    useEffect(() => {
        initClusters(setClusters);
    }, []);

    // clusters
    const [clusters, setClusters] = useState({});

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
            clusters[cluster_name].data.diff[file1][file2].logic);
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
                            const color = getColor(diff.auto, diff.logic);
                            return !clusters[cluster_name].filter || color === 'blue' || color === 'yellow';
                        }).map((diff) => (
                            <ListItemButton onClick={() => openDiff(cluster_name, diff.file1, diff.file2)}
                                sx={{ pl: 6 }} key={diff.file1 + " / " + diff.file2}>
                                <ListItemIcon>
                                    <DifferenceIcon />
                                </ListItemIcon>
                                <ListItemText primary={diff.file1 + " / " + diff.file2} />
                                {renderRadio(getColor(diff.auto, diff.logic))}
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
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'green', 'green', green[800], green[600])}
                                onClick={() => updateManual(clusterName, file1, file2, "equiv", clusters, setClusters)} />
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'blue', 'blue', blue[800], blue[600])}
                                onClick={() => updateManual(clusterName, file1, file2, "unknown", clusters, setClusters)} />
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'yellow', 'yellow', yellow[900], yellow[800])}
                                onClick={() => updateManual(clusterName, file1, file2, "unknown", clusters, setClusters)} />
                            <Radio {...controlProps(getColorFromFiles(clusterName, file1, file2) === 'red', 'red', red[800], red[600])}
                                onClick={() => updateManual(clusterName, file1, file2, "unequiv", clusters, setClusters)} />
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
                        <IconButton onClick={handleCsv} >
                            <SummarizeIcon />
                        </IconButton>
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
                                                <PlayIcon onClick={(e) => { e.stopPropagation(); handleRun(cluster_name, clusters, setClusters) }} />
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