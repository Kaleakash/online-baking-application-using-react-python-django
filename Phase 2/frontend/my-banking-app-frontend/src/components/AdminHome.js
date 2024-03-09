import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllCustomer } from "../slice/customerSlice";
import { findTransaction } from "../slice/transactionSlice";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';

function AdminPage() {
let [customers,setCustomers]=useState([{}]);
let [transactions,setTransactions]=useState([{}]);
let [customer,setCustomer]=useState({});
let dispatch = useDispatch();
let {customerList,transactionList} = useSelector(state=>state);
let [cid,setCid]=useState(0);
let [accno,setAccno]=useState(0);
let [searchCustomerResult,setSearchCustomerResult]=useState(false);
let [phonenumber,setPhNumber]=useState(0);
let [customerRecordNotFound,setCustomerRecordNotFound]=useState("");
let navigate = useNavigate();

const logout = (event)=> {
  navigate("/");
}

const searchCustomerInfo= (event)=> {
  event.preventDefault();
  setAccno(0);
  setCid(0);
  setPhNumber(0);
  let customerResult = customers.find(c=>c.cid==cid || c.accno==accno || c.phonenumber==phonenumber);
  if(customerResult!=undefined){
      setCustomer(customerResult);
      setSearchCustomerResult(true);
  }else {
    setCustomerRecordNotFound("Customer record not present");
      setSearchCustomerResult(false);
  }
}
useEffect(()=> {
  AOS.init();
  AOS.refresh();
  const loadAllCustomerInfo= async()=> {
        let customerInfo = await dispatch(findAllCustomer());
        //console.log(customerInfo.payload)
        let transactionInfo = await dispatch(findTransaction());
        setCustomers(customerInfo.payload);
        setTransactions(transactionInfo.payload);
        //console.log(transactionInfo.payload);
    }
    loadAllCustomerInfo();

},[])
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
        <h1 align="center">Welcome to Admin Home Page<span className="text-primary"></span></h1>
      
      <div className="container">
      
        <div className="row align-items-center">
         
          <div className="col-12 col-md-10 d-none d-xl-block">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li><a href="#customer-section" className="nav-link">Customer Details</a></li>
                <li><a href="#loan-section" className="nav-link">Loan Section</a></li>
                <li><a href="#search-section" className="nav-link">Search</a></li>
                <li><a href="#view-transaction" className="nav-link">View Transaction</a></li>
                <li><a href="#" className="nav-link" onClick={logout}>Logout</a></li>
              </ul>
            </nav>
          </div>
  
  
          <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{"position": "relative", "top": "3px"}}>
            <a href="#" className="site-menu-toggle js-menu-toggle float-right">
                <span className="icon-menu h3"></span></a></div>
  
        </div>
      </div>
      
    </header>

    <div className="site-blocks-cover overlay" 
    style={{"backgroundImage": "url(../images/hero_2.jpg)"}} data-aos="fade" id="home-section">
  
    </div>  
</div>


