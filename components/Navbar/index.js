import Link from "next/link";
import { colors } from "../../styles/theme";
import Create from "../Icons/Create";
import Home from "../Icons/Home";
import Search from "../Icons/Search";

export default function Navbar () {
    return(
    <>
        <nav>
          <div className="nav-icon">
            <Link href="/compose/tweet">
                <Create width={32} height={32} stroke="#09f"/>
            </Link>
          </div>
          <div className="nav-icon">
            <Link href="/home" className=".nav-icon-a">
                <Home width={32} height={32} stroke="#09f"/>
            </Link>

          </div>
          <div className="nav-icon">
            <Link href="/search">
                <Search width={32} height={32} stroke="#09f"/>
            </Link>

          </div>


        </nav>


        <style jsx>{`
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        .nav-icon{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: 36px;
        }
        .nav-icon-a{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-icon:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        .nav-icon:hover > :global(svg) {
          stroke: ${colors.primary};
        }
        `}</style>
    </>
)}