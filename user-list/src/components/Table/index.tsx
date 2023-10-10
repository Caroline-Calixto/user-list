import axios from 'axios';
import { useEffect, useState } from 'react';
// import SearchBarComponent from '../SearchBar';
import './styles.css';
import User from '../../interfaces/users';


export default function TableComponent() {
    const [userList, setUserList] = useState<User[]>([]);
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/users';

        axios.get<User[]>(url)
            .then(response => {
                setUserList(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, []);

    // Função para buscar os usuários na tabela
    const handleSearch = () => {
        setLoading(true);

        const showAlert = () => {
            window.alert('Não há dados para a busca selecionada');
          };

        const filteredUsers = userList.filter(user =>
            user.name.toLowerCase().includes(searchName.toLowerCase())
        );

        setSearchResults(filteredUsers);
        setLoading(false);

        if (filteredUsers.length === 0) {
            showAlert();
        }
    };

    return (
        <>
            {/* TODO: incluir componente de busca */}
            <div>
                <input
                    type="text"
                    placeholder="Digite o nome a ser buscado"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            <section className='table'>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </ thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3}>Carregando...</td>
                            </tr>
                        ) : (
                            searchResults.length > 0 ? (
                                searchResults.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>

                                    </tr>
                                ))
                            ) : (
                                userList.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </section>
        </>
    )
}

