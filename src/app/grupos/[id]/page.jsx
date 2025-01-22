import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient()

async function PaginaGrupo({ params }) {
    const {id} = await params;
    const grupo = await prisma.grupo.findUnique({where: {id: +id}})
    return ( 
        <div>
            <Link href="/grupos"><b>GRUPOS</b></Link>
            <h1>Grupo con Id {grupo.id}</h1>
            <p>Nombre: {grupo.nombre} </p>
            <p>Tutor: {grupo.tutor} </p>
            <p>Aula: {grupo.aula}</p>
        </div>

     );
}

export default PaginaGrupo;