import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main>
      <h1>Hello, you are on the landing page for visitors.</h1>
      <h3>
        If you sign up for a new account, you will have the ability to sign in
        and see your super secret dashboard.
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