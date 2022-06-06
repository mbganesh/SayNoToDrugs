import {
  AppBar,
  Modal,
  Button,
  Card,
  Stack,
  Toolbar,
  Typography,
  TextField,
  Switch,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import Colors from "./constants/Colors";

import AddIcon from "@mui/icons-material/Add";
import DateIcon from "@mui/icons-material/CalendarMonth";
import TimeIcon from "@mui/icons-material/AccessTime";

import Images from "./constants/Images";
import { useEffect, useState } from "react";
import moment from "moment";
import { styled } from "@mui/system";
import APIClient from "./constants/APIClient";
import useStateRef from "react-usestateref";

const ModalRoot = styled("div")(({ theme }) => ({
  display: "flex ",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "10px",
  flexWrap: "wrap",
  backgroundColor: "#FFF8F3",
  width: "40%",
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "85%",
  },
}));

function App() {
  const MyDrugType = [
    "Coolip",
    "Weed",
    "Cigarette",
    "Ganesh",
    "Alcohol",
    "Self_Plesure",
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [myObj, setMyObj] = useState({
    type: "",
    reason: "",
    solution: "",
    date: moment().format("MMM Do YY"),
    time: moment().format("LT"),
    isNecessary: false,
  });

  const [myList, setMyList , myListRef] = useStateRef([]);

  const handleType = (txt) => {
    setMyObj({ ...myObj, type: txt });
  };

  const handleReason = (txt) => {
    setMyObj({ ...myObj, reason: txt });
  };

  const handleSolution = (txt) => {
    setMyObj({ ...myObj, solution: txt });
  };

  const handleIsNecessary = () => {
    setMyObj({ ...myObj, isNecessary: !myObj.isNecessary });
  };

  const handleAdd = () => {
    console.log(myObj);

    setMyList([...myList , myObj])

    if(isNewData){
      console.log(myListRef.current);
      let storeLocalData = JSON.stringify(myListRef.current)
      localStorage.setItem(APIClient.LOCALSTORAGE_KEY , storeLocalData)
    }else{
      let getLocalData =  localStorage.getItem(APIClient.LOCALSTORAGE_KEY)
      let dataList = JSON.parse(getLocalData)
      dataList.push(myObj)
      setMyList(dataList)

      let storeLocalData = JSON.stringify(myListRef.current)
      localStorage.setItem(APIClient.LOCALSTORAGE_KEY , storeLocalData)
    }

    handleClose();

    setMyObj({
      type: "",
      reason: "",
      solution: "",
      date: moment().format("MMM Do YY"),
      time: moment().format("LT"),
      isNecessary: false,
    });
  };

  const [isNewData, setIsNewData] = useState(true)

  useEffect(()=>{
    let myData =  localStorage.getItem(APIClient.LOCALSTORAGE_KEY)
    console.log(myData);

    if(myData === null){
      console.log('new entry');
    }else{
      console.log('already had some data')
      setIsNewData(!isNewData)
     
      let getLocalData =  localStorage.getItem(APIClient.LOCALSTORAGE_KEY)
      let dataList = JSON.parse(getLocalData)
      setMyList(dataList)
    }

  } , [])

  return (
    <div style={{ backgroundColor: Colors.DARK_THREE}}>
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: Colors.DARK_TWO }}>
          <Typography sx={{ flex: 1 }}>Say No To Drugs</Typography>
          <Button
            onClick={() => handleOpen()}
            endIcon={<AddIcon />}
            variant="contained"
            sx={{
              backgroundColor: Colors.DARK_THREE,
              "&:hover": { backgroundColor: Colors.DARK_THREE },
            }}
          >
            {" "}
            Add{" "}
          </Button>
        </Toolbar>
      </AppBar>

      {/* myList */}
      <div
        style={{
          overflow:'auto',
          overflowX:'hidden',
          whiteSpace:'nowrap',
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          // height:'90vh',
        }}
      >
        {myListRef.current.map((obj, i) => (
          <Card
            key={i}
            sx={{
              margin: "5px",
              padding: "20px",
              width: "300px",
              // height:'300px',
              backgroundColor: Colors.DARK_FOUR,
              color: Colors.WHITE_COLOR,
              border: obj?.isNecessary
                ? `3px solid ${Colors.GREEN_COLOR}`
                : `3px solid ${Colors.RED_COLOR}`,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <img
                src={Images[obj.type]}
                style={{ width: "100px", height: "100px" }}
              />
              <Stack alignItems="flex-start" justifyContent="space-between">
                <Typography> Name : {obj?.type} </Typography>
                <Typography
                  component={Stack}
                  direction="row"
                  alignItems="center"
                >
                  <DateIcon sx={{ marginRight: 1 }} />
                  Date : {obj?.date}
                </Typography>
                <Typography
                  component={Stack}
                  direction="row"
                  alignItems="center"
                >
                  <TimeIcon sx={{ marginRight: 1 }} />
                  Time : {obj?.time}
                </Typography>
              </Stack>
            </Stack>

            <Stack mt={5}>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <Typography> Reason : {obj?.reason} </Typography>
              </div>

              <Typography sx={{ display: obj?.isNecessary ? "" : "none" }}>
                {" "}
                Solution : {obj?.solution}{" "}
              </Typography>
            </Stack>
          </Card>
        ))}
      </div>

      {/* footer */}
      {/* <Stack p={1}>
        <Typography>...</Typography>
      </Stack> */}

      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <ModalRoot>
          <Typography
            sx={{
              padding: "20px",
              width: "100%",
              backgroundColor: Colors.DARK_THREE,
              color: Colors.WHITE_COLOR,
              textAlign: "center",
            }}
            variant="h5"
          >
            {" "}
            You Kills Yourself ☠️{" "}
          </Typography>

          <Stack style={{ width: "100%", padding: "20px" }}>
            <div>
              <Typography>Drug Type :</Typography>

              <Select
                fullWidth
                variant="outlined"
                placeholder="Enter Drug Type"
                value={myObj.type}
                size="small"
                onChange={(e) => handleType(e.target.value)}
              >
                {MyDrugType.map((txt, i) => (
                  <MenuItem value={txt} key={i}>
                    {" "}
                    {txt}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <Typography>Why do you use it? :</Typography>
              <TextField
                size="small"
                autoComplete="off"
                fullWidth
                variant="outlined"
                placeholder="Enter Reason"
                value={myObj.reason}
                onChange={(e) => handleReason(e.target.value)}
              />
            </div>

            <div
              style={{
                width: "100%",
                display: myObj.isNecessary ? "" : "none",
              }}
            >
              <Typography>Is there any way you can help? :</Typography>
              <TextField
                size="small"
                fullWidth
                autoComplete="off"
                variant="outlined"
                placeholder="Enter Solution"
                value={myObj.solution}
                onChange={(e) => handleSolution(e.target.value)}
              />
            </div>

            <div>
              <Typography>Is Necessary? :</Typography>

              <Switch
                checked={myObj.isNecessary}
                onChange={() => handleIsNecessary()}
              />
            </div>

            <div>
              <Button variant="contained" onClick={() => handleAdd()}>
                {" "}
                Submit{" "}
              </Button>
            </div>
          </Stack>
        </ModalRoot>
      </Modal>
    </div>
  );
}

export default App;
