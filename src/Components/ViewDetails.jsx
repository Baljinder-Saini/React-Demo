import React, { useState,useEffect,useRef } from "react"
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttonMargin:{
        marginTop:theme.spacing(3),       
    }
}));

function ViewDetails(props){
    const classes = useStyles();
    debugger;    
    const {open,onClose,selectedValueId} = props
    const [dataValue,setDataValue] = useState([]);
    const id = useRef();
    id.current = props.selectedValueId;

    // useEffect(() => {       
        // const fetchData = async () => {
        //     axios('https://jsonplaceholder.typicode.com/posts' + id.current)
        //     .then(res => {
        //          setDataValue(res.data);

        //     })
        //   };
        //   fetchData(); 
        //  setDataValue([]);
    // // //   const res =  axios('https://jsonplaceholder.typicode.com/posts/' + id.current);
            // .then(res => {
                //  setDataValue(res.data);
            // })                
    // })

    const fetchData = async () => {
        const res = await axios('https://jsonplaceholder.typicode.com/posts/' + id.current);
        setDataValue(res.data);
       };
 
       useEffect( () => {
         fetchData(dataValue)
       },[dataValue]);
       
    const handleClose = () => {
        onClose(selectedValueId);
    }
    return(
        <div>        
        <Modal className={classes.modal} disableBackdropClick open={open} onClose={handleClose} aria-labelledby="simple-dialog-title">
            <div className={classes.paper}>
                <h2 id="spring-modal-title">{dataValue.title}</h2>
                <p id="spring-modal-description">{dataValue.body}</p>
                <Button className={classes.button} onClick={handleClose} variant="contained" color="secondary">
                Close             
             </Button>
            </div>
           
        </Modal>
      </div>
    )    
}

export default ViewDetails