import data from '../services/data';

const URL_DATA = `${data.URL_BACKEND_TOP}/TimeToMove`;

function getUserAll(){
    return fetch(`${URL_DATA}`).then( async (response) => {
        if(response.ok){
            const users = await response.json();
            console.log("Resposta users ", users);
            return users;
        }

        throw new Error("Não foi possivel conectar ao servidor")
    })
}

export default{
    getUserAll
};