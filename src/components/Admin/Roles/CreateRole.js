import React, { Component } from 'react';
import Loader from '../../Loaders/Loader';
import {
    Card,
    CardHeader,
    ListGroup,
    FormInput,
    Collapse,
    Button,
    FormCheckbox
  } from "shards-react";

  
  const addPermissions = [];

class CreateRole extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapse: false,
            permissions: [],
            role: '',
            permissionsArray: [],
            isLoading: true
         };
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
        this.getPermissions();
      }

      getPermissions = () => {
        fetch('https://lshub.herokuapp.com/api/v1/account/permission/list',{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth')
            }
        })
        .then(response => response.json())
        .then(object => {
            this.setState({
                permissions: object.data,
                isLoading: false
            });
        })
        .catch(err => (err));
      }

      handleCheckBox = (event) => {
          const val = event.target.value;
          const intValue = parseInt(val);
        if(event.target.checked === true){
            addPermissions.push(intValue);
            this.setState({permissionsArray: addPermissions})
        }else{
            addPermissions.splice( addPermissions.indexOf(intValue), 1 );
            this.setState({permissionsArray: addPermissions})
        }
      }

      handleRole = (event) => {
          const val = event.target.value;
        this.setState({role: val})
      }

      onSubmit= () => {
        const { role, permissionsArray } = this.state;
        const roleData = (role.trim()).replace(' ', '_');
        console.log(roleData);
        console.log(permissionsArray);

       this.onSubmitRequest(roleData, permissionsArray);
      }

      onSubmitRequest = (role, permissions) => {
        fetch('https://lshub.herokuapp.com/api/v1/account/role/create',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth')
            },
            body: JSON.stringify({
                name: role,
                permissions: permissions
            })
        })
        .then(response => response.json())
        .then(user => console.log(user) )
      }

    render() { 
        const { permissions } = this.state;
        return ( 
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">Create Role</h6>
                </CardHeader>
                <ListGroup flush className="p-4">
                    <label htmlFor="role">Role Name</label>
                    <FormInput
                        type="text"
                        id="role"
                        placeholder="role.."
                        onChange={this.handleRole}
                    />
                </ListGroup>
                <ListGroup className="pb-4 pr-4 pl-4 pt-0">
                     <div>
                        <Button theme="secondary" onClick={this.toggle}>Select permissions</Button>
                        <Collapse open={this.state.collapse}>
                        <div className="p-3 mt-3 border rounded">
                            <strong className="text-muted d-block mb-2">Permissions</strong>
                            <fieldset>
                                {this.state.isLoading ?
                                <Loader />
                            :
                                <table className="table table-light mb-0">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" className="border-0">
                                                Name
                                            </th>
                                            <th scope="col" className="border-0">
                                                Id
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {permissions.map((permission, index) => {
                                    return(
                                        <tr key={permission.id} >
                                        <td>
                                            <FormCheckbox onChange ={this.handleCheckBox} id={permission.id} value={permission.id}>{permission.name}</FormCheckbox>
                                        </td>
                                        <td>{permission.id}</td>
                                        </tr>
                                        
                                    );
                                })}
                                    </tbody>
                                </table>
                            }
                            </fieldset>
                        </div>
                        <Button theme="info" onClick={this.onSubmit}>Submit</Button>
                        </Collapse>
                    </div>
                </ListGroup>
          </Card>

         
         );
    }
}
 
export default CreateRole;