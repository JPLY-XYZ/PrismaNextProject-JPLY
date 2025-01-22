import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    
    <div>
      <Link className="block" href="/grupos">GRUPOS</Link>
      <Link className="block" href="/estudiantes">ESTUDIANTES</Link>
      <Link className="block" href="/asignaturas">ASIGNATURAS</Link>
      </div>
  );
}
