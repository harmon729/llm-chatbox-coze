import Link from "next/link";
export default function Navbar({ onSearchClick, currentTheme = "light", onThemeToggle, }) {
    return (<div className="fixed top-0 left-0 right-0 z-50 navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown ml-3">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle border-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow">
            <li>
              <Link href="/">主页</Link>
            </li>
            <li>
              <Link href="/inline_box">内联模式</Link>
            </li>
            <li>
              <Link href="/standalone_box">独立模式</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl border-0">
          LLM聊天框组件
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle border-0 mr-2" onClick={onThemeToggle} aria-label={currentTheme === "light" ? "切换到暗色模式" : "切换到亮色模式"}>
          {currentTheme === "light" ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>)}
        </button>
        <button className="btn btn-ghost btn-circle border-0 mr-3" onClick={onSearchClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>
    </div>);
}
//# sourceMappingURL=navbar.jsx.map