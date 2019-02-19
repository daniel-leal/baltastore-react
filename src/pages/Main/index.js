import React, { Component } from 'react'

// Styles
import './styles.css'

// Components
import Header from '../../components/Header'

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
import SnackbarContent from '@material-ui/core/SnackbarContent'

// API
import api from '../../services/api'

export default class Main extends Component {
  state = {
    customers: [],
    errors: {},
    customer: {
      FirstName: '',
      LastName: '',
      Document: '',
      Email: '',
      Phone: ''
    },
    open: false
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

  // TWO-WAY DATABIND
  handleFirstNameChange = e => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        FirstName: e.target.value
      }
    })
  }
  handleLastNameChange = e => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        LastName: e.target.value
      }
    })
  }
  handleDocumentChange = e => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        Document: e.target.value
      }
    })
  }
  handleEmailChange = e => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        Email: e.target.value
      }
    })
  }
  handlePhoneChange = e => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        Phone: e.target.value
      }
    })
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
      var response = await api.post('/v1/customers', this.state.customer)

      this.setState({
        customers: [...this.state.customers, response.data.data]
      })

      this.handleClose()
    } catch (error) {
      this.clearError()
      this.validate(error.response.data.data)
    }
  }

  validate = async errors => {
    let properties = {
      FirstNameError: false,
      FirstNameErrorMsg: '',
      LastNameError: false,
      LastNameErrorMsg: '',
      DocumentError: false,
      DocumentErrorMsg: '',
      EmailError: false,
      EmailErrorMsg: '',
      PhoneError: false,
      PhoneErrorMsg: ''
    }

    if (errors.find(x => x.property === 'FirstName')) {
      properties.FirstNameError = true
      properties.FirstNameErrorMsg = errors.find(
        x => x.property === 'FirstName'
      ).message
    }

    if (errors.find(x => x.property === 'LastName')) {
      properties.LastNameError = true
      properties.LastNameErrorMsg = errors.find(
        x => x.property === 'LastName'
      ).message
    }

    if (errors.find(x => x.property === 'Email')) {
      properties.EmailError = true
      properties.EmailErrorMsg = errors.find(
        x => x.property === 'Email'
      ).message
    }

    if (errors.find(x => x.property === 'Document')) {
      properties.DocumentError = true
      properties.DocumentErrorMsg = errors.find(
        x => x.property === 'Document'
      ).message
    }

    if (errors.find(x => x.property === 'Phone')) {
      properties.PhoneError = true
      properties.PhoneErrorMsg = errors.find(
        x => x.property === 'Phone'
      ).message
    }

    this.setState({ errors: properties })
  }

  render() {
    return (
      <div className='container'>
        <Header title='Customers' />

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
                value={this.state.customer.FirstName}
                onChange={this.handleFirstNameChange}
                error={this.state.errors.FirstNameError}
                helperText={this.state.errors.FirstNameErrorMsg}
                fullWidth
              />

              <TextField
                margin='dense'
                label='Last Name'
                type='text'
                value={this.state.customer.LastName}
                onChange={this.handleLastNameChange}
                error={this.state.errors.LastNameError}
                helperText={this.state.errors.LastNameErrorMsg}
                fullWidth
              />
              <TextField
                margin='dense'
                name='document'
                label='CPF'
                type='text'
                value={this.state.customer.Document}
                onChange={this.handleDocumentChange}
                error={this.state.errors.DocumentError}
                helperText={this.state.errors.DocumentErrorMsg}
                fullWidth
              />
              <TextField
                margin='dense'
                id='name'
                label='Email Address'
                type='email'
                value={this.state.customer.Email}
                onChange={this.handleEmailChange}
                error={this.state.errors.EmailError}
                helperText={this.state.errors.EmailErrorMsg}
                fullWidth
              />
              <TextField
                margin='dense'
                id='name'
                label='Phone'
                type='tel'
                value={this.state.customer.Phone}
                onChange={this.handlePhoneChange}
                error={this.state.errors.PhoneError}
                helperText={this.state.errors.PhoneErrorMsg}
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
