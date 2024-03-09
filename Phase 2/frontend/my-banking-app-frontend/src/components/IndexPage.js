import AOS from 'aos';
import '../App.css';
import '../style.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customerSignUp,findAllCustomer} from '../slice/customerSlice';
import {loginSignIn} from '../slice/userSlice';
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import ErrorModal from './ErrorModal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
function IndexPage() {
let loginState = useSelector(state=>state.userKey);
const [error, setError] = useState();
let [contactForm,setContactForm]=useState({});
let initialCustomerNumber = 112233;  
let initialAccountNumber = 10010;
let initialAmount = 1000;
let navigate = useNavigate();

let [searchOpenAIContents,setSearchOpenAIContents]=useState("");
let [openAiContents,setOpenAiContents]=useState("");
let [user,setUser]=useState({"full_name":"","emailid":"","password":"","address":"",
"password":"","account_type":"","bank":""});

const searchOpenAIInformation = async(event)=> {
    //alert("event generated")
    event.preventDefault();
    // alert(searchOpenAIContents);
  let airesult = await axios.get("http://localhost:5000/api/openai/info/"+searchOpenAIContents);
  console.log(airesult.data);
  setSearchOpenAIContents("");
  setOpenAiContents(airesult.data);
} 
let [login,setLogin]=useState({"emailid":"","password":"","typeofuser":""});
let [storeData,setStoreData]=useState(false);
let dispatch = useDispatch();
let {userList,customerList,loading} = useState(state=>state);

useEffect(()=>{
  console.log("In My First Page")
  console.log(loginState)
  AOS.init();
  AOS.refresh();
    if(storeData){
      //console.log(user);
      let storeCustomerInfo = async()=> {
        let storeResult =await dispatch(customerSignUp(user));
        console.log(storeResult);
        console.log(loading)
        setUser({"cname":"","emailid":"","gender":"","phonenumber":"","address":"",
        "password":"",accno:0,amount:0.0,typeofuser:"customer","cid":0});
        setStoreData(false);
        //alert("Customer Account Created successfully")
        toast.success("Customer account created successfully");
      }
      storeCustomerInfo(); 
    }

},[storeData,loading]);

let contactUs = (event)=> {
  event.preventDefault();
}
const errorHandler = () => {
  setError(null);
}
const signIn = async (event)=> {
  event.preventDefault();
  console.log(login);
  if(login.emailid.length==0){
    setError({
      title: 'An error occurred!',
      message: 'EmailId is required'
    })
    return 
  }else if(login.password.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Password is required'
    })
    return
  }
  // if(login.typeofuser=="admin"){
  //   let  adminLoginResult = await dispatch(loginSignIn(login));
  //       console.log(adminLoginResult.payload.message)
  //       if(adminLoginResult.payload.message=="Succesfully login!"){
  //           alert("successfully login by Admin")
  //           sessionStorage.setItem("user",login.emailid);
  //           navigate("adminHome");
  //         }else {
  //           alert("failure try once again");
  //         }

  // }else if(login.typeofuser=="customer"){
  // let customerLoginData = await dispatch(findAllCustomer());
  // let customerLoginResult = customerLoginData.payload.find(ll=>ll.emailid==login.emailid && ll.password==login.password);
 let customerLoginResult = await dispatch(loginSignIn(login));
 console.log(customerLoginResult.payload.msg)
 console.log(customerLoginResult.payload.account);
 //alert(customerLoginResult.payload.msg=="Successfully login!")
  if(customerLoginResult.payload.msg=="Successfully login!"){
      alert("successfully login by Customer")
      localStorage.setItem("user",JSON.stringify(customerLoginResult.payload.account));
      navigate("customerHome");
  }  else {
      alert("failure try once again");
  }

  setLogin({"emailid":"","password":""});
}

