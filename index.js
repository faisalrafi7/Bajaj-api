const express = require('express');
const app = express();

app.use(express.json());


app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const full_name = "Faisal_Rafi"; 
    const dob = "12112002";       
    const email = "faisalrafi4269@gmail.com"; 
    const roll_number = "21BCE1581"; 

    const user_id = `${full_name}_${dob}`;

    let numbers = [];
    let alphabets = [];
    let highest_lowercase = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
            
            if (item === item.toLowerCase()) {
                if (!highest_lowercase.length || item > highest_lowercase[0]) {
                    highest_lowercase = [item];
                }
            }
        }
    });

    const response = {
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase
    };

    res.status(200).json(response);
});


app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
