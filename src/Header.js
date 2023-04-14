import React from 'react';
import './css/Header.css';
import logo from './img/amazon.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';
import dataContext from './states/DataContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';


export default function Header() {


    const navigate = useNavigate();
    const context = useContext(dataContext);
    const { alert, display, setDisplay, profile, setProfile } = context;





    function handlelogout() {
        localStorage.removeItem('token')
        navigate('/');
        setDisplay(false);
        setProfile(false);

    }



    return (

        <>
        
       

        <div className="header_class">
            <div className='header'>
                <Link to='/'>
                    <img className="header_logo" src={logo} alt="Nothing" />
                </Link>

                <div className="header_search">
                    <input className='header_searchInput' type="text" />
                    <SearchIcon className='header_searchIcon' />

                </div>
                <div className="header_nav">


                    <div className="header_option1">

                        <Link to='/dataentry'>
                            <div className='header_optionLineOne'>
                                {profile && "Your"}
                            </div>
                            <span className='header_optionLineTwo'>
                                {profile && "Profile"}
                            </span>

                        </Link>

                    </div>

                    <div className="header_optionBasket">
                        <span className='header_optionLineTwo'>Your Cart</span>
                        <ShoppingBagIcon className='basketIcon' />

                    </div>

                    <div className="header_option">
                        <span className='header_optionLineOne'>
                            Customer
                        </span>

                        <Link to='/customerlogin'>

                            <span className='header_optionLineTwo'>
                                Log In
                            </span>

                        </Link>



                    </div>

                    <div className="header_option">
                        <span className='header_optionLineOne'>
                            Agency
                        </span>

                        <Link to='/agencylogin'>
                            <span className='header_optionLineTwo'>
                                Log In
                            </span>
                        </Link>

                    </div>

                    <div className="header_optionBasket">
                        {display &&
                            <span className='header_optionLineTwo' onClick={handlelogout}>Log Out</span>
                        }
                    </div>


                </div>

            </div>
            
        </div>

            <Alert alert={alert} />
        </>
    )
}