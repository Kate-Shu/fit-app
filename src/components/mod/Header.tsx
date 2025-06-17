import Link from "next/link";

const Header = () => {
 return (
  <header className="flex-shrink-0 sticky top-0 z-10 text-text-light">
   <div className="px-9 py-4 flex justify-between items-center font-serif uppercase">
    <div className="flex items-center gap-4">
     <Link href={"#"}>Home</Link>
     <Link href={"#"}>About us</Link>
     <Link href={"#"}>Programs</Link>
     <Link href={"#"}>Features</Link>
    </div>
    <Link href={"#"}>Login</Link>
   </div>
  </header>
 )
}
export default Header;