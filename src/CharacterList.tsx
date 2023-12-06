// CharacterList.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
};

type CharacterListProps = {
    searchTerm: string;
};

const charactersPerPage = 5;

function CharacterList({ searchTerm }: CharacterListProps) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://rickandmortyapi.com/api/character/');
                const filteredCharacters = response.data?.results.filter((character: Character) =>
                    character.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setCharacters(filteredCharacters ?? []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchTerm]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const startCharacterIndex = (currentPage - 1) * charactersPerPage;
    const visibleCharacters = characters.slice(startCharacterIndex, startCharacterIndex + charactersPerPage);

    const buildCharacters = function () {
        if (visibleCharacters.length > 0) {
            return visibleCharacters.map(character => (
                <li key={character.id}>{character.name}</li>
            ));
        } else {
            return <li>No characters found on this page</li>;
        }
    };

    return (
        <div>
            <ul>
                {buildCharacters()}
            </ul>
            <button onClick={handleNextPage}>Next 5 Characters</button>
        </div>
    );
}

export default CharacterList;
