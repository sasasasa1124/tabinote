require('./bootstrap');

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

import Home from './components/Home';
import PostIndex from './components/PostIndex';
import PostShow from './components/PostShow';
import PostForm from './components/PostForm';
import UserIndex from './components/UserIndex';
import UserShow from './components/UserShow';
import NotFound from './components/NotFound';

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/posts/create" element={<PostForm />} />
                    <Route path="/posts/:id" element={<PostShow />} />
                    <Route exact path="/users" element={<UserIndex />} />
                    <Route path="/users/:id" element={<UserShow />} />
                    <Route element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};
export default App;

if (document.getElementById("App")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}