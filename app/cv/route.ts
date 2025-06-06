import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

export async function GET() {
  try {
    // Ruta al archivo PDF (asegúrate de colocarlo en la carpeta public)
    const filePath = path.join(process.cwd(), 'public', 'cv-michelle.pdf');
    
    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Archivo no encontrado', { status: 404 });
    }
    
    // Leer el archivo
    const fileBuffer = await fsPromises.readFile(filePath);
    
    // Crear la respuesta con el archivo PDF
    const response = new NextResponse(fileBuffer);
    
    // Establecer los encabezados adecuados
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', 'inline; filename="cv-michelle.pdf"');
    
    return response;
  } catch (error) {
    console.error('Error al servir el archivo PDF:', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}