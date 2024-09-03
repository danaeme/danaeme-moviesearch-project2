import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main>
      <h1>Welcome to David's movie review app!</h1>
      <h3>
        Here you can show off your favorite movies and share your thoughts with the world!
      </h3>
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/signup">
          <button style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Sign Up
          </button>
        </Link>
        <Link to="/signin">
          <button style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Sign In
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Landing;