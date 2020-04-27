import React, { useEffect, useState, useRef } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import ViewDetails from "./ViewDetails";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(60),
        marginTop: theme.spacing(30),

        minWidth: 360,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(4),
    }
}));

function DisplayData() {
    const classes = useStyles();

    const [selectedData, setSelectedData] = useState('');
    const [selectedValueId, setSelectedValueId] = useState('');
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const PreviousId = useRef();

    const fetchData = async () => {
       const res = await axios('https://jsonplaceholder.typicode.com/posts/')
        setData(res.data);
      };

      useEffect( () => {
        fetchData(data)
      },[data]);
    

    // useEffect(() => {
        //  setData([]);
        // const fetchData = async () => {
        //     await axios('https://jsonplaceholder.typicode.com/posts')
        //     .then(res => {
        //         setData(res.data);
        //     })
        //   };
        //   fetchData();
        // debugger;
        // const res = axios('https://jsonplaceholder.typicode.com/posts/')
            // .then(res => {
                // debugger;
                // setData(res.data);
            // })
    // })

    const handleChange = (event) => {
        setSelectedData(event.target.value)
        PreviousId.current = event.target.value;
    };

    const handleOnOpen = () => {
        if (PreviousId.current !== undefined) {
            setOpen(true);
            setSelectedValueId(PreviousId.current);
        }
    }
    const handleOnClose = (value) => {
        setOpen(false);
        setSelectedData(value);
    }

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Select Value</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectedData}
                onChange={handleChange}
                label="Select Value"
            >
                {data.map(dt => (
                    <MenuItem key={dt.id} value={dt.id}>
                        {dt.title}
                    </MenuItem>
                ))
                }
            </Select>
            <Button className={classes.button} variant="contained" color="secondary" onClick={handleOnOpen}>
                Show More
        </Button>
            {
                selectedData && open &&
                <ViewDetails open={open} onClose={handleOnClose} selectedValueId={selectedValueId} />
            }
        </FormControl>
    )
}

DisplayData.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedValueId: PropTypes.number.isRequired
}

export default DisplayData