import React from 'react';
import Loader from '../../Loaders/Loader';
import { 
    Container,
     Row, 
     Col, 
     Card, 
     CardBody, 
     Badge,
     CardFooter ,
     FormSelect,
     FormInput,
     InputGroupAddon,
     InputGroup
    } from "shards-react"
import SingleMedia from './SingleMediaModal';
import ReadMore from '../../ReadMore/ReadMore';
import { confirmAlert } from 'react-confirm-alert';

class ViewProduct extends React.Component{
    constructor(props){
        super(props);
        this.state={
           currentMedia: null,
            open: false,
            contents: this.props.contents,
            searchQuery: ''
        }
    }

    componentDidUpdate(prevProps, prevState){
 
      if(prevProps.contents !== this.props.contents){
        this.setState({contents: this.props.contents});
      }
    }
 
    toggleModal = (event) => {
      
        if(event){
         let mediaId = event.target.id;
         this.setState({
            open: !this.state.open,
            currentMedia: this.props.contents[mediaId]
         });
     }
       // return this.state.open
        
     }

     searchFilter = (e) => {
      let filter = parseInt(e.target.value);
      let type = this.props.contents.filter(content => {
        return content.content_type.id === filter
      })
      if(filter !== 0) {
        this.setState({contents: type})
      }else{
      this.setState({contents: this.props.contents});
      }
    }
    
    searchInput = (e) => {
      let value = e.target.value;
     this.setState({ searchQuery: value });
    } 
    
    getFilteredProductList() {
      return !this.state.searchQuery
        ? this.state.contents
        : this.state.contents.filter(content => content.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()));
    }  

    handleDelete = (event) => {
      const productId = event.target.id;
     confirmAlert({
         title: 'Confirm Delete',
         message: 'Are you sure you want to delete this item?',
         buttons: [
           {
             label: 'Yes',
             onClick: () => this.props.deleteContent(productId)
           },
           {
             label: 'No',
             
           }
         ]
       });
   }

render(){

    const { error, loading, type } = this.props;
    let contents = this.getFilteredProductList();
    console.log(contents)
    let showModal = '';
     const icon = (typeId) =>{
        if(typeId === 1) {
          return require("../../../images/covers/video.png")
        }else if(typeId === 5) {
          return require("../../../images/covers/audio.png")
        }else if(typeId === 4) {
          return require("../../../images/covers/pdf.png")
        }
    }

    if(this.state.currentMedia !== null){
         showModal = <SingleMedia media={this.state.currentMedia} toggle={this.toggleModal} open={this.state.open}/>;
    }
    return(

        <Container className="mt-2">
          <Row>
            <Col md="2" className="form-group">
              <label htmlFor="filter">Filter</label>
              <FormSelect id="filter" onChange={this.searchFilter}>
                <option value="0">All</option>
                <option value="5">Audio</option>
                {/* <option value="contentname">Username</option> */}
                <option value="1">Video</option>
                <option value="4">Ebook</option>
                </FormSelect>
              </Col>
              <Col md="10" className="form-group">
              <label htmlFor="filter">-</label>
              <FormInput type="text" placeholder="search for product..." onInput={this.searchInput}/>
              </Col>
          </Row>
            {/* <h5 className="card-title">All {type}s </h5> */}
                {loading ?
                <Loader />
                :
                
                    Array.isArray(contents) && contents.length > 0 ?
                   <Row>
                    {contents.map((content, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            //console.log(content);
                            return(
                                <Col lg="3" md="3" sm="6" className="mb-4" key={content.id}>
                                <Card small className="card-post card-post--1 mx-0" style={{'height': '100%'}}>
                                  <div
                                    className="card-post__image mb-0"
                                    style={{ textAlign : 'center' }}
                                  >
                                    <img
                                        className="link pointer dim img-responsive"
                                        src= {icon(content.content_type.id)}
                                        alt={content.title}
                                        height="130px"
                                        id={index}
                                        onClick={this.toggleModal}
                                        />
                                    <Badge
                                      pill
                                      className={`card-post__category bg-dark f7`}
                                    >
                                       {content.category ? content.category.name : ''}
                                    </Badge>
                                   
                                  </div>
                                  <CardBody className="my-n5">
                                    <p className="card-title mb-n3">
                                      <p onClick={this.toggleModal} id={index} className="text-fiord-blue link pointer">
                                      {content.title ? content.title : ''}
                                      </p>
                                    </p>
                                    <div className="card-text d-inline-block mb-0 pb-0 f5">
                                        {/* <Truncate lines={2} ellipsis={<span className="mb-0">... <p className="link pointer blue mb-0 pb-0" id={content.id}>show more</p></span>}>
                                            {content.description}
                                        </Truncate> */}
                                        <ReadMore children={content.description} id={content.id}/>
                                    </div>
                                    </CardBody>
                                  <CardFooter className="mt-0 pt-2 f5">
                                  <span className="text-muted mb-1 pb-0"><i className="material-icons mr-1">person</i>{content.owner ? content.owner.fullname : ''}</span><br/>
                                    {content.price? <b><i className="material-icons mr-1">money</i><span className="text-muted">₦{content.price}</span></b> : ""}
                                  </CardFooter>
                                </Card>
                              </Col>
                                
                            )
                        })
                        }
                        </Row>
                    :
                        error ?
                        <p className="text-center brown" style={{color: 'brown'}}>{error}</p>
                        : <p className="f4 fw6 text-center">No products found</p>
                }
                {showModal}
        </Container>
    );
}


}

export default ViewProduct;
