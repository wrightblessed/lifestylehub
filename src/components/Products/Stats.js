import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
    Row,
    Col,
    Card,
    CardBody
} from 'shards-react';
import HttpService from '../../utils/API';
import Loader from '../Loaders/Loader';
import LoaderSmall from '../Loaders/LoaderSmall';

const _http = new HttpService();
class Stats extends Component {
    constructor(){
        super();
        this.state={
            // user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
            // contents: [],
            // media: []
        }
    }

    changeRoute = (event) => {
        const target = event.target.id;
        switch(target){
            case 'products':
                this.props.history.push('/products/allProducts');
                break;
            case 'videos':
                this.props.history.push('/products/videos');
                break;
            case 'audios':
                this.props.history.push('/products/audios');
                break;
            case 'ebooks':
                this.props.history.push('/products/ebooks');
                break;
            default:
                this.props.history.push('#');
                break;
        }

    }

    componentDidMount(){
        // this.getContents()
    }

    render() { 
        const { media, contents, loading } = this.props;
        let products, contentLength = 0;
        let video, audio, ebook = [];
       (contents) && (contents.length > 0) ? contentLength = contents.length : contentLength = 0;
        if((media) && (media.length > 0)){
            products = media.length + contentLength;

            video = media.filter(media => {
                if(media.media_type){
                    return media.media_type.id === 1;
                }
            });

            audio = media.filter(media => {
                if(media.media_type){
                    return media.media_type.id === 5;
                }
            });
            
            ebook = media.filter(media => {
                if(media.media_type){
                    return media.media_type.id === 4;
                }
            });
        }
        return ( 
            <Row >
                <Col lg="12" md="12" sm="12" className="mb-4">
                    <Card>
                        <CardBody className="text-center text white link dim pointer f4 fw6 bg-success" id="products">
                            <h5 className="text white">All</h5>
                            {loading ? <LoaderSmall/> : products}
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6" className="mb-4">
                    <Card>
                        <CardBody className="text-center text white f4 fw6 bg-warning link dim pointer" id="videos" onClick={this.changeRoute}>
                            <h5 className="text white">Videos</h5>
                            {loading ? <LoaderSmall/> : video ? video.length : 0}
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6" className="mb-4">
                    <Card>
                        <CardBody className="text-center text white f4 fw6 bg-info link bg-animate dim pointer" id="audios" onClick={this.changeRoute}>
                            <h5 className="text white">Audios</h5>
                            {loading ? <LoaderSmall/> : audio ? audio.length : 0}
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6" className="mb-4">
                    <Card>
                        <CardBody className="text-center text white f4 fw6 bg-dark link dim pointer" id="ebooks" onClick={this.changeRoute}>
                            <h5 className="text white">Ebooks</h5>
                            {loading ? <LoaderSmall/> : ebook ? ebook.length : 0}
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6" className="mb-4">
                    <Card>
                        <CardBody className="text-center text white f4 fw6 bg-primary link dim pointer" id="ebooks" onClick={this.changeRoute}>
                            <h5 className="text white">Contents</h5>
                            {loading ? <LoaderSmall/> : contents ? contents.length : 0}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
         );
    }

    // getContents = () => {
    //     const mediaUrl = `content/media/list?owner_id=${this.state.user.id}`;
    //     const contentUrl= `content/list?owner_id=${this.state.user.id}`;
    //     axios.all([
    //       _http.sendGet(mediaUrl),
    //       _http.sendGet(contentUrl)
    //       ])
    //       .then(axios.spread((response1, response2)=> {
    //         //   console.log(response1.data)
    //         //   console.log(response2.data)
    //         this.setState({media: response1.data, contents: response2.data})
    //       }))
    //   }
}
 
export default withRouter(Stats);