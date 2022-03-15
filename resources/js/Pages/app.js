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
import { Container } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Detail from './components/Detail';
import Private from './components/Private'
import PostForm from './components/PostForm';
import UserIndex from './components/UserIndex';
import UserShow from './components/UserShow';
import NotFound from './components/NotFound';

function App() {
    return (
        <div className='App'>
            <Container>
                <Header></Header>
                    <Router>                            
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/posts/create" element={<PostForm />} />
                            <Route exact path="/posts/users" element={<Private />} />
                            <Route exact path="/posts/:id" element={<Detail />} />
                            <Route exact path="/users" element={<UserIndex />} />
                            <Route path="/users/:id" element={<UserShow />} />
                            <Route element={<NotFound />} />
                        </Routes>
                    </Router>
                <Footer></Footer>
            </Container>
        </div>
    );
};
export default App;

if (document.getElementById("App")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}