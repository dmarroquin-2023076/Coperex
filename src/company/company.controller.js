import Company from './company.model.js'

export const saveCompany = async (req, res)=>{
    try {
        let data = req.body
        let newCompany = new Company(data)
        await newCompany.save()
        return res.send(
            {
                message:`Saved company`
            }
        )
    }
     catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                message:'General error',
                e
            }
        )
    }
}

export const updateCompany = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const company = await Company.findById(id)
        if (!company) {
            return res.status(404).send({
                success: false,
                message: 'Company not found'
            })
        }


        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        return res.send({
            success: true,
            message: 'Company updated successfully',
            company: updatedCompany
        })

    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            error: err.message
        })
    }
}

export const listCompanies = async (req, res) => {
    try {

        const companies = await Company.find()

        res.status(200).send(
            {   
                success: true, 
                message: 'Companies',
                companies 
            }
        )
    } catch (error) {
        res.status(500).send(
            { 
                success: false, 
                message: 'Intenal server error' 
            }
        )
    }
}

export const listCompaniesByExperience = async (req, res) => {
    try {
       
        const companies = await Company.find()
            .sort({ yearsOfExperience: 1 })

        res.status(200).send({
            success: true,
            message: 'Companies listed by years of experience',
            companies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const listCompaniesByCategory = async (req, res) => {
    const { category } = req.params

    try {
        
        if (!category) {
            return res.status(400).send({
                success: false,
                message: 'Please provide a business category to filter.'
            })
        }

        // Validar que sea permitida la vetgorua aunque no encontre como hacerlo de otra forma
        const validCategories = ['Microempresa', 'Pequeña', 'Mediana', 'Grande']
       
        if (!validCategories.includes(category)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid business category provided.'
            })
        }

        
        const companies = await Company.find({ businessCategory: category })
            .sort({ yearsOfExperience: -1 }) // Ordenar de mayor a menor porque sino da un error ya que no sabe    
                                            // como ordenarlos

        res.status(200).send({
            success: true,
            message: `Companies listed by business category: ${category}`,
            companies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const listCompaniesAlphabeticallyAZ = async (req, res) => {
    try {

        const companies = await Company.find()
            .sort({ name: 1 }) // Ordenar de A-Z

        res.status(200).send({
            success: true,
            message: 'Companies listed alphabetically A-Z',
            companies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const listCompaniesAlphabeticallyZA = async (req, res) => {
    try {
        
        const companies = await Company.find()
            .sort({ name: -1 })// Ordenar de Z-A

        res.status(200).send({
            success: true,
            message: 'Companies listed alphabetically Z-A',
            companies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}