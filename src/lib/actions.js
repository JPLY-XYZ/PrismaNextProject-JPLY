'use server'
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import path from 'node:path'
import { redirect } from 'next/dist/server/api-utils';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const prisma = new PrismaClient();

// GRUPOS

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

    revalidatePath('/grupos/' + +formData.get('id'));
}

async function eliminarGrupo(formData) {

    await prisma.grupo.delete({
        where: {
            id: +formData.get('id')
        }
    });

    revalidatePath('/grupos');
}

// ALUMNOS

async function insertarAlumno(formData) {

    await prisma.alumno.create({
        data: {
            nombre: formData.get('nombre'),
            fechaNacimiento: new Date(formData.get('fechaNacimiento')),
            foto: await GenerateImgURI(formData.get('foto')),
            tutorLegal: formData.get('tutorLegal'),
            grupoId: +formData.get('grupoId')
        }
    });

    revalidatePath('/estudiantes');

}


async function GenerateImgURI(file) {
    try {
        const fileBuffer = await file.arrayBuffer();

        let mime = file.type;
        let encoding = 'base64';
        let base64Data = Buffer.from(fileBuffer).toString('base64');
        let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

        const result = await cloudinary.uploader.upload(fileUri, {
            asset_folder: 'escuela',
            public_id: path.parse(file.name).name,
            invalidate: true,
            format: 'webp'
        });

        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error; // O maneja el error como prefieras
    }
}

async function modificarAlumno(formData) {

    const foto = formData.get('foto');
    const data = {
        nombre: formData.get('nombre'),
        fechaNacimiento: new Date(formData.get('fechaNacimiento')),
        tutorLegal: formData.get('tutorLegal'),
        grupoId: +formData.get('grupoId')
    };

    if (foto.size > 0) {
        data.foto = await GenerateImgURI(foto);
    }

    await prisma.alumno.update({
        where: {
            id: +formData.get('id')
        },
        data: data
    });

    revalidatePath('/estudiantes/' + +formData.get('id'));
}

async function eliminarAlumno(formData) {

    await prisma.alumno.delete({
        where: {
            id: +formData.get('id')
        }
    }); 

    revalidatePath('/estudiantes');
}

// ASIGNATURAS

async function insertarAsignatura(formData) {


    await prisma.asignatura.create({
        data: {
            nombre: formData.get('nombre'),
            fechaNacimiento: new Date(formData.get('fechaNacimiento')),
            foto: formData.get('foto'),
            tutorLegal: formData.get('tutorLegal'),
            grupoId: +formData.get('grupoId')
        }
    });

    revalidatePath('/estudiantes');

}

async function modificarAsignatura(formData) {

    await prisma.asignatura.update({
        where: {
            id: +formData.get('id')
        },
        data: {
            nombre: formData.get('nombre'),
            fechaNacimiento: new Date(formData.get('fechaNacimiento')),
            foto: formData.get('foto'),
            tutorLegal: formData.get('tutorLegal'),
            grupoId: +formData.get('grupoId')
        }
    });

    revalidatePath('/estudiantes/' + +formData.get('id'));
}

async function eliminarAsignatura(formData) {

    await prisma.asignatura.delete({
        where: {
            id: +formData.get('id')
        }
    });

    revalidatePath('/grupos');
}

export { insertarGrupo, modificarGrupo, eliminarGrupo, insertarAlumno, modificarAlumno, eliminarAlumno, insertarAsignatura, modificarAsignatura, eliminarAsignatura };