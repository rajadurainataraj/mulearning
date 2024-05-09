import * as React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error('Error while saving user: name cannot be empty.'))
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() })
          }
        }, 200)
      }),
    []
  )
}

const initialRows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    experience: 3, // Assuming initial total experience is 3
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
  // Add more initial rows as needed
]

export default function CombinedGrid() {
  const mutateRow = useFakeMutation()
  const [datas, setDatas] = React.useState({
    totalExperience: 3,
    companies: [
      { company: 'heal', years: 2, dlt: DeleteIcon },
      { company: 'yws', years: 1, dlt: DeleteIcon },
    ],
  })
  const [snackbar, setSnackbar] = React.useState(null)
  const [openExperienceDialog, setOpenExperienceDialog] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [newExperience, setNewExperience] = React.useState(null)
  const [rows, setRows] = React.useState(initialRows)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false) // Track dialog open state
  const [getId, setGetId] = React.useState('')
  const [newCompanies, setNewCompanies] = React.useState([])

  const handleCloseSnackbar = () => setSnackbar(null)
  const handleCloseExperienceDialog = () => {
    setOpenExperienceDialog(false)
    setIsDialogOpen(false) // Close dialog and reset state
    setSelectedUser(null)
    setNewExperience('')
  }
  const handleOpenExperienceDialog = (user) => {
    const users = user.id === getId
    console.log(user.id, 'user')
    console.log(user.isEditMode, 'row')
    if (user.isEditMode) setOpenExperienceDialog(true)
    if (!isDialogOpen) {
      // Check if dialog is already open
      // setOpenExperienceDialog(true)
      setSelectedUser(user)
      setNewExperience('')
      setIsDialogOpen(true)
    }
  }

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow)
      setSnackbar({ children: 'User successfully saved', severity: 'success' })
      return response
    },
    [mutateRow]
  )

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' })
  }, [])

  const handleUpdateExperience = () => {
    if (newExperience !== null) {
      // Check if newExperience is not null
      let totalExperience = 0
      datas.companies.forEach((company) => {
        totalExperience += parseInt(company.years, 10)
      })

      const updatedRows = rows.map((row) =>
        row.id === selectedUser.id
          ? { ...row, experience: totalExperience }
          : row
      )
      setRows(updatedRows)
    }
    handleCloseExperienceDialog()
  }

  const handleEditRow = (id) => {
    setGetId(id)
    console.log(id, 'id')
    if (!isDialogOpen) {
      // Check if dialog is already open
      const updatedRows = rows.map((row) =>
        row.id === id
          ? { ...row, isEditMode: true }
          : { ...row, isEditMode: false }
      )
      setRows(updatedRows)
      // const user = updatedRows.find((row) => row.id === id)
      // handleOpenExperienceDialog(user);
    }
  }

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id)
    setRows(updatedRows)
  }
  const handleAddCompany = () => {
    const newCompany = { company: '', years: null, dlt: DeleteIcon }
    setNewCompanies([...newCompanies, newCompany])

    setDatas((prevDatas) => ({
      ...prevDatas,
      companies: [...prevDatas.companies, newCompany],
    }))
  }
  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) =>
        params.row.isEditMode ? (
          <TextField
            value={params.row.age}
            onChange={(e) => handleCellEdit(e, params.row.id, 'age')}
          />
        ) : (
          params.value
        ),
    },
    {
      field: 'experience',
      headerName: 'Experience',
      width: 220,
      renderCell: (params) => {
        const isNewCompany = newCompanies.some((c) => c === params.row)
        const experienceValue = parseInt(params.value, 10)
        const isEditClicked = rows.find(
          (row) => row.id === params.row.id
        )?.isEditMode

        return (
          <Button
            onClick={() => handleOpenExperienceDialog(params.row)}
            disabled={!isEditClicked}
          >
            {isNewCompany
              ? ''
              : isNaN(experienceValue)
              ? ''
              : experienceValue || params.row.experience}
          </Button>
        )
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', gap: '20px' }}>
            <EditIcon
              onClick={() => handleEditRow(params.row.id)}
              style={{ cursor: isDialogOpen ? 'not-allowed' : 'pointer' }} // Disable icon if dialog is open
            />
            <DeleteIcon
              onClick={() => handleDeleteRow(params.row.id)}
              style={{ cursor: isDialogOpen ? 'not-allowed' : 'pointer' }} // Disable icon if dialog is open
            />
          </div>
        )
      },
    },
  ]

  const handleCellEdit = (e, id, field) => {
    const value = e.target.value
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    )
    setRows(updatedRows)
  }
  const handleDeleteCompany = (company) => {
    const updatedCompanies = datas.companies.filter((c) => c !== company)
    const totalExperience = updatedCompanies.reduce(
      (total, c) => total + parseInt(c.years, 10),
      0
    )
    setDatas((prevDatas) => ({
      ...prevDatas,
      companies: updatedCompanies,
      totalExperience,
    }))
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
              <div style={{ color: 'green' }}>{selectedUser?.name}</div>
            }
          />
          {datas.companies.map((item) => (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <TextField
                  label="Company Name"
                  value={item.company}
                  onChange={(e) => {
                    const updatedCompanies = datas.companies.map((c) =>
                      c === item ? { ...c, company: e.target.value } : c
                    )
                    setDatas((prevDatas) => ({
                      ...prevDatas,
                      companies: updatedCompanies,
                    }))
                  }}
                  style={{ margin: '15px 0' }}
                  fullWidth
                />
                <TextField
                  label="Experience"
                  value={item.years}
                  type="number"
                  onChange={(e) => {
                    const updatedCompanies = datas.companies.map((c) =>
                      c === item ? { ...c, years: e.target.value } : c
                    )
                    const totalExperience = updatedCompanies.reduce(
                      (total, company) =>
                        total + parseInt(company.years || 0, 10),
                      0
                    )
                    setDatas((prevDatas) => ({
                      ...prevDatas,
                      companies: updatedCompanies,
                      totalExperience: totalExperience,
                    }))
                  }}
                  style={{ margin: '15px 0' }}
                  fullWidth
                />
                {item.dlt && (
                  <Button onClick={() => handleDeleteCompany(item)}>
                    <DeleteIcon color="red" />
                  </Button>
                )}
                {/* <Button onClick={() => handleDeleteCompany(item.company)}>
                  <DeleteIcon />
                </Button> */}
              </div>
            </>
          ))}
          <Button onClick={() => handleAddCompany()}>Add New Company</Button>
          <div>Total Experience: {datas.totalExperience}</div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseExperienceDialog}
            style={{ color: 'orange' }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateExperience} style={{ color: 'green' }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
