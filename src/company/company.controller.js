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