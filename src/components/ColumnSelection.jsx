import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === "") {
            reject(new Error("Error while saving user: name cannot be empty."));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    []
  );
};

const initialRows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    experience: 1,
    isEditMode: false, // Added flag for edit mode
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    experience: 2,
    isEditMode: false, // Added flag for edit mode
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    experience: 3,
    isEditMode: false, // Added flag for edit mode
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    experience: 4,
    isEditMode: false, // Added flag for edit mode
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    experience: 5,
    isEditMode: false, // Added flag for edit mode
  },
];

export default function CombinedGrid() {
  const mutateRow = useFakeMutation();

  const [snackbar, setSnackbar] = React.useState(null);
  const [openExperienceDialog, setOpenExperienceDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [newExperience, setNewExperience] = React.useState("");
  const [rows, setRows] = React.useState(initialRows);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // Track dialog open state

  const handleCloseSnackbar = () => setSnackbar(null);
  const handleCloseExperienceDialog = () => {
    setOpenExperienceDialog(false);
    setIsDialogOpen(false); // Close dialog and reset state
    setSelectedUser(null);
    setNewExperience("");
  };
  const handleOpenExperienceDialog = (user) => {
    if (!isDialogOpen) {
      // Check if dialog is already open
      setOpenExperienceDialog(true);
      setSelectedUser(user);
      setNewExperience("");
      setIsDialogOpen(true); // Set dialog open state
    }
  };

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: "User successfully saved", severity: "success" });
      return response;
    },
    [mutateRow]
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleUpdateExperience = () => {
    let totalExperience;
    if (newExperience === "") {
      totalExperience = selectedUser.experience;
    } else {
      totalExperience = selectedUser.experience + parseInt(newExperience, 10);
    }

    const updatedRows = rows.map((row) =>
      row.id === selectedUser.id ? { ...row, experience: totalExperience } : row
    );
    setRows(updatedRows);
    handleCloseExperienceDialog();
  };

  const handleEditRow = (id) => {
    if (!isDialogOpen) {
      // Check if dialog is already open
      const updatedRows = rows.map((row) =>
        row.id === id
          ? { ...row, isEditMode: true }
          : { ...row, isEditMode: false }
      );
      setRows(updatedRows);
      const user = updatedRows.find((row) => row.id === id);
      handleOpenExperienceDialog(user);
    }
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
      renderCell: (params) =>
        params.row.isEditMode ? (
          <TextField
            value={params.row.age}
            onChange={(e) => handleCellEdit(e, params.row.id, "age")}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "experience",
      headerName: "Experience",
      width: 220,
      renderCell: (params) =>
        params.row.isEditMode ? (
          <TextField
            value={params.row.experience}
            onChange={(e) => handleCellEdit(e, params.row.id, "experience")}
          />
        ) : (
          <Button onClick={() => handleOpenExperienceDialog(params.row)}>
            {params.value || params.row.experience}
          </Button>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <EditIcon
              onClick={() => handleEditRow(params.row.id)}
              style={{ cursor: isDialogOpen ? "not-allowed" : "pointer" }} // Disable icon if dialog is open
            />
            <DeleteIcon
              onClick={() => handleDeleteRow(params.row.id)}
              style={{ cursor: isDialogOpen ? "not-allowed" : "pointer" }} // Disable icon if dialog is open
            />
          </div>
        );
      },
    },
  ];

  const handleCellEdit = (e, id, field) => {
    const value = e.target.value;
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
        disableSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />

      <Snackbar
        open={!!snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <Alert {...snackbar} onClose={handleCloseSnackbar} />
      </Snackbar>

      <Dialog open={openExperienceDialog} onClose={handleCloseExperienceDialog}>
        <DialogTitle>Update Experience</DialogTitle>
        <DialogContent>
          <ListItemText
            primary={`Selected User: `}
            secondary={
              <div style={{ color: "green" }}>{selectedUser?.name}</div>
            }
          />
          <TextField
            style={{ marginTop: "15px" }}
            type="number"
            label="Current Experience"
            value={selectedUser?.experience || ""}
            onChange={(e) => {
              setSelectedUser((prevUser) => ({
                ...prevUser,
                experience: parseInt(e.target.value, 10) || 0,
              }));
            }}
            fullWidth
          />
          <TextField
            label="New Experience"
            value={newExperience}
            type="number"
            onChange={(e) => setNewExperience(e.target.value)}
            style={{ margin: "15px 0" }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseExperienceDialog}
            style={{ color: "orange" }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateExperience} style={{ color: "green" }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
