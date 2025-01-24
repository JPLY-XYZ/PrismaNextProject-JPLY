'use server'
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();


async function insertarGrupo(formData) {


    await prisma.grupo.create({
        data: {
            nombre: formData.get('nombre'),
            tutor: formData.get('tutor'),
            aula: formData.get('aula')
        }
    });

    revalidatePath('/grupos');

}

async function modificarGrupo(formData) {

    await prisma.grupo.update({
        where: {
            id: +formData.get('id')
        },
        data: {
            nombre: formData.get('nombre'),
            tutor: formData.get('tutor'),
            aula: formData.get('aula')
        }
    });

    revalidatePath('/grupos/'+ +formData.get('id'));
}

async function eliminarGrupo(formData) {

    await prisma.grupo.delete({
        where: {
            id: +formData.get('id')
        }
    });
    
    revalidatePath('/grupos');
}

export { insertarGrupo, modificarGrupo, eliminarGrupo };