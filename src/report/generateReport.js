import ExcelJS from 'exceljs';
import Company from '../company/company.model.js';
import path from 'path';
import { fileURLToPath } from 'url'; //Para obtener la url actual o el direccionamiento del path

// Obtener el directorio actual 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateReport = async (req, res) => {
    try {
        // Obtener todas las empresas
        const companies = await Company.find({});

        // Verificar si hay empresas
        if (!companies.length) {
            return res.status(404).json({ message: "There are no registered companies" });
        }

        // Crear un nuevo libro de trabajo y una hoja de excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies Report'); //Nombre de la hoja

        // Agrega los capos de las columnas de la hoja de excel
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 30 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Descripción', key: 'description', width: 50 },
            { header: 'Teléfono', key: 'phone', width: 15 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 20 },
            { header: 'Años de Experiencia', key: 'yearsOfExperience', width: 20 },
            { header: 'Categoría de Negocio', key: 'businessCategory', width: 20 },
            { header: 'Tipo de Subsidiaria', key: 'subsidiary', width: 20 },
            { header: 'Fecha de Creación', key: 'createdAt', width: 25 },
            { header: 'Fecha de Actualización', key: 'updatedAt', width: 25 },
        ];

        // Agregar los datos de las empresas a la hoja de excel
        companies.forEach(company => {
            worksheet.addRow({
                id: company._id,
                name: company.name,
                description: company.description,
                phone: company.phone,
                impactLevel: company.impactLevel,
                yearsOfExperience: company.yearsOfExperience,
                businessCategory: company.businessCategory,
                subsidiary: company.subsidiary,
                createdAt: company.createdAt,
                updatedAt: company.updatedAt,
            });
        });

        // Establecer el nombre del archivo
        const fileName = 'Companies_Report.xlsx';
        const filePath = path.join(__dirname, fileName); // Ruta del archivo

        // Guardar el archivo Excel en el sistema de archivos
        await workbook.xlsx.writeFile(filePath);
        console.log('Report generated successfully:', filePath);

        // Configurar la respuesta para descargar el archivo
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).send({
                    success: false,
                    message: 'Error downloading file',
                    error: err.message,
                });
            }  
        })

    } catch (error) {
        console.error('Error generating the report:', error);
        res.status(500).send({
            success: false,
            message: 'Error generating the report',
            error: error.message,
        });
    }
};
//:)