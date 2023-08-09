import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Items from './components/Items/Items';
import About from './components/About/About';
import Authentication from './components/Authentication/Authentication';
import Product from './components/Product/Product';
import { useDispatch } from 'react-redux';
import SetCurrentUser from './state/actionCreaters/UserAuthData';
import { getAuth } from 'firebase/auth';
import UserComponent from './components/User/UserComponent';
import AddProduct from './components/AddProduct/AddProduct';
import Footer from './components/Footer/Footer';
import MessageBar from './components/MessageBar/MessageBar';
import Chat from './components/Chat/Chat';
import ChatDashBoard from './components/Chat/ChatsDashBoard'

function App() {
  const dispatch=useDispatch()

    
    getAuth().onAuthStateChanged((u)=>{
      if(u){
        dispatch(SetCurrentUser(u))
      }
    })
    
  return (
    <div style={{overflowX:'hidden'}}>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path='/items' element={<Items />}>
          </Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/auth' element={<Authentication/>}></Route>
          <Route path='/addAProduct' element={<AddProduct/>}></Route>
          <Route path='/item/:id/:name' element={<Product/>}></Route>
          <Route path='/user/:name' element = {<UserComponent />} />
          <Route path='/chat/:id' element={<Chat />}/>
          <Route path='/chats' element={<ChatDashBoard />}/>
          <Route path='/' element={<Home />}>
          </Route>
        </Routes>
        <Footer />
        <MessageBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
