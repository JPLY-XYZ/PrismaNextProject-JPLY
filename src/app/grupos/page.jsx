import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();


async function PaginaGrupos() {
    const grupos = await prisma.grupo.findMany()
  
    console.log(grupos)

  return (
    <div>
      <Link href="/"><b>HOME</b></Link>
      {grupos.map((grupo) => (
        <div className="flex gap-2" key={grupo.id}>
          <p><b>Nombre: </b>{grupo.nombre}</p>
          <p><b>Tutor: </b>{grupo.tutor}</p>
          <p><b>Aula: </b>{grupo.aula}</p>
          <p><Link href={`/grupos/${grupo.id}`}>VER</Link></p>
        </div>
      ))}
    </div>
  );
}

export default PaginaGrupos;
