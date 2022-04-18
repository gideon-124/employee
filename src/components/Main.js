import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
//import EditIcon from "material-ui/svg-icons/image/edit"
//import TrashIcon from "material-ui/svg-icons/image/delete";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
  },
  tableContainer: {
    borderRadius: 15,
    margin:"10 10",
    align:'center',
    maxWidth:950
  },
  tableHeaderCell:{
    fontWeight:'bold',
    backgroundColor:"orange",
    

  }
}));

const Main = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const empList = localStorage.getItem("empList")
    ? JSON.parse(localStorage.getItem("empList"))
    : [];
  const [data, setData] = useState(empList);

  const confirmDelete = (emp) => {
    const confirm = window.confirm(`Deleting ${emp.name}?`);
    if (confirm) {
      const temp = data.filter((employee) => employee.email !== emp.email);
      localStorage.setItem("empList", JSON.stringify(temp));
      setData(temp);
    }
  };

  return (
    <>
      <div>
        <h1 align="center"> Employee Table</h1>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell className={classes.tableHeaderCell}>Name </TableCell>
                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                <TableCell className={classes.tableHeaderCell}>phone</TableCell>

                <TableCell className={classes.tableHeaderCell}> Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Grid container>
                      <Grid item>
                        <Avatar alt={row.name} src="." />
                      </Grid>
                      <Grid item>{row.name}</Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>

                  <TableCell>
                    <Link to={"/employees/update"} state={row}>
                      <Tooltip title="Edit" placement="left-start">
                        <EditRoundedIcon color="primary" />
                      </Tooltip>
                    </Link>
                    <Link to={""} onClick={() => confirmDelete(row)}>
                      <Tooltip title="Delete" placement="right-start">
                        <DeleteRoundedIcon color="warning" />
                      </Tooltip>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button
        onClick={() => navigate("/employees/add")}
        
      >
        Add Employee
      </Button>
    </>
  );
};

export default Main;
