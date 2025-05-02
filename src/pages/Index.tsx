
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the Chat page, which is our main component
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-retro-lightgray">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
