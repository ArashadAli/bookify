import { Outlet } from 'react-router-dom';
import HomeNavbar from './HomeNavbar.jsx';
import { useBooks } from '../../hooks/useBooks.js';

const HomeLayout = () => {
  const books = useBooks();

  return (
    <>
      <HomeNavbar
        searchQuery={books.searchQuery}
        setSearchQuery={books.setSearchQuery}
        category={books.category}
        setCategory={books.setCategory}
      />
      {/* pt-[104px] accounts for 64px top bar + 40px category bar */}
      <main
        className="min-h-screen"
        style={{ background: 'var(--bg-base)', paddingTop: '104px' }}
      >
        <Outlet context={books} />
      </main>
    </>
  );
};

export default HomeLayout;