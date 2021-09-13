import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { userService } from '../services';
//import { Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LineGraph from './lineGraph';
import { format } from 'date-fns';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    graph: {
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '800px',
        width: '800px'
    },
    hold: {
        height: 'calc(100vh - 228px)',
        padding: '50px'
    }
}));


export default function Graph() {
    const classes = useStyles();

    const [country_id, setCountryId] = useState('')
    const [countrylist, setCountryList] = useState(null);
    const [cityList, setCityList] = useState(null);
    const [dataList, setDataList] = useState(null);
    const [input, setInput] = useState({
        city: '',
        date_from: format(new Date(), 'yyyy-MM-dd'),
        date_to: format(new Date(), 'yyyy-MM-dd'),
    })

    useEffect(() => {
        GetCountry();
    }, []);

    useEffect(() => {
        if (country_id) {
            GetCity();
        }
    }, [country_id]);

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        })
    }

    const GetCountry = () => {
        let thisdata = 'countries?limit=20&page=3&offset=0&sort=asc&order_by=country'
        userService.GetData(thisdata).then(a => {
            if (a.results) {
                setCountryList(a.results);
            }
        })
    }

    const GetCity = () => {
        let thisdata = `cities?limit=20&page=1&offset=0&sort=asc&country_id=${country_id}&order_by=city`
        userService.GetData(thisdata).then(a => {
            if (a.results) {
                setCityList(a.results);
            }
        })
    }

    const GetData = () => {
        if(input.city && input.date_from && input.date_to){
            let thisdata = `measurements?date_from=${input.date_from}&date_to=${input.date_to}&limit=50&page=1&offset=0&sort=desc&radius=1000&city=${input.city}&order_by=datetime&entity=government`
            userService.GetData(thisdata).then(a => {
                if (a.results) {
                    setDataList(a.results);
                }
            })
        }        
    }

    return (
        <div className={classes.hold}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    //id="demo-simple-select"
                    value={country_id}
                    onChange={(event) => setCountryId(event.target.value)}

                    label="Country"
                >
                    <MenuItem value=''>Select country</MenuItem>
                    {countrylist ?
                        countrylist.map(a => {
                            return (
                                <MenuItem key={a.code} value={a.code}>{a.name}</MenuItem>
                            )
                        }) : null}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label1">City</InputLabel>
                <Select
                    labelId="demo-simple-select-label1"
                    //id="demo-simple-select"
                    name="city"
                    value={input.city}
                    onChange={handleInputChange}
                    variant="outlined"
                    label="City"
                >
                    <MenuItem value=''>Select City</MenuItem>
                    {cityList ?
                        cityList.map(a => {
                            return (
                                <MenuItem key={a.city} value={a.city}>{a.city}</MenuItem>
                            )
                        }) : null}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField type="date"
                    name="date_from"
                    value={input.date_from}
                    variant="outlined" label="Date"
                    labelId="demo-simple-select-label2"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField type="date"
                    name="date_to"
                    value={input.date_to}
                    variant="outlined" label="Date"
                    labelId="demo-simple-select-label2"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Button variant="contained" color="primary" style={{ height: '56px' }} onClick={GetData}>
                    Search
                </Button>
            </FormControl>

            <div className={classes.graph}>
                <LineGraph dataList={dataList} />
            </div>
        </div>
    );
}