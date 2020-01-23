import React, { Component } from 'react';

import { Container, Row, Col} from "shards-react";
import LoaderSmall from '../../../Loaders/LoaderSmall';
import ViewCategories from './ViewCategories';
import { toast } from 'react-toastify';
import {
    Card,
    CardHeader,
    ListGroup,
    FormInput,
    Button,
    InputGroup,
    InputGroupAddon
  } from "shards-react";


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           category: '',
           errMessage: '',
           requestPending: false,
           categories: [],
           isLoading: true
         };
      }

      notify = (message) => {
        switch(this.state.type){
          case "success":
                  toast.success(message);
              break;
          case "warn":
              toast.warn("Error: " + message);
              break;
          default:
              break;
        }
      }

   

      handleCategory = (event) => {
        const val = event.target.value;
        const data = (val.trim()).replace(' ', '_');
        this.setState({category: data})
      }

    componentDidMount(){
        this.getCategories();
    }   

    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 



    render() { 
        return ( 
            <Container fluid className="main-content-container px-4 pb-4">
         
        
            <Row>
              {/* Editor */}
              <Col lg="6" md="12">
                <ViewCategories categories={this.state.categories} isLoading={this.state.isLoading}/>
              </Col>
        
              {/* Sidebar Widgets */}
              <Col lg="6" md="12">
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                    <h6 className="m-0">Create Category</h6>
                    </CardHeader>
                    {this.state.requestPending === true ?
                        <LoaderSmall/>
                    :
                        ""}
                    <ListGroup flush className="p-4">
                        <label htmlFor="role">Category Name</label>
                        <InputGroup seamless className="mb-3">
                            <FormInput  onChange={this.handleCategory} placeholder="category name" />
                            <InputGroupAddon type="append">
                                <Button onClick={this.onSubmitRequest} theme="success">Add</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </ListGroup>
            </Card>
              </Col>
            </Row>
          </Container>
           
         );
    }

    getCategories = () => {
        this.setState({
            isLoading: true
        });
        fetch('https://lshub.herokuapp.com/api/v1/content/category/list',{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth'),
                signal: this.abortController.signal
            }
        })
        .then(response => response.json())
        .then(object => {
            this.setState({
                categories: object.data,
                isLoading: false
            });
        })
        .catch(err => {
            this.setState({
                loading: false
             });
            if (err.name === 'AbortError') return; // expected, this is the abort, so just return
            console.log(err);
        });
      }

      onSubmitRequest = () => {
        this.setState({requestPending: true});
      fetch('https://lshub.herokuapp.com/api/v1/content/category/create',{
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'bearer ' + localStorage.getItem('Auth')
          },
          body: JSON.stringify({
              name: this.state.category
          })
      })
      .then(response => response.json())
      .then(data => {
          this.setState({requestPending: false});
          switch(data.status){
              case "success":
                  this.setState({type: "success"});
                  this.notify(data.message); 
                  this.getCategories();
              break;
              case "fail":
                  this.setState({type: "warn"});
                  this.notify(data.message); 
              break;
              default:
                      this.setState({type: "warn"});
                  this.notify(data.message);
              break;
          }
      ;})
      .catch(err => {
          this.setState({errMessage: 'Error' + err});
      })
    }
}
 
export default Category;