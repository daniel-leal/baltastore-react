import React, { Component } from 'react'

// Styles
import './styles.css'

// Components
import Header from '../../components/Header'
import MySnackbarContentWrapper from '../../components/Snackbar'

// Material
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'

// API
import api from '../../services/api'

export default class Main extends Component {
  state = {
    customers: [],
    customer: {
      FirstName: '',
      LastName: '',
      Document: '',
      Email: '',
      Phone: ''
    },
    errors: {},
    successMsg: '',
    open: false,
    openSnack: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/v1/customers')
      this.setState({ customers: response.data })
    } catch (err) {}
  }

  // DIALOG FUNCTIONS
  handleClickOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.clearForm()
    this.clearError()
    this.setState({
      open: false
    })
  }

  // SNACKBAR FUNCTIONS
  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ openSnack: false })
  }
  handleClick = () => {
    this.setState({ openSnack: true })
  }

  // TWO-WAY DATABIND
  handleChange = event => {
    const { customer } = this.state
    const {
      target: { name, value }
    } = event
    this.setState({ customer: { ...customer, [name]: value } })
  }

  // FORM ACTIONS
  clearForm = () => {
    this.setState({
      customer: {
        FirstName: '',
        LastName: '',
        Document: '',
        Email: '',
        Phone: ''
      }
    })
  }
  clearError = () => {
    this.setState({
      errors: {}
    })
  }
  save = async () => {
    try {
      console.log(this.state.customer)
      var response = await api.post('/v1/customers', this.state.customer)

      this.setState({
        customers: [...this.state.customers, response.data.data],
        successMsg: response.data.message
      })

      this.handleClose()
      this.handleClick()
    } catch (error) {
      this.clearError()
      let errors = {}

      error.response.data.data.map(x => {
        return (errors[x.property] = x.message)
      })

      this.setState({ errors })
    }
  }

  render() {
    return (
      <div className='container'>
        <Header title='Customers' />

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={this.handleCloseSnack}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSnack}
            variant='success'
            message={this.state.successMsg}
          />
        </Snackbar>

        <div className='ajusteTopo'>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align='center'>CPF</TableCell>
                  <TableCell align='center'>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.customers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell component='th' scope='row'>
                      {customer.name}
                    </TableCell>
                    <TableCell align='center'>{customer.document}</TableCell>
                    <TableCell align='center'>{customer.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>

        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby='form-dialog-title'
          >
            <DialogTitle id='form-dialog-title'>Inclusão</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin='dense'
                label='First Name'
                type='text'
                name='FirstName'
                value={this.state.customer.FirstName}
                onChange={this.handleChange}
                error={this.state.errors.hasOwnProperty('FirstName')}
                helperText={this.state.errors.FirstName}
                fullWidth
              />
              <TextField
                margin='dense'
                label='Last Name'
                type='text'
                name='LastName'
                value={this.state.customer.LastName}
                onChange={this.handleChange}
                error={this.state.errors.hasOwnProperty('LastName')}
                helperText={this.state.errors.LastName}
                fullWidth
              />
              <TextField
                margin='dense'
                label='CPF'
                type='text'
                name='Document'
                value={this.state.customer.Document}
                onChange={this.handleChange}
                error={this.state.errors.hasOwnProperty('Document')}
                helperText={this.state.errors.Document}
                fullWidth
              />
              <TextField
                margin='dense'
                id='name'
                label='Email Address'
                type='email'
                name='Email'
                value={this.state.customer.Email}
                onChange={this.handleChange}
                error={this.state.errors.hasOwnProperty('Email')}
                helperText={this.state.errors.Email}
                fullWidth
              />
              <TextField
                margin='dense'
                id='name'
                label='Phone'
                type='tel'
                name='Phone'
                value={this.state.customer.Phone}
                onChange={this.handleChange}
                error={this.state.errors.hasOwnProperty('Phone')}
                helperText={this.state.errors.Phone}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={this.save} color='primary' variant='contained'>
                Incluir
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className='buttonTopo'>
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleClickOpen}
          >
            Incluir
          </Button>
        </div>
      </div>
    )
  }
}