<section className="site-section" id="customer-section">
      <div className="site-section cta-big-image" >
        <div className="container" >
          
          <div className="row mb-5 justify-content-center">
            
              <div className="col-md-8 text-center">
                <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Customer Details</h2>
              </div>
  
          </div>
  
          <div className="row" >
  
            <div className="col-lg-12 mb-5" data-aos="fade-up" data-aos-delay="100">
                
               
              <table className="table table-striped">
                  <tr>
                    <th>CustomerId</th>
                    <th>Customer Name</th>
                    <th>Gender</th>
                    <th>PhNumber</th>
                    <th>Address</th>
                    <th>AccoutNumber</th>
                    <th>Balance Amount</th>
                  </tr>
                  {
                    customers.map(cc=> 
                    <tr>
                      <td>{cc.cid}</td>
                      <td>{cc.cname}</td>
                      <td>{cc.gender}</td>
                      <td>{cc.phonenumber}</td>
                      <td>{cc.address}</td>
                      <td>{cc.accno}</td>
                      <td>{cc.amount}</td>  
                    </tr>    
                    )
                  }
              </table>  
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="site-section" id="loan-section">
  
      <div className="site-section cta-big-image" id="loan-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="10">Loan Details</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 mb-5" data-aos="fade-up" data-aos-delay="">
              <figure className="circle-bg">
                <img src={require('../images/loan.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
              </figure>
            </div>
            <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">
              <div>
                A Loan Estimate tells you important details about a mortgage loan you have requested. Use this tool to review your Loan Estimate to make sure it reflects what you discussed with the lender. If something looks different from what you expected, ask why. Request multiple Loan Estimates from different lenders so you can compare and choose the loan that's right for you
              </div>
            </div>
  
            </div>
            
          </div>    
          </div>
  
    </section>


    <section className="site-section" id="search-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center" data-aos="fade">
            <h2 className="section-title mb-3">Search Section</h2>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-4 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
            <div className="h-entry">
              <a href="single.html">
                <img src={require('../images/search.jpg')} alt="Image" className="img-fluid"/>
              </a>
            </div> 
          </div>
          <div className="col-md-4 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
            <form style={{"marginTop": "0px"}} onSubmit={searchCustomerInfo}>
              <div className="form-floating mb-3">

              <input type="search" className="form-control" id="customerid" placeholder="Search by Customer Id" 
              name="customerid" onChange={(event)=>setCid(event.target.value)}
              value={cid}/>
                <label for="floatingInput">Customer Id</label>
              </div>
              <span>OR</span>
              <div className="form-floating mb-3">
                <input type="search" className="form-control" id="accountnumber" placeholder="Search by Account Number" 
                name="accnumber" onChange={(event)=>setAccno(event.target.value)}
                value={accno}/>
                <label for="floatingInput">Account Number</label>
              </div>
              <span>OR</span>
              <div className="form-floating mb-3">
                <input type="search" className="form-control" id="phonenumber" placeholder="Search by Phone Number" 
                name="phnumber" onChange={(event)=>setPhNumber(event.target.value)}
                value={phonenumber}/>
                <label for="floatingInput">Phone Number</label>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Search</button>
              </div>
            </form>
          </div>
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
              {searchCustomerResult?
              <div>
                  <h2>Customer Record</h2>
                  <p style={{"color":"orange"}}>
                    Customer Id : {customer.cid}<br/>
                    Customer Name : {customer.cname}<br/>
                    EmailId :{customer.emailid}<br/>
                    Accno : {customer.accno}<br/>
                    Amount : {customer.amount}<br/>
                    Gender : {customer.gender}<br/>
                    Phone Number : {customer.phonenumber}<br/>
                    Address : {customer.address}<br/>
                  </p>
              </div>:
              <div style={{"color":"orange"}}>{customerRecordNotFound}</div>}
          </div>
        </div>
      </div>
    </section>


    <section className="site-section border-bottom">
      <div className="site-section cta-big-image" id="view-transaction">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">View Transaction Details</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 mb-5" data-aos="fade-up" data-aos-delay="">
              <figure className="circle-bg">
              <img src={require('../images/transactiondetails.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
              </figure>
            </div>
            <div className="col-lg-10 ml-auto" data-aos="fade-up" data-aos-delay="100">
              
              <table className="table table-striped">
                <table className="table table-striped">
                  <tr>
                    <th>SrNo</th>
                    <th>From Account</th>
                    <th>TypeOfTransaction</th>
                    <th>Amount</th>
                    <th>Date Of Transaction</th>
                    <th>To Account</th>
                  </tr>
                  {
                    transactions.map((tran,i)=> 
                    <tr>
                        <td>{i+1}</td>
                      <td>{tran.accno}</td>
                      <td>{tran.typeoftransaction}</td>
                      <td>{tran.amount}</td>
                      <td>{tran.dot}</td>
                      <td>{tran.transferTo==0?<span>No Transfer</span>:<span>{tran.transferTo}</span>}</td>
                    </tr>
                    )
                  }
              </table>   
       
                
  
            </table>   
            </div>
          </div>        
        </div>  
      </div>
    </section>
    <ToastContainer />
</div>
    )
}

export default AdminPage;