const signUp= async (event)=> {
  event.preventDefault();
  console.log(user);

  // let result = await dispatch(findAllCustomer());
  // if(result.payload.length==0){
  //   initialAccountNumber = initialAccountNumber+1;
  //   initialCustomerNumber=initialCustomerNumber+1;    
  // }else {
  //   let obj = result.payload[result.payload.length-1];
  //   console.log(obj);
  //   initialAccountNumber=eval(obj.accno)+1;
  //   initialCustomerNumber=eval(obj.cid)+1;
  // }

  if(user.full_name.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Name required'
    })
    return 
  }else if(user.emailid.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Emailid required'
    })
    return

  // }else if(user.phonenumber.length==0){
  //   setError({
  //     title: 'An error occurred!',
  //     message: 'Customer Phonenumber required'
  //   })
  //   return

  } else if(user.address.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Address required'
    })
    return

  }else if(user.password.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Password required'
    })
    return
  }
  setStoreData(true);  
}
    return(
        <div>
            <div id="overlayer"></div>
            <div className="loader">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> 


            <div className="site-wrap">

            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                </div>
                </div>
                <div className="site-mobile-menu-body"></div>
                </div>
     

        <header className="site-navbar js-sticky-header site-navbar-target" role="banner">

<div className="container">
  <div className="row align-items-center">
    
    <div className="col-6 col-xl-4">
      <h1 className="mb-0 site-logo">
        <a routerLink="index" className="h2 mb-0" style={{"textDecoration": "none"}}>
            Banker Online App<span className="text-primary"></span> </a></h1>
    </div>
    { error && <ErrorModal title={error.title} message={error.message} onClose={errorHandler} /> }  
    <div className="col-12 col-md-10 d-none d-xl-block">
      <nav className="site-navigation position-relative text-right" role="navigation">

        <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
          <li><a href="#login-section" className="nav-link">Login</a></li>
          <li className="has-children">
            <a href="#about-section" className="nav-link">About Us</a>
            <ul className="dropdown">
              <li><a href="#team-section" className="nav-link">Team</a></li>
              <li><a href="#loan-section" className="nav-link">Loan Section</a></li>
              <li><a href="#faq-section" className="nav-link">FAQ</a></li>
              <li><a href="#gallery-section" className="nav-link">Gallery</a></li>
              <li><a href="#services-section" className="nav-link">Services</a></li>
              <li><a href="#testimonials-section" className="nav-link">Testimonials</a></li>
             
            </ul>
          </li>
          <li><a href="#blog-section" className="nav-link">Blog</a></li>
          <li><a href="#contact-section" className="nav-link">Contact</a></li>
          <li><a href="#openai-section" className="nav-link"><img src='data:image/png;base64,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'
            width="50px" height="50px" style={{"borderRadius":"50px"}}/></a></li>
          <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-facebook"></span></a></li>
          <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-twitter"></span></a></li>
          <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-linkedin"></span></a></li>
        </ul>
      </nav>
    </div>


    <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" 
    style={{"position": "relative", "top": "3px"}}>
        <a href="#" className="site-menu-toggle js-menu-toggle float-right">
            <span className="icon-menu h3"></span></a></div>

  </div>
</div>

</header>



<div className="site-blocks-cover overlay" style={{"backgroundImage": "url(../images/hero_2.jpg)"}} 
data-aos="fade" id="home-section">

<div className="container">
  <div className="row align-items-center justify-content-center">

    
    <div className="col-md-10 mt-lg-5 text-center">
      <div className="single-text owl-carousel">
        <div className="slide">
          <h1 className="text-uppercase" data-aos="fade-up">Banking Solutions</h1>
          <p className="mb-5 desc"  data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit, magnam libero velit esse sapiente officia inventore!</p>
          <div data-aos="fade-up" data-aos-delay="100">
          </div>
        </div>

        <div className="slide">
          <h1 className="text-uppercase" data-aos="fade-up">Financing Solutions</h1>
          <p className="mb-5 desc"  data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit, magnam libero velit esse sapiente officia inventore!</p>
        </div>

        <div className="slide">
          <h1 className="text-uppercase" data-aos="fade-up">Savings Accounts</h1>
          <p className="mb-5 desc"  data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit, magnam libero velit esse sapiente officia inventore!</p>
        </div>

      </div>
    </div>
      
  </div>
</div>

<a href="#next" className="mouse smoothscroll">
  <span className="mouse-icon">
    <span className="mouse-wheel"></span>
  </span>
</a>
</div>  

<div className="site-section" id="next">

<div className="container">
  <div className="row mb-5">
    <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="">
      <img src={require('../images/flaticon-svg/svg/001-wallet.svg')} alt="Free Website Template by Free-Template.co" 
      className="img-fluid w-25 mb-4"/>
      <h3 className="card-title">Money Savings</h3>
      <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    </div>
    <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="100">
      <img src={require('../images/flaticon-svg/svg/004-cart.svg')} 
      alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
      <h3 className="card-title">Online Shoppings</h3>
      <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    </div>
    <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
      <img src={require('../images/flaticon-svg/svg/006-credit-card.svg')} 
      alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
      <h3 className="card-title">Credit / Debit Cards</h3>
      <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    </div>

  </div>

  <div className="row">
    <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
      <figure className="circle-bg">
      <img src={require('../images/about_2.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
      </figure>
    </div>
    <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
      <div className="mb-4">
        <h3 className="h3 mb-4 text-black">Amortization Computation</h3>
        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
        
      </div>
        
      <div className="mb-4">
        <ul className="list-unstyled ul-check success">
          <li>Officia quaerat eaque neque</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Consectetur adipisicing elit</li>
        </ul>
        
      </div>

      <div className="mb-4">
        <form action="#">
          <div className="form-group d-flex align-items-center">
            <input type="text" className="form-control mr-2" placeholder="Enter your email"/>
            <input type="submit" className="btn btn-primary" value="Submit Email"/>
          </div>
        </form>
      </div>

      
      
    </div>
  </div>
</div>
</div>


<div className="site-section cta-big-image" id="about-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">About Us</h2>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/hero_1.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <h3 className="text-black mb-4">We Solve Your Financial Problem</h3>

          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>

          <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
          
        </div>
      </div>    
      
    </div>  
  </div>



  <div className="site-section cta-big-image" id="login-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="2">Login Page</h2>
          </div>
      </div>

      <div className="row" >
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
            <figure className="circle-bg">
              <img src={require('../images/login.jpg')} alt="login page image" className="img-fluid"/>
            </figure>
        </div>

        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">            
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form style={{"marginTop": "0px"}} onSubmit={signIn}>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="emailid1" placeholder="name@example.com" 
                  name="emailid"
                  value={login.emailid}
                  onChange={(event)=> {
                    setLogin(login=> {
                          return {...login,"emailid":event.target.value};
                      }
                    )
                  }
                  }


                  />
                  
                  <label for="emailid">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="password" 
                  value={login.password}
                  placeholder="Password" name="password"
                                    onChange={(event)=> {
                                      setLogin(login=> {
                                            return {...login,"password":event.target.value};
                                        }
                                      )
                                    }
                                    }
                  />
                  <label for="password">Password</label>


                </div>
                
                {/* <div className="form-check mb-3">
                  <input className="form-check-input" type="radio" name="typeofuser" value="admin" 
                  id="admin" formControlName="typeofuser"
                  
                  onChange={(event)=> {
                    setLogin(login=> {
                        if(event.target.checked){
                          return {...login,"typeofuser":event.target.value};
                        }
                      }
                    )
                  }
                  }
                  />  
                  <label className="form-check-label" for="typeofuser">
                    Admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <input className="form-check-input" type="radio" name="typeofuser" value="customer" id="customer" formControlName="typeofuser"
                  onChange={(event)=> {
                    setLogin(login=> {
                        if(event.target.checked){
                          return {...login,"typeofuser":event.target.value};
                        }
                      }
                    )
                  }
                  }    
                  />
                  <label className="form-check-label" for="typeofuser ">
                    Customer
                  </label>
                </div>
                */}
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" 
                //   [disabled]="loginRef.invalid"
                  >Signin</button>
                </div>
                <hr className="my-4"/>
                <div className="d-grid mb-2">
                  <a href="#register-section" className="card-title text-center mb-5 fw-light fs-5">SignUp</a>
                </div>
              </form>
            </div>
      </div>
    </div>
       
  </div>


  <section className="site-section" id="openai-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center" data-aos="fade">
            <h2 className="section-title mb-3">Search Any Banking information from OpenAI</h2>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-2 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
            <div className="h-entry">
              <a href="single.html">
                <img src='https://lh3.googleusercontent.com/LRF7J93t2g2NoQg5pKJjasFf6u_9lvm3sXY9hWI1yaIdGyU331bxJUEnLE6S0EPZmJaFdf0hT1DkJWKvScojFYI9Odfs7a8QumwtgQ=h200-rw' style={{"borderRadius":"5px"}} alt="Image" className="img-fluid"
                width="400px"
                />
              </a>
            </div> 
          </div>
          <div className="col-md-3 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
            <form style={{"marginTop": "0px"}} onSubmit={searchOpenAIInformation}>
              <div className="form-floating mb-3">

              <textarea type="search" className="form-control" id="customerid" placeholder="Search by Customer Id" 
              name="searchOpenAIContents" onChange={(event)=>setSearchOpenAIContents(event.target.value)}
              value={searchOpenAIContents}>
              </textarea>
                <label for="floatingInput">Search Contents From OpenAI</label>
              </div>
              <input type="submit" className="btn btn-primary" value="Search Info"/>
            </form>
          </div>
          <div className="col-md-7 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100" style={{"border":"1px orange solid","borderRadius":"5px"}}>
             <p>{openAiContents}</p>
          </div>
        </div>
      </div>
    </section>




  <div className="site-section cta-big-image" id="register-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="10">Registration Page</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
            <img src={require('../images/register.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-3 mb-5" data-aos="fade-up" data-aos-delay="100">
          <form style={{"marginTop": "0px"}} onSubmit={signUp}>
            
            <div className="form-floating mb-1">
                  
              <input type="text" className="form-control" id="name" placeholder="name@example.com"
              value={user.full_name} 
              name="full_name" onChange={(event)=> {
                setUser(user=> {return {...user,"full_name":event.target.value}})
              }}/>

              <label for="name">Your Full Name</label>


            </div>
            <div className="form-floating mb-1">
              <input type="email" className="form-control" id="emailid" placeholder="name" 
              name="emailid"
              value={user.emailid}
              onChange={(event)=> {
                setUser(user=> {return {...user,"emailid":event.target.value}})
              }}
              />
              <label for="emailid">Your EmailId</label>
            </div>
             
            <div className="form-check mb-3">
              TypeOfAccount: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className="form-check-input" type="radio" name="account_type" value="saving" id="account_type"
              onChange={(event)=> {
                setUser(user=> {
                    if(event.target.checked){
                      return {...user,"account_type":event.target.value};
                    }
                  }
                )
              }
              }
              /> 
              <label className="form-check-label" for="male">
                Saving &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input className="form-check-input" type="radio" name="account_type" value="current" id="account_type" 
              
              onChange={(event)=> {
                setUser(user=> {
                    if(event.target.checked){
                      return {...user,"account_type":event.target.value};
                    }
                  }
                )
              }
              }
              />
              <label className="form-check-label" for="female">
                Current
              </label>
            </div>

       
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="address" placeholder="address" 
              name="address"
              value={user.address}
              onChange={(event)=> {
                setUser(user=> {return {...user,"address":event.target.value}})
              }}
              />
              <label for="address">Your Address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="Password" 
              name="password"
              value={user.password}
              onChange={(event)=> {
                setUser(user=> {return {...user,"password":event.target.value}})
              }}
              />
              <label for="password">Your Password</label>
            </div>

          

            <div className="form-floating mb-5">
              <select name='bank'  onChange={(event)=> {
                setUser(user=> {return {...user,"bank":event.target.value}})
              }} className="form-control">
                  <option value="1">SBI</option>
                  <option value="2">HDFC</option>
              </select>
              <label for="password">Bank Name</label>
            </div> 

            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">SignUp</button>
            </div>
            <hr className="my-4"/>
            <div className="d-grid mb-2">
              <a href="#login-section" className="card-title text-center mb-5 fw-light fs-5">SignIn</a>
            </div>

          </form>
        </div>

        </div>
        
      </div>    
      </div>



<section className="site-section border-bottom" id="team-section">

    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Meet Team</h2>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
        </div>
      </div>
      <div className="row">
        

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_5.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Kaiara Spencer</h3>
              <span className="position">Finance Manager</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_6.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Dave Simpson</h3>
              <span className="position">Marketing Manager</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_7.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Ben Thompson</h3>
              <span className="position">Accountant</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_8.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Kyla Stewart</h3>
              <span className="position">Accountant</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_1.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Kaiara Spencer</h3>
              <span className="position">Accountant</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_2.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Dave Simpson</h3>
              <span className="position">Bank Teller</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_3.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Ben Thompson</h3>
              <span className="position">Bank Teller</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_4.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Chris Stewart</h3>
              <span className="position">Bank Teller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  



  <section className="site-section" id="gallery-section" data-aos="fade">
    

    <div className="container">

      <div className="row mb-3">
        <div className="col-12 text-center">
          <h2 className="section-title mb-3">Gallery</h2>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div id="filters" className="filters text-center button-group col-md-7">
          <button className="btn btn-primary active" data-filter="*">All</button>
          <button className="btn btn-primary" data-filter=".web">Events</button>
          <button className="btn btn-primary" data-filter=".design">Party</button>
          <button className="btn btn-primary" data-filter=".brand">Holidays</button>
        </div>
      </div>  
      
      <div id="posts" className="row no-gutter">
        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_1.jpg')} className="item-wrap fancybox">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_1.jpg')}/>
          </a>
        </div>
        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_2.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_2.jpg')}/>
          </a>
        </div>

        <div className="item brand col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_3.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_3.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">

          <a href={require('../images/img_4.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_4.jpg')}/>
          </a>

        </div>

        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_5.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_5.jpg')}/>
          </a>
        </div>

        <div className="item brand col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_1.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_1.jpg')}/>
          </a>
        </div>

        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_2.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_2.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_3.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_3.jpg')}/>
          </a>
        </div>

        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_4.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_4.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_5.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_5.jpg')}/>
          </a>
        </div>

        <div className="item brand col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_1.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_1.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_2.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_2.jpg')}/>
          </a>
        </div>

        
      </div>
    </div>

  </section>




  <section className="site-section">

    <div className="container">

      <div className="row mb-5 justify-content-center">
        <div className="col-md-7 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">How It Works</h2>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
        </div>
      </div>
      
      <div className="row align-items-lg-center" >
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">

          <div className="owl-carousel slide-one-item-alt">
            <img src={require('../images/slide_1.jpg')} alt="Image" className="img-fluid"/>
            <img src={require('../images/slide_2.jpg')} alt="Image" className="img-fluid"/>
            <img src={require('../images/slide_3.jpg')} alt="Image" className="img-fluid"/>
          </div>
          <div className="custom-direction">
            <a href="#" className="custom-prev"><span><span className="icon-keyboard_backspace"></span></span></a><a href="#" className="custom-next"><span><span className="icon-keyboard_backspace"></span></span></a>
          </div>

        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <div className="owl-carousel slide-one-item-alt-text">
            <div>
              <h2 className="section-title mb-3">01. Online Applications</h2>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>

              <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
            </div>
            <div>
              <h2 className="section-title mb-3">02. Get an approval</h2>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
              <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
            </div>
            <div>
              <h2 className="section-title mb-3">03. Card delivery</h2>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>

              <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </section>





  <section className="site-section border-bottom bg-light" id="services-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center" data-aos="fade">
          <h2 className="section-title mb-3">Our Services</h2>
        </div>
      </div>
      <div className="row align-items-stretch">
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/001-wallet.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Business Consulting</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/006-credit-card.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Credit Card</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/002-rich.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Income Monitoring</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>


        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/003-notes.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Insurance Consulting</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/004-cart.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Financial Investment</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/005-megaphone.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Financial Management</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>


  <section className="site-section testimonial-wrap" id="testimonials-section" data-aos="fade">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2 className="section-title mb-3">Happy Customers</h2>
        </div>
      </div>
    </div>
    <div className="slide-one-item home-slider owl-carousel">
        <div>
          <div className="testimonial">
            
            <blockquote className="mb-5">
              <p>&ldquo;I am really impressed by the Staff’s cordial attitude & behaviour with customers. &rdquo; </p>
            </blockquote>

            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_3.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>John Smith</p>
            </figure>
          </div>
        </div>
        <div>
          <div className="testimonial">

            <blockquote className="mb-5">
              <p>&ldquo;I would like to appreciate the entire team for the kind of services provided to me. &rdquo;</p>
            </blockquote>
            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_2.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>Christine Aguilar</p>
            </figure>
            
          </div>
        </div>

        <div>
          <div className="testimonial">

            <blockquote className="mb-5">
              <p>&ldquo;We would really appreciate that your services are very good and your staff are really cooperative while dealing with the customers. &rdquo;</p>
            </blockquote>
            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_4.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>Robert Spears</p>
            </figure>

            
          </div>
        </div>

        <div>
          <div className="testimonial">

            <blockquote className="mb-5">
              <p>&ldquo;The Branch Staff are taking special care of each customer especially senior citizens and women.&rdquo;</p>
            </blockquote>
            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_4.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>Bruce Rogers</p>
            </figure>

          </div>
        </div>

      </div>
  </section>



  <section className="site-section bg-light" id="loan-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center" data-aos="fade-up">
          <h2 className="section-title mb-3">Pricing</h2>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-6 mb-4 mb-lg-0 col-lg-4" data-aos="fade-up" data-aos-delay="">
          <div className="pricing">
            <h3 className="text-center text-black">Education Loan</h3>

            <ul className="list-unstyled ul-check success mb-5">
              
              <li>Student loans are meant to pay for tuition, 
              fees and living expenses at accredited schools.</li>
              <li>This means that you generally can’t use student
              loans to pay for specific types of education,
              such as coding bootcamps or informal classNamees.</li>
              <li>
                There are two types of student loans: federal and private. 
                You get federal student loans by filling out the Free Application for Federal Student Aid (FAFSA) and 
                working with your school’s financial aid department.
                Private student loans come with much fewer protections and benefits, 
                but if your credit is good, you could qualify for better rates.
              </li>
            </ul>
            <p className="text-center">
              <a href="#" className="btn btn-secondary">Apply Now</a>
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4 mb-lg-0 col-lg-4 pricing-popular" data-aos="fade-up" data-aos-delay="100">
          <div className="pricing">
            <h3 className="text-center text-black">Personal Loans</h3>
            <ul className="list-unstyled ul-check success mb-5">

              <li>Personal loans are the broadest type of loan category and typically have 
                repayment terms between 24 and 84 months. They can be used for just about 
                anything except for a college education or illegal activities. 
                People commonly use personal loans for things like:</li>              
               
                <li>
                    Vacations
                  Weddings
                  Emergencies
                  Medical treatment
                  Home renovations 
               </li>
               <li>
                Personal loans generally come in two forms: secured and unsecured. 
                Secured loans are backed by collateral—such as a savings account or a 
                vehicle—that a lender can take back if you don’t repay your full loan amount.
                </li>
                
              </ul>
            <p className="text-center">
              <a href="#" className="btn btn-primary">Apply Now</a>
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4 mb-lg-0 col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="pricing">
            <h3 className="text-center text-black">Car Loan</h3>

            <ul className="list-unstyled ul-check success mb-5">
              
        <li>
          Car loans are a type of secured loan that you can use to buy a 
          vehicle with repayment terms between three to seven years. In this case, the collateral for the loan is the vehicle itself. If you don’t pay, the lender will repossess the car.
        </li>
        <li>
          You can typically get car loans from credit unions, banks, online lenders and even car dealerships. Some car dealerships have a financing 
          department where they help you find the best loan from partner lenders. 
        </li>     
        <li>
          Others operate as “buy-here-pay-here” lenders, where the dealership itself gives you the loan. These tend to be much more expensive, though.
        </li>        
       </ul>
            <p className="text-center">
              <a href="#" className="btn btn-secondary">Apply Now</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="row site-section" id="faq-section">
        <div className="col-12 text-center" data-aos="fade">
          <h2 className="section-title">Frequently Ask Questions</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-black h4 mb-4">When do I have access to use Online Banking?</h3>
          <p> : With Online Banking, you have access to your account information 24 hours a day, 7 days a week! 
            However, we may occasionally perform maintenance which may cause the Online Banking to be 
            temporarily unavailable.</p>
          </div>
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4">Are there any requirements to keep my Online Banking account?</h3>
            <p>The system requires that you use your Online Banking at least once every six months, or access will be 
              canceled for your protection. Additionally, we reserve the right to cancel your online banking account 
              access if we suspect your account has been compromised or misused</p>
          </div>

          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-black h4 mb-4">Can I accept both Paypal and Stripe?</h3>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
          </div>
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4">What happens if I forget or lose my password?</h3>
            <p>When logging in click the box “forgot password.” The system will ask you to choose a pre-arranged 
              method of delivery to you of a temporary secure access code. This code will allow you entry to the system 
              and you will be prompted to create a new password</p>
          </div>
        </div>
        <div className="col-lg-6"> 
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4"> Are there any requirements to keep my Online Banking account?</h3>
            <p>The system requires that you use your Online Banking at least once every six months, or access will be 
              canceled for your protection. Additionally, we reserve the right to cancel your online banking account 
              access if we suspect your account has been compromised or misused.</p>
          </div>

          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-black h4 mb-4">: Is there a limit on the number of bills I can pay with Online Bill Pay?</h3>
          <p>No. There is no limit to the number of bills that can be paid with Bill Pay.</p>
          </div>
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4">What if I have a question about a Bill Payment?</h3>
            <p>: If you have a question about a payment you made or believe an error has occurred, please 
              contact us at 513-734-4445</p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section className="site-section" id="about-section">
    <div className="container">

      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/hero_1.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          

          <div className="row">

            
            
            <div className="col-12 mb-4" data-aos="fade-up" data-aos-delay="">
              <div className="unit-4 d-flex">
                <div className="unit-4-icon mr-4 mb-3"><span className="text-primary flaticon-head"></span></div>
                <div>
                  <h3>Bank Loan</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                  <p className="mb-0"><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>
            <div className="col-12 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="unit-4 d-flex">
                <div className="unit-4-icon mr-4 mb-3"><span className="text-primary flaticon-smartphone"></span></div>
                <div>
                  <h3>Banking Consulation </h3>
                  <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p className="mb-0"><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>
          </div>


          
        </div>
      </div>

      
    </div>
  </section>



  <section className="site-section" id="blog-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center" data-aos="fade">
          <h2 className="section-title mb-3">Our Blog</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
          <div className="h-entry">
            <a href="single.html">
              <img src={require('../images/img_1.jpg')} alt="Image" className="img-fluid"/>
            </a>
            <h2 className="font-size-regular"><a href="#">Super Apps: A New Chapter in the World of Digital Banking</a></h2>
            <div className="meta mb-4">Ham Brook <span className="mx-2">&bullet;</span> March 17, 2022<span className="mx-2">&bullet;</span> <a href="#">News</a></div>
            <p>What are super apps? Super apps, as the name suggests, are super in nature. What makes them different and ‘super’</p>
            <p><a href="#">Continue Reading...</a></p>
          </div> 
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="h-entry">
            <a href="single.html">
              <img src={require('../images/img_4.jpg')} alt="Image" className="img-fluid"/>
            </a>
            <h2 className="font-size-regular"><a href="#">The Changing Face of Corporate Payments</a></h2>
            <div className="meta mb-4">James Phelps <span className="mx-2">&bullet;</span> October 14, 2021<span className="mx-2">&bullet;</span> <a href="#">News</a></div>
            <p>Mobile banking channels have witnessed an unprecedented usage surge in the recent times that has led digital leaders to explore innovative ways to improve and increase the quality of customer engagement.</p>
            <p><a href="#">Continue Reading...</a></p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="h-entry">
            <a href="single.html">
              <img src={require('../images/img_3.jpg')} alt="Image" className="img-fluid"/>
            </a>
            <h2 className="font-size-regular"><a href="#">The ABCDE for Successful Agile Implementations – Powering Smart Banks</a></h2>
            <div className="meta mb-4">James Phelps <span className="mx-2">&bullet;</span>March 30, 2021<span className="mx-2">&bullet;</span> <a href="#">News</a></div>
            <p>The term “agility” has been a buzzword in the software industry for some time now and over the years, I’ve had the opportunity to read a lot of interesting insights shared by several thought leaders on the topic.</p>
            <p><a href="#">Continue Reading...</a></p>
          </div> 
        </div>
        
      </div>
    </div>
  </section>



  <section className="site-section bg-light" id="contact-section" data-aos="fade">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-4 text-center">
          <p className="mb-4">
            <span className="icon-room d-block h2 text-primary"></span>
            <span>Address: NALANDA 53/1 C, Manoj Arcade, 24th Main Rd, Sector 2, HSR Layout, Bengaluru - 560102, Karnataka, India</span>
          </p>
        </div>
        <div className="col-md-4 text-center">
          <p className="mb-4">
            <span className="icon-phone d-block h2 text-primary"></span>
            <a href="#">+1 232 3235 324</a>
          </p>
        </div>
        <div className="col-md-4 text-center">
          <p className="mb-0">
            <span className="icon-mail_outline d-block h2 text-primary"></span>
            <a href="#">youremail@domain.com</a>
          </p>
        </div>
      
      <div className="row">
        <div className="col-md-12 mb-5">
          <form action="#" className="p-5 bg-white" onSubmit={contactUs}>              
            <p className="h6 text-black mb-1">Contact Form</p> 
            <div className="row form-group">
              <div className="col-md-3">
                <label className="text-black" for="fname">First Name</label>
                <input type="text" id="fname" className="form-control" name="fname" 
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"fname":event.target.value}
                    })
                }}
                />
              </div>
              <div className="col-md-3">
                <label className="text-black" for="lname">Last Name</label>
                <input type="text" id="lname" className="form-control" name="lname"
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"lname":event.target.value}
                    })
                }}
                />
              </div>
              <div className="col-md-3">
                <label className="text-black" for="email">Email</label> 
                <input type="email" id="email" className="form-control"
                name="email"
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"email":event.target.value}
                    })
                }}
                />
              </div>
              
              <div className="col-md-3">
                <label className="text-black" for="subject">Subject</label> 
                <input type="subject" id="subject" className="form-control"
                name="subject"

                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"subject":event.target.value}
                    })
                }}

                />
              </div>     
            </div>

            <div className="row form-group">
              <div className="col-md-8 offset-2">
                <label className="text-black" for="message">Message</label> 
                <textarea name="message" id="message" cols="20" rows="5" className="form-control" 
                placeholder="Write your notes or questions here..."
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"message":event.target.value}
                    })
                }}
                ></textarea>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <input type="submit" value="Send Message" className="btn btn-primary btn-md text-white"/>
              </div>
            </div>


          </form>
        </div>
      </div>  
      </div>
    </div>
  </section>


  <footer className="site-footer">
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-5">
              <h2 className="footer-heading mb-4">About Us...</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facere laudantium magnam voluptatum autem. Amet aliquid nesciunt veritatis aliquam.</p>
            </div>
            <div className="col-md-3 ml-auto">
              <h2 className="footer-heading mb-4">Quick Links</h2>
              <ul className="list-unstyled">
                <li><a href="#about-section" className="smoothscroll">Terms</a></li>
                <li><a href="#about-section" className="smoothscroll">Policy</a></li>
                <li><a href="#about-section" className="smoothscroll">About Us</a></li>
                <li><a href="#services-section" className="smoothscroll">Services</a></li>
                <li><a href="#testimonials-section" className="smoothscroll">Testimonials</a></li>
                <li><a href="#contact-section" className="smoothscroll">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-3 footer-social">
              <h2 className="footer-heading mb-4">Follow Us</h2>
              <a href="#" className="pl-0 pr-3"><span className="icon-facebook"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-twitter"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-instagram"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-linkedin"></span></a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h2 className="footer-heading mb-4">Subscribe Newsletter</h2>
          <form action="#" method="post" className="footer-subscribe">
            <div className="input-group mb-3">
              <input type="text" className="form-control border-secondary text-white bg-transparent" 
              placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-primary text-black" type="button" id="button-addon2">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row pt-5 mt-5 text-center">
        <div className="col-md-12">
          <div className="border-top pt-5">
            <p className="copyright"><small>
          Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
            </small>    
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </footer>

        </div>
        <ToastContainer />
  </div>
    )
}

export default IndexPage;