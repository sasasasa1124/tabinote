require('../bootstrap');

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PostShow from './components/PostShow';
import PostForm from './components/PostForm';
import Private from './components/Private'
import UserIndex from './components/UserIndex';
import UserShow from './components/UserShow';
import NotFound from './components/NotFound';

function App() {
    return (
        <div className='App'>
            <Container>
                <Row><Header></Header></Row>
                <Row>
                    <Router>                            
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/posts/create" element={<PostForm />} />
                            <Route exact path="/posts/private" element={<Private />} />
                            <Route exact path="/posts/:id" element={<PostShow />} />
                            <Route exact path="/users" element={<UserIndex />} />
                            <Route path="/users/:id" element={<UserShow />} />
                            <Route element={<NotFound />} />
                        </Routes>
                    </Router>
                </Row>
                <Row><Footer></Footer></Row>
            </Container>
        </div>
    );
};
export default App;

if (document.getElementById("App")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}