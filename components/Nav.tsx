import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <ul role="menubar">
        <li role="none">
          <Link href="/"><a role="menuitem">Home</a></Link>
        </li>
        <li role="none">
          <Link href="/settings"><a role="menuitem">Settings</a></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;