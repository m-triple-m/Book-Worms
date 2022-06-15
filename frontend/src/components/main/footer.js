import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
    Button,
 
  } from "@mui/material";

  import { useNavigate } from "react-router-dom";

  const Footer=()=>{
      
    const navigate=useNavigate();
    return (

        <div className="pos mt-5">
<footer className="text-center text-white " style={{ backgroundColor: '#0a4275' }}>
    <div className='text-center p-3' style={{ backgroundColor: 'rgba(255, 255, 255,0.1)' }}>
        © 2020 Copyright:
        
        <div className="footer">
          
          <Button variant="outlined" style = {{color:'black',backgroundColor:'orangered'}} onClick={e => navigate('/user/addQuery/')  }>
          Ask Query
          <QuestionMarkIcon />
            
          </Button>
        </div>
      </div>

    </footer>
    </div>


    );
};
export default Footer;