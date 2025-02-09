import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div>
      <div>
        <p>404 Route</p>
        <p>Not Found</p>
        <p>The requested URL was not found on this server.</p>
        <Link to="/">to main page</Link>
      </div>
    </div>
  );
}
