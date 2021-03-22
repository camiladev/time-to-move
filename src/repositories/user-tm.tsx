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

function getOneUser(user){
    return fetch(`${URL_DATA}/${user}`).then( async (res) => {
        if(res.ok){
            const oneUser = await res.json();
            return oneUser;
        }
    })

}

function create(user){
    console.log('create -> ', user.username)
    return fetch(`${URL_DATA}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user),
    }).then( async (response) => {
        if(response.ok) {
            const res = await response.json()
            return res;
        }
        throw new Error('Cadastro não efetuado!')
    } )
}

function update(userUpdate){
    return fetch(`${URL_DATA}/${userUpdate.id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userUpdate)
    }).then( async (response) => {
        if(response.ok){
            const res = await response.json()
            return res;
        }

        throw new Error('Update não realizado!')
    })
}

export default{
    getUserAll,
    create,
    update,
    getOneUser
};


//****Só para base */
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch('http://localhost:8080/TimeToMove').then( async (response) => {
//     if(response.ok){
//         const users = await response.json();
//         console.log("Resposta users ", users.name);
//         return users;
//     }

//     throw new Error("Não foi possivel conectar ao servidor")
// })
//   // const users = await res.json()
//     console.log('data ', res[0].name)
//     // console.log('data ', users)
//   return{
//     props: {}
//   }
// }