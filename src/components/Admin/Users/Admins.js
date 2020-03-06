import React from 'react';
import UsersModal from './UsersModal';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardHeader, CardBody} from "shards-react"

class Admins extends React.Component{
    constructor(){
        super();
        this.state={
            open: false,
            user: {},
            role: {}
        }
    }

    currentUser = (index) => {
        return this.props.users[index]
    }

   toggleModal = (event) => {
      
       if(event){
        let userId = event.target.id;
        this.setState({
           open: !this.state.open,
           user: this.props.users[userId]
        });
    }
       return this.state.open
       
    }

render(){
    const {user, open} = this.state;
    const { users, loading, error } = this.props;
    let i = 1;
    return(

        <Container className="mt-4">
            <Row>
            <Col>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">All Admins</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                {loading ?
                <Loader />
                :
                    users[0] ?
                    <table className="table mb-0 table-responsive">
                    <thead className="bg-light">
                        <tr>
                        <th scope="col" className="border-0">
                            #
                        </th>
                        <th scope="col" className="border-0">
                            Full Name
                        </th>
                        <th scope="col" className="border-0">
                            Username
                        </th>
                        <th scope="col" className="border-0">
                            Email
                        </th>
                        <th scope="col" className="border-0">
                            Phone Number
                        </th>
                        <th scope="col" className="border-0">
                            Role
                        </th>
                        <th scope="col" className="border-0">
                            Signup Date
                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            return(
                                <tr key={user.id}>
                                    <td>{i++}</td>
                                    <td>{user.fullname ? user.fullname : ''}</td>
                                    <td>{user.phonenumber ? user.phonenumber : ''}</td>
                                    <td>{user.email ? user.email : ''}</td>
                                    <td>{user.phonenumber ? user.phonenumber : ''}</td>
                                    <td>{user.UserRole.Role ? user.UserRole.Role.name : ''}</td>
                                    <td></td>
                                    <td>
                                        <button theme="primary" className="btn btn-sm btn-info mb-2 mr-1" onClick={this.toggleModal} id={index}>
                                            View
                                        </button>
                                    </td>
                                   
                                </tr> 
                                
                            )
                        })}
                    </tbody>
                    </table>
                    :
                        error ?
                        <p className="text-center brown" style={{color: 'brown'}}>{error}</p>
                        : <p className="f4 fw6 text-center">No users with this role available</p>
                }
                </CardBody>
                </Card>
            </Col>
            </Row>
            <UsersModal user={user} toggle={this.toggleModal} open={open}/>
        </Container>
    );
}
}

export default Admins;
