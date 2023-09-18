import Link from "next/link";

const NavBar = ({ active }) => {
  return (
    <nav className="bg-yellow-400 p-6 flex justify-between items-center">
      <ul className="flex gap-12 items-end text-black-400 text-sm">
        <li>
          <a href="/">
            <h1 className="text-3xl font-bold text-black-100">WatchList</h1>
          </a>
        </li>
          <li>
            <Link href="/" className={active == "home" && "text-slate-500   "}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/favoritos"
              className={active == "favoritos" && "text-slate-300"}
            >
              Favoritos
            </Link>
          </li>
      </ul>
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <img src="https://i.pravatar.cc/100" alt="avatar do usuário" />
      </div>
    </nav>
  );
};

export default NavBar;
