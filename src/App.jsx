
import SignInForm from './components/Login/SignInForm';

import CampaignDetails from "./components/CampaignDetailsUniver/CampaignDetails";

import PrivateOutlet from './components/Shared/PrivateOutlet';
import NotFound from './components/UI/NotFound';
import Choserole from './components/ChoseRole/ChoseRole';

import ListProject from './components/ListProject/ListProject';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ListCampaign from './components/ListCampain/ListCampaign';
import SearchSchool from './components/ListSchool/SearchSchool';
import CompaignDetail from './components/CompaignDetail/CompainDetail';
import CreateCampaigns from './components/Campaign/CreateCampaigns';
import StudentList from './components/StudentList/StudentList';

import ListProjectSV from './components/ListProject/ListProjectSV';
import ManageSchools from './components/ListSchool/ManagementSchool';
import SignUp from './components/Login/SignUp';



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateOutlet />}>
        </Route>
        <Route path='/login' element={<SignInForm />} />
        <Route path='/list-campaign' element={<ListCampaign />} />
        <Route path='/campaignDetail/:id' element={<CompaignDetail />} />
        <Route path='/createCampaigns' element={<CreateCampaigns />} />
        <Route path='/listProjectAdmin' element={<ListProject />} />
        <Route path='/manageSchools' element={<ManageSchools />} />
        <Route path='/choseRole' element={<Choserole />} />
        <Route path='/' element={<Choserole />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path='/detail/studentList/:id' element={<StudentList />} />
        <Route path='/school' element={<SearchSchool />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/listProjectSV/:id' element={<ListProjectSV />} />
        <Route path='/manageSchools' element={<ManageSchools />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router >
  );
}
export default App;
