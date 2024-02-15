import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
    // esto hace como una validacion a ver si existe cuenta. 
  const { data: session } = useSession();
  const router = useRouter()

  async function logOut() {
    // importamos el singOut de next/auth viene todo hecho. Sale de google
    await signOut();
    router.push('/');

}

  return (
    <div >
      <div className="flex items-center gap-2 m-3 text-white text-sm">
        <div>
          Hola <span className="font-bold">{session?.user?.name}</span>
        </div>
        <button
          onClick={logOut}
          className="bg-red-500 rounded-lg text-white font-bold px-2 py-2"
        >
          <FontAwesomeIcon icon={faSignOut}/>
        </button>
      </div>
    </div>
  );
}