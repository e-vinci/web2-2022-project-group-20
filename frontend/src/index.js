import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';


import header from './Components/Header/header'

import Navbar from './Components/Navbar/Navbar';
import Router from './Components/Router/Router';
import Error from './Components/Error/errors';


header();
Navbar();
Router();


if(Router()){
    Router();
}else{
    Error();
}


 